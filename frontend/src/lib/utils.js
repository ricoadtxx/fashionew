import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const categories = ["baju", "rompi", "korsa", "sweater", "jaket", "kemeja"];

export const formatCurrency = (price) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(price);
};

export const ListCategories = [
	{ href: "/baju", name: "Baju", imageUrl: "/baju.jpeg" },
	{ href: "/rompi", name: "Rompi", imageUrl: "/rompi.jpeg" },
	{ href: "/korsa", name: "Korsa", imageUrl: "/korsa.jpeg" },
	{ href: "/sweater", name: "Sweater", imageUrl: "/sweater.jpeg" },
	{ href: "/jaket", name: "Jaket", imageUrl: "/jacket.jpeg" },
	{ href: "/kemeja", name: "Kemeja", imageUrl: "/kemeja.jpeg" },
];
