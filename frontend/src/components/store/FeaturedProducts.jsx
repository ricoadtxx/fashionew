/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
	ShoppingCart,
	ChevronLeft,
	ChevronRight,
	StarIcon,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
					Featured
				</h2>
				<div className="relative">
					<div className="overflow-hidden">
						<div
							className="flex transition-transform duration-300 ease-in-out"
							style={{
								transform: `translateX(-${
									currentIndex * (100 / itemsPerPage)
								}%)`,
							}}
						>
							{featuredProducts?.map((product) => (
								<div
									key={product._id}
									className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 xl:p-8"
								>
									<div className="flex w-full relative flex-col shadow-lg group hover:-rotate-0 xl:[transform:rotate3d(1_,-1,_1,_15deg)] duration-500 overflow-hidden bg-gradient-to-bl from-sky-400 via-white to-blue-500 rounded-lg hover:shadow-lg xl:[box-shadow:12px_12px_0px_0px_#0d0d0d] backdrop-filter backdrop-blur-md border border-neutral-600 pb-5 max-w-xs">
										<div className="relative flex h-60 overflow-hidden ">
											<img
												className="object-cover w-full"
												src={product.image}
												alt="product image"
											/>
											<div className="absolute inset-0 bg-black bg-opacity-20" />
										</div>

										<div className="flex items-center justify-between mt-4 px-2 mb-2">
											<div className="flex flex-col items-start gap-0">
												<h5 className="text-xl font-semibold tracking-tight text-sky-950">
													{product.name}
												</h5>
												<h5 className="text-sm font-semibold tracking-tight text-muted-foreground">
													{product.category}
												</h5>
											</div>
											<div className="flex flex-col items-end gap-0">
												<p className="text-sm font-bold text-red-600">
													{formatCurrency(product.price)}
												</p>
												<StarIcon
													size={22}
													color="white"
													className="bg-blue-400 rounded-full p-1 ml-auto hover:bg-blue-500 transition duration-300 cursor-pointer"
												/>
											</div>
										</div>
										<div className="flex justify-end px-4">
											<Button
												className="hover:bg-sky-500 hover:text-white transition-colors duration-300"
												onClick={() => addToCart(product)}
											>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<ShoppingCart size={22} />
														</TooltipTrigger>
														<TooltipContent
															side="bottom"
															className="text-base mt-3"
														>
															Add to cart
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<Button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 p-2.5 -left-10 transform -translate-y-1/2 rounded-full transition-colors duration-300 ${
							isStartDisabled
								? "bg-gray-400 cursor-not-allowed"
								: "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronLeft className="w-6 h-6" />
					</Button>

					<Button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 p-2.5 -right-10 transform -translate-y-1/2 rounded-full transition-colors duration-300 ${
							isEndDisabled
								? "bg-gray-400 cursor-not-allowed"
								: "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronRight className="w-6 h-6" />
					</Button>
				</div>
			</div>
		</div>
	);
};
export default FeaturedProducts;
