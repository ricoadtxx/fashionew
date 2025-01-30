import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { Package, Eye, EyeOff } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";

const SummaryProduct = () => {
	const { products } = useProductStore();
	const [summary, setSummary] = useState({
		totalProducts: 0,
		// totalSold: 0,
		totalFeatured: 0,
		totalNotFeatured: 0,
	});

	useEffect(() => {
		const totalProducts = products.length;

		const totalFeatured = products.filter(
			(product) => product.isFeatured
		).length;
		const totalNotFeatured = products.filter(
			(product) => !product.isFeatured
		).length;

		// Update state summary
		setSummary({
			totalProducts,
			// totalSold,
			totalFeatured,
			totalNotFeatured,
		});
	}, [products]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-7xl">
			<AnalyticsCard
				title="Total Produk"
				value={summary.totalProducts.toLocaleString()}
				icon={Package}
				color="from-blue-500 to-indigo-700"
			/>
			<AnalyticsCard
				title="Ditampilkan di Website"
				value={summary.totalFeatured.toLocaleString()}
				icon={Eye}
				color="from-purple-500 to-pink-700"
			/>
			<AnalyticsCard
				title="Tidak Ditampilkan di Website"
				value={summary.totalNotFeatured.toLocaleString()}
				icon={EyeOff}
				color="from-yellow-500 to-orange-700"
			/>
			{/* <AnalyticsCard
				title="Produk Terjual (Hari Ini)"
				value={summary.totalSold.toLocaleString()}
				icon={ShoppingCart}
				color="from-green-500 to-teal-700"
			/> */}
		</div>
	);
};

export default SummaryProduct;
