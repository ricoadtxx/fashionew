import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox dari shadcn/ui
import { Loader, PlusCircle } from "lucide-react";
import { categories } from "@/lib/utils";
import { useProductStore } from "@/stores/useProductStore";

const CreateProduct = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		isFeatured: true,
		quantity: 0,
	});

	const { createProduct, loading } = useProductStore();

	const resetForm = () => {
		setNewProduct({
			name: "",
			description: "",
			price: "",
			category: "",
			image: "",
			isFeatured: true,
			quantity: 0,
		});
	};

	const handleCancel = () => {
		setIsOpen(false);
		resetForm();
	};

	useEffect(() => {
		if (!isOpen) {
			resetForm();
		}
	}, [isOpen]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Data to be sent:", newProduct);
		try {
			await createProduct(newProduct);
			setIsOpen(false);
			resetForm();
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="active:scale-90 active:translate-y-px transition-all duration-200">
					<PlusCircle className="h-5 w-5" />
					Create
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] gap-2">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-emerald-600">
						Create New Product
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-sm text-muted-black">
					<form onSubmit={handleSubmit} className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="name">Product Name</Label>
							<Input
								className="border border-gray-500"
								type="text"
								id="name"
								name="name"
								value={newProduct.name}
								onChange={(e) =>
									setNewProduct({ ...newProduct, name: e.target.value })
								}
								required
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="description">Description</Label>
							<Textarea
								className="border border-gray-500"
								id="description"
								name="description"
								value={newProduct.description}
								onChange={(e) =>
									setNewProduct({ ...newProduct, description: e.target.value })
								}
								rows="3"
								required
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="price">Price</Label>
							<Input
								className="border border-gray-500"
								type="number"
								id="price"
								name="price"
								value={newProduct.price}
								onChange={(e) =>
									setNewProduct({ ...newProduct, price: e.target.value })
								}
								step="0.01"
								required
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="quantity">Quantity</Label>
							<Input
								className="border border-gray-500"
								type="number"
								id="quantity"
								name="quantity"
								value={newProduct.quantity}
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										quantity: parseInt(e.target.value, 10),
									})
								}
								min="0"
								required
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="category">Category</Label>
							<Select
								value={newProduct.category}
								onValueChange={(value) =>
									setNewProduct({ ...newProduct, category: value })
								}
								required
							>
								<SelectTrigger className="border border-gray-500 capitalize">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent className="border border-gray-500 capitalize">
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex items-center gap-2 pt-2">
							<Label htmlFor="image">Upload</Label>
							<Input
								className="border border-gray-500 cursor-pointer w-1/2"
								type="file"
								id="image"
								accept="image/*"
								onChange={handleImageChange}
							/>
							{newProduct.image && (
								<span className="text-sm text-gray-500">Image uploaded</span>
							)}
						</div>

						{/* Checkbox untuk isFeatured menggunakan shadcn/ui */}
						<div className="flex items-center gap-2 pt-2">
							<Checkbox
								id="isFeatured"
								checked={newProduct.isFeatured}
								onCheckedChange={(checked) =>
									setNewProduct({ ...newProduct, isFeatured: checked })
								}
								className="border border-gray-500"
							/>
							<Label htmlFor="isFeatured">Featured Product</Label>
						</div>
					</form>
				</DialogDescription>
				<DialogFooter className="flex items-center gap-2 md:gap-0 justify-end">
					<Button
						type="button"
						onClick={handleCancel}
						className="bg-red-500 hover:bg-white hover:text-black active:scale-90 active:translate-y-px transition-all duration-200 w-full lg:w-auto"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={loading}
						className="w-full lg:w-auto"
						onClick={handleSubmit}
					>
						{loading ? (
							<>
								<Loader className="mr-2 h-5 w-5 animate-spin" />
							</>
						) : (
							<p>Save</p>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProduct;
