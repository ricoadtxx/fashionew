/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CategoryItem = ({ category }) => {
	const navigate = useNavigate();
	const { user } = useUserStore();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = (e) => {
		if (!user) {
			e.preventDefault(); // Mencegah navigasi default
			setIsLoading(true); // Aktifkan loading
			toast.error("Anda harus login terlebih dahulu!", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
			setIsLoading(false);
			navigate("/sign-in"); // Arahkan ke halaman login
		}
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
		<div className="relative overflow-hidden h-96 w-full rounded-lg group">
			<Link to={"/category" + category.href} onClick={handleClick}>
				<div className="w-full h-full cursor-pointer">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
					<img
						src={category.imageUrl}
						alt={category.name}
						className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						loading="lazy"
					/>
					<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
						<h3 className="text-white text-2xl font-bold mb-2">
							{category.name}
						</h3>
						<p className="text-gray-200 text-sm">Explore {category.name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;
