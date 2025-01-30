import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";
import CartItem from "@/components/store/CartItem";
import PeopleAlsoBought from "@/components/store/PeopleAlsoBrought";
import OrderSummary from "@/components/store/OrderSummary";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className="pt-4 pb-16">
			<div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
				<div className="flex justify-center items-center gap-2">
					<ShoppingBagIcon />
					<h1 className="text-3xl font-bold text-center">Belanjaan Kamu</h1>
				</div>
				<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
					<motion.div
						className="mx-auto w-3/4 lg:w-full lg:col-span-2"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className="space-y-6 overflow-y-scroll h-[420px] rounded-lg p-4 lg:p-6 shadow-xl">
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
					</motion.div>

					{cart.length >= 0 && (
						<motion.div
							className="w-3/4 lg:w-full mx-auto flex justify-center items-center overflow-y-auto"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
						</motion.div>
					)}
				</div>
				{cart.length >= 0 && <PeopleAlsoBought />}
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className="mx-auto flex flex-col items-center justify-center space-y-4 py-16"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className="h-24 w-24 text-gray-300" />
		<h3 className="text-2xl font-semibold ">Your cart is empty</h3>
		<p className="text-gray-400">
			Looks like you {"haven't"} added anything to your cart yet.
		</p>
		<Link
			className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
			to="/"
		>
			Start Shopping
		</Link>
	</motion.div>
);
