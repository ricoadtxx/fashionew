import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products });
	} catch (error) {
		console.error("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		// Cek apakah data sudah ada di cache
		const cachedProducts = cache.get("featuredProducts");
		if (cachedProducts) {
			return res.json(cachedProducts); // Kembalikan data dari cache
		}

		// Ambil produk unggulan dari MongoDB
		const featuredProducts = await Product.find({ isFeatured: true }).lean();

		// Jika tidak ada produk unggulan ditemukan
		if (!featuredProducts || featuredProducts.length === 0) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// Simpan hasil dalam cache
		cache.set("featuredProducts", featuredProducts);

		// Kembalikan produk unggulan ke pengguna
		res.json(featuredProducts);
	} catch (error) {
		console.error("Error in getFeaturedProducts controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category, quantity, isFeatured } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, {
				folder: "products",
			});
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url
				? cloudinaryResponse.secure_url
				: "",
			category,
			quantity: quantity ,
			isFeatured: isFeatured || true,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params; // Ambil ID dari parameter URL
		const { name, description, price, image, category, isFeatured } = req.body; // Ambil data dari body request

		// Validasi: Pastikan ID ada
		if (!id) {
			return res.status(400).json({ message: "Product ID is required" });
		}

		// Cari produk berdasarkan ID
		const product = await Product.findById(id);

		// Jika produk tidak ditemukan
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Update data produk
		product.name = name || product.name; // Jika name tidak ada, gunakan nilai lama
		product.description = description || product.description;
		product.price = price || product.price;
		product.image = image || product.image;
		product.category = category || product.category;

		// Simpan perubahan ke database
		const updatedProduct = await product.save();

		// Update cache (jika ada)
		await updateFeaturedProductsCache();

		// Kirim respons dengan produk yang telah diupdate
		res.status(200).json(updatedProduct);
	} catch (error) {
		console.log("Error in updateProduct controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloudinary");
			} catch (error) {
				console.log("error deleting image from cloudinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					category: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// Mengambil produk yang memiliki isFeatured: true
		const featuredProducts = await Product.find({ isFeatured: true }).lean();

		// Simpan hasil dalam cache menggunakan NodeCache
		cache.set("featuredProducts", featuredProducts);

		console.log("Featured products cache updated successfully.");
	} catch (error) {
		console.log("Error in updating cache:", error.message);
	}
}
