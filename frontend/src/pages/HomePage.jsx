import CategoryItem from "@/components/store/CategoryItem";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import { ListCategories } from "@/lib/utils";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect, useState } from "react";

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 500); // Simulasi delay 1 detik
		fetchFeaturedProducts();

		return () => clearTimeout(timer);
	}, [fetchFeaturedProducts]);

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
		<>
			<div className="relative min-h-screen text-white  overflow-hidden pb-16">
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
						Explore Our Collection
					</h1>
					<p className="text-center text-xl text-muted-foreground mb-12">
						Discover the latest trends in eco-friendly fashion
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{ListCategories.map((category) => (
							<CategoryItem category={category} key={category.name} />
						))}
					</div>

					{!isLoading && products.length > 0 && (
						<FeaturedProducts featuredProducts={products} />
					)}
				</div>
			</div>
		</>
	);
};

export default HomePage;
