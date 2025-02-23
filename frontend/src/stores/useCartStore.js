import { create } from "zustand";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export const useCartStore = create((set, get) => ({
	cart: [],
	total: 0,
	subtotal: 0,

	getCartItems: async () => {
		try {
			const res = await axiosInstance.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	clearCart: async () => {
		set({ cart: [], total: 0, subtotal: 0 });
	},

	addToCart: async (product) => {
		try {
			await axiosInstance.post("/cart", { productId: product._id });
			toast.success("Product added to cart", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
			});

			set((prevState) => {
				const existingItem = prevState.cart.find(
					(item) => item._id === product._id
				);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id
								? { ...item, quantity: item.quantity + 1 }
								: item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	removeFromCart: async (productId) => {
		await axiosInstance.delete(`/cart`, { data: { productId } });
		set((prevState) => ({
			cart: prevState.cart.filter((item) => item._id !== productId),
		}));
		get().calculateTotals();
	},

	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axiosInstance.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) =>
				item._id === productId ? { ...item, quantity } : item
			),
		}));
		get().calculateTotals();
	},

	calculateTotals: () => {
		const { cart } = get();
		const subtotal = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		let total = subtotal;

		set({ subtotal, total });
	},
}));
