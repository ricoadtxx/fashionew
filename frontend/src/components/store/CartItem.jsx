/* eslint-disable react/prop-types */
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className="rounded-lg border p-4 border-gray-300 md:p-6">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
				<div className="flex items-center justify-center sm:row-span-2">
					<img className="h-auto rounded-lg object-cover" src={item.image} />
				</div>

				<div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:row-span-1">
					<div className="flex flex-col justify-between sm:justify-start items-start">
						<p className="text-base font-medium text-black hover:underline">
							{item.name}
						</p>
						<p className="text-sm text-muted-foreground text-justify">
							{item.description} 
						</p>
					</div>

					<div className="flex flex-col justify-between sm:justify-start items-end">
						<div className="flex items-center gap-2">
							<Button
								className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								onClick={() => updateQuantity(item._id, item.quantity - 1)}
							>
								<Minus className="text-gray-300" />
							</Button>
							<p>{item.quantity}</p>
							<Button
								className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								onClick={() => updateQuantity(item._id, item.quantity + 1)}
							>
								<Plus className="text-gray-300" />
							</Button>
						</div>

						<div className="">
							<p className="text-base font-bold text-red-500">
								{formatCurrency(item.price * item.quantity)}
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center gap-4 sm:items-end w-full sm:col-span-2">
					<Button
						className="font-medium text-red-400 hover:text-white hover:underline hover:bg-red-500 w-full"
						onClick={() => removeFromCart(item._id)}
					>
						<Trash size={30} />
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
