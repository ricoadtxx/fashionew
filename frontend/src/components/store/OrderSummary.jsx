import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSummary = () => {
	const { total, subtotal, cart } = useCartStore();
	const savings = subtotal - total;
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	// const handlePayment = () => {
	//   const midtrans = await
	// }

	return (
		<motion.div
			className="w-full space-y-4 rounded-lg border h-full flex flex-col justify-between border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className="text-xl text-center font-semibold text-emerald-400">
				Order summary
			</p>
			{cart.length > 0 ? (
				<div className="space-y-3 h-1/2 p-2 scrollbar-hide overflow-y-auto border border-gray-700 rounded-lg">
					{cart.map((item) => (
						<div key={item._id} className="flex gap-4">
							<img
								src={item.image}
								alt={item.name}
								className="h-10 w-10 rounded-md object-cover"
							/>
							<div className="flex justify-between p-0 w-full">
								<div className="flex flex-col justify-between">
									<p className="text-sm font-semibold text-white">
										{item.name}
									</p>
									<p className="text-xs font-semibold text-muted-foreground">
										{item.category}
									</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-red-500">
										{formatCurrency(item.price)}
									</p>
									<p className="text-xs font-semibold text-white text-right">
										{item.quantity} pcs
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-sm font-semibold text-white text-center">Your cart is empty.</p>
			)}

			<div className="space-y-4">
				<div className="space-y-2">
					{savings > 0 && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-gray-300">Savings</dt>
							<dd className="text-base font-medium text-emerald-400">
								-${formattedSavings}
							</dd>
						</dl>
					)}

					<dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
						<dt className="text-base font-bold text-white">Total Pembayaran</dt>
						<dd className="text-base font-bold text-emerald-400">
							{formatCurrency(formattedTotal)}
						</dd>
					</dl>
				</div>

				<motion.button
					className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => {}}
				>
					Proceed to Checkout
				</motion.button>

				<div className="flex items-center justify-center gap-2">
					<span className="text-sm font-normal text-gray-400">or</span>
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
