import { create } from "zustand";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),

	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axiosInstance.post("/api/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
			toast.success("Berhasil", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
				description: "Produk ditambahkan ke database",
			});
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	updateProduct: async (productId, updatedData) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.put(
				`/api/products/${productId}`,
				updatedData
			);
			// Memperbarui produk di state
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, ...response.data } : product
				),
				loading: false,
			}));
			toast.success("Berhasil", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
				description: "Produk diperbarui di database",
			});
			return response.data;
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/api/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log(error);
		}
	},

	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get(
				`/api/products/category/${category}`
			);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log(error);
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axiosInstance.delete(`/api/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter(
					(product) => product._id !== productId
				),
				loading: false,
			}));
			toast.success("Berhasil", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
				description: "Produk dihapus dari database",
			});
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.patch(`/api/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId
						? { ...product, isFeatured: response.data.isFeatured }
						: product
				),
				loading: false,
			}));
			if (response.data.isFeatured) {
				toast.success("Berhasil", {
					className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
					description: "Produk ini sekarang terlihat di halaman utama.",
				});
			} else {
				toast.success("Berhasil", {
					className: "bg-yellow-500 text-white rounded-lg p-4 shadow-md",
					description: "Produk ini tidak lagi terlihat di halaman utama.",
				});
			}
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/api/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log(error);
		}
	},
}));
