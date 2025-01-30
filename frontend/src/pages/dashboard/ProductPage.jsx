import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductsList from "@/components/dashboard/ProductsList";
import { Separator } from "@/components/ui/separator";
import { CloudDownload } from "lucide-react";
import SummaryProduct from "@/components/dashboard/SummaryProduct";
import { Button } from "@/components/ui/button";
import CreateProduct from "@/components/dashboard/CreateProduct";

const ProductPage = () => {
	const { products, fetchAllProducts } = useProductStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				await fetchAllProducts(); // Pastikan fetchProducts mengambil data produk
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [fetchAllProducts]);

	const convertToCSV = (data) => {
		const headers = ["Name", "Price", "Category"];
		const rows = data.map((product) => [
			product.name,
			product.price,
			product.category,
		]);

		const csvContent =
			headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");

		return csvContent;
	};

	const handleDownloadCSV = () => {
		const csvData = convertToCSV(products);
		const blob = new Blob([csvData], { type: "text/csv" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = "products.csv";
		link.click();

		URL.revokeObjectURL(url);
	};

	if (isLoading) {
		return (
			<div className="text-center h-screen flex flex-col justify-center items-center gap-4">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-500 mx-auto"></div>
				<h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
				<p className="text-zinc-600 dark:text-zinc-400">Please Wait</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full mt-16 lg:mt-0">
			<div className="flex flex-col sm:flex-row items-center gap-2 justify-between py-2">
				<h1 className="text-3xl font-bold">PRODUCT LIST</h1>

				<div className="flex items-center gap-2">
					<Button
						onClick={handleDownloadCSV}
						variant="outline"
						className="border border-gray-500 active:scale-90 active:translate-y-px transition-all duration-200"
					>
						<CloudDownload />
						Import
					</Button>
					<CreateProduct />
				</div>
			</div>
			<div className="w-full flex flex-wrap justify-between items-start mt-10">
				<SummaryProduct />
			</div>
			<Separator className="mt-5 border-2" />
			<ProductsList />
		</div>
	);
};

export default ProductPage;
