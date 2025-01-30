import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/store/ProductCard";
import { useProductStore } from "@/stores/useProductStore";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	const [loading, setLoading] = useState(false);

	const { category } = useParams();

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 500); // Simulasi delay 1 detik

		fetchProductsByCategory(category);

		return () => clearTimeout(timer);
	}, [fetchProductsByCategory, category]);

	if (loading) {
		return (
			<div className="text-center h-screen flex flex-col justify-center items-center gap-4">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-500 mx-auto"></div>
				<h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
				<p className="text-zinc-600 dark:text-zinc-400">Please Wait</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<div className="relative z-10 max-w-screen-xl mx-auto">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
							No products found
						</h2>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};
export default CategoryPage;
