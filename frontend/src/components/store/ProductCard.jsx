/* eslint-disable react/prop-types */
import { ShoppingCart, StarIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useUserStore";
import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const navigate = useNavigate();

	const handleAddToCart = () => {
		if (!user) {
			navigate("/sign-in");
			toast.error("Please login to add products to cart", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
			return;
		} else {
			addToCart(product);
		}
	};

	return (
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
					onClick={handleAddToCart}
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<ShoppingCart size={22} />
							</TooltipTrigger>
							<TooltipContent side="bottom" className="text-base mt-3">
								Add to cart
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Button>
			</div>
		</div>
	);
};
export default ProductCard;
