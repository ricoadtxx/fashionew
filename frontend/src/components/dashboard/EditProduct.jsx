import { Edit2, Loader } from "lucide-react";
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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/stores/useProductStore";
import { categories } from "@/lib/utils";

import PropTypes from "prop-types";
import { toast } from "sonner";

const EditProduct = ({ productId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { products, updateProduct, loading } = useProductStore();
	const productToEdit = products.find((product) => product._id === productId);

	const [formData, setFormData] = useState({
		name: productToEdit?.name || "",
		description: productToEdit?.description || "",
		price: productToEdit?.price || 0,
		category: productToEdit?.category || "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleCategoryChange = (value) => {
		setFormData({
			...formData,
			category: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await updateProduct(productId, formData);
			setIsOpen(false);
		} catch (error) {
			toast.error(error.response.data.error || "Failed to update product", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className="p-2.5 rounded-full bg-black active:scale-90 active:translate-y-px transition-all duration-200 hover:opacity-80">
					<Edit2 className="h-5 w-5 text-white" />
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] gap-2">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-emerald-600">
						Edit Product
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-sm text-muted-black">
					<form onSubmit={handleSubmit} className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="name">Nama Produk</Label>
							<Input
								id="name"
								type="text"
								name="name"
								placeholder="Input Name"
								value={formData.name}
								onChange={handleInputChange}
								className="border border-gray-500"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="description">Deskripsi Produk</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Input Deskripsi"
								value={formData.description}
								onChange={handleInputChange}
								className="border border-gray-500"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="price">Harga Produk</Label>
							<Input
								id="price"
								type="number"
								name="price"
								placeholder="Input Harga"
								value={formData.price}
								onChange={handleInputChange}
								className="border border-gray-500"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="category">Category</Label>
							<Select
								value={formData.category}
								onValueChange={handleCategoryChange}
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
						<DialogFooter className="flex items-center gap-2 md:gap-0 justify-end">
							<Button
								type="button"
								onClick={() => setIsOpen(false)}
								className="bg-red-500 hover:bg-white hover:text-black active:scale-90 active:translate-y-px transition-all duration-200 w-full lg:w-auto"
							>
								Cancel
							</Button>
							<Button type="submit" disabled={loading} className="w-full lg:w-auto">
								{loading ? (
									<>
										<Loader className="mr-2 h-5 w-5 animate-spin" />
									</>
								) : (
									<p>Save</p>
								)}
							</Button>
						</DialogFooter>
					</form>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
};

EditProduct.propTypes = {
	productId: PropTypes.string.isRequired,
};

export default EditProduct;
