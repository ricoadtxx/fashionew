import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axiosInstance.get("/api/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(
					error.response.data.message ||
						"An error occurred while fetching recommendations"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="mt-8">
			<h3 className="text-4xl font-semibold text-emerald-400">
				People also bought
			</h3>
			<Separator className="border border-gray-300 my-4" />
			<div className="items-center justify-center mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xl:gap-10 xl:p-10">
				{recommendations?.map((product) => (
					<div key={product._id} className="flex justify-center">
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
};
export default PeopleAlsoBought;
