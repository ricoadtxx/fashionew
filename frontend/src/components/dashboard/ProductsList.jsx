import { motion } from "framer-motion";
import {
	Trash,
	Star,
	Search,
	ArrowUp,
	ArrowDown,
	ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EditProduct from "./EditProduct";
import { categories, formatCurrency } from "@/lib/utils";
import { useProductStore } from "@/stores/useProductStore";

const ProductsList = () => {
	const { fetchAllProducts, deleteProduct, toggleFeaturedProduct, products } =
		useProductStore();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	const filteredProducts = products
		.filter((product) => {
			const matchesSearch = product.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory
				? product.category === selectedCategory
				: true;
			return matchesSearch && matchesCategory;
		})
		.sort((a, b) => {
			if (sortOrder === "asc") {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});

	const toggleSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className="py-4 flex items-center justify-between sm:flex-row flex-col gap-4">
				<div className="relative w-full sm:w-auto">
					<input
						type="text"
						placeholder="Search products..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 w-full sm:w-auto focus:ring-emerald-100 border border-gray-600"
					/>
					<Search className="absolute left-3 top-2.5 h-5 w-5" />
				</div>
				<div className="flex gap-2 justify-between w-full sm:w-auto">
					<DropdownMenu className="capitalize">
						<DropdownMenuTrigger asChild>
							<Button className="p-2 w-[100px] border capitalize border-gray-600 rounded-md flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-100">
								{selectedCategory || "All"}
								<ChevronDown className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-white border border-gray-400 w-full rounded-md shadow-lg">
							<DropdownMenuItem
								onSelect={() => setSelectedCategory("")}
								className="cursor-pointer px-4 py-2 hover:bg-gray-100 "
							>
								All
							</DropdownMenuItem>
							{categories.map((category) => (
								<DropdownMenuItem
									key={category}
									onSelect={() => setSelectedCategory(category)}
									className="cursor-pointer px-4 py-2 hover:bg-gray-100 capitalize"
								>
									{category}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button
						onClick={toggleSortOrder}
						className="px-4 py-2 border border-gray-600 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
					>
						{sortOrder === "asc" ? (
							<>
								<ArrowUp className="h-5 w-5" />
								<span>A-Z</span>
							</>
						) : (
							<>
								<ArrowDown className="h-5 w-5" />
								<span>Z-A</span>
							</>
						)}
					</Button>
				</div>
			</div>

			<div className="overflow-x-auto border border-gray-400 rounded-lg">
				<table className="min-w-full">
					<thead className="border-b border-gray-300">
						<tr>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/5"
							>
								Gambar Produk
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/5"
							>
								Nama Produk
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6"
							>
								Harga
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6"
							>
								Kategori
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6"
							>
								Jumlah
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6"
							>
								Featured
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6"
							>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-200">
						{filteredProducts?.map((product) => (
							<tr key={product._id} className="hover:bg-gray-300">
								<td className="px-4 py-4 capitalize whitespace-nowrap w-5">
									<div className="flex items-center">
										<img
											className="h-10 w-10 rounded-full object-cover"
											src={product.image}
											alt={product.name}
										/>
									</div>
								</td>
								<td className="py-4 capitalize whitespace-nowrap">
									<div className="ml-4">
										<div className="text-sm font-medium">{product.name}</div>
									</div>
								</td>
								<td className="px-4 py-4 capitalize whitespace-nowrap">
									<div className="text-sm">
										{formatCurrency(product.price.toFixed(0))}
									</div>
								</td>
								<td className="px-4 py-4 capitalize font-bold whitespace-nowrap">
									<div className="text-sm">{product.category}</div>
								</td>
								<td className="px-4 py-4 capitalize font-bold whitespace-nowrap">
									<div className="text-sm">{product.quantity} pcs</div>
								</td>
								<td className="px-4 py-4 capitalize whitespace-nowrap">
									<Button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`py-5 px-3 rounded-full ${
											product.isFeatured
												? "bg-green-500 text-gray-900"
												: "bg-transparent"
										} hover:bg-yellow-500 active:scale-90 active:translate-y-px transition-all duration-200 text-black`}
									>
										<Star className="h-5 w-3" />
									</Button>
								</td>
								<td className="flex items-center py-4 capitalize whitespace-nowrap text-sm font-medium space-x-1">
									<div
										onClick={() => deleteProduct(product._id)}
										className="bg-red-500 p-2.5 rounded-full hover:bg-red-300 active:scale-90 active:translate-y-px transition-all duration-200"
									>
										<Trash className="h-5 w-5" color="white" />
									</div>
									<EditProduct productId={product._id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default ProductsList;
