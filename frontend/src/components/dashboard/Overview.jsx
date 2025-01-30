import {
	UserCircle,
	HandCoins,
	ShoppingCart,
	Package,
	ChevronDown,
} from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useProductStore } from "@/stores/useProductStore";
import UserList from "./UserList";
import ChartOverview from "./ChartOverview";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";

const Overview = () => {
	const { products, fetchAllProducts } = useProductStore();
	const { users, fetchAllUser } = useUserStore();

	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [analyticsResponse] = await Promise.all([
					axiosInstance.get("/analytics"),
					fetchAllUser(),
					fetchAllProducts(),
				]);

				setAnalyticsData(analyticsResponse.data.analyticsData);
				setDailySalesData(analyticsResponse.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching data:", error);
				setErrorMessage("Failed to fetch data. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [fetchAllProducts, fetchAllUser]);

	const totalDailySales = dailySalesData?.reduce(
		(total, day) => total + (day.sales || 0),
		0
	);

	const filteredProducts = products.filter((product) =>
		selectedCategory ? product.category === selectedCategory : true
	);

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
		<div className="flex flex-col gap-3 mt-16 xl:mt-0">
			<h1 className="text-3xl font-bold text-center md:text-left">OVERVIEW</h1>
			{errorMessage && (
				<div className="text-center py-2 text-red-500">{errorMessage}</div>
			)}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="grid grid-cols-1 lg:col-span-2 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full">
					<AnalyticsCard
						title="Total Customer"
						value={analyticsData.users.toLocaleString()}
						icon={UserCircle}
						color="from-indigo-500 via-purple-500 to-pink-500"
					/>
					<AnalyticsCard
						title="Total Pendapatan"
						value={analyticsData.totalRevenue.toLocaleString()}
						icon={HandCoins}
						color="from-emerald-500 to-cyan-700"
					/>
					<AnalyticsCard
						title="Penjualan Harian"
						value={totalDailySales.toLocaleString()}
						icon={ShoppingCart}
						color="from-blue-500 to-indigo-700"
					/>
					<AnalyticsCard
						title="Total Penjualan"
						value={analyticsData.totalSales.toLocaleString()}
						icon={Package}
						color="from-yellow-500 to-orange-700"
					/>
				</div>
				<div className="lg:col-span-1">
					<UserList users={users} />
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="border border-gray-400 h-[350px]">
					<div className="flex bg-gray-100 dark:bg-gray-800 justify-between items-center p-3 rounded-md">
						<h1 className="font-bold">Produk List</h1>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="p-2 w-[100px] border capitalize border-gray-600 rounded-md flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-100">
									{selectedCategory || "All"}
									<ChevronDown className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="bg-white border border-gray-400 w-full rounded-md shadow-lg">
								<DropdownMenuItem
									onSelect={() => setSelectedCategory("")}
									className="cursor-pointer px-4 py-2 hover:bg-gray-100"
								>
									All
								</DropdownMenuItem>
								{categories.map((category) => (
									<DropdownMenuItem
										key={category}
										onSelect={() => setSelectedCategory(category)}
										className="cursor-pointer px-4 py-2 hover:bg-gray-100 capitalize"
									>
										{category}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="h-[290px] rounded-b-lg overflow-auto">
						{products.length > 0 ? (
							filteredProducts?.map((product) => (
								<div
									key={product._id}
									className="flex justify-between px-3 py-2 hover:bg-gray-300 cursor-pointer"
								>
									<div className="flex items-center gap-2 w-full">
										<img
											className="h-9 w-9 rounded-full object-cover"
											src={product.image || "/fallback-image.png"}
											alt={product.name}
										/>
										<div className="w-full">
											<div className="flex gap-2 items-center justify-between">
												<p className="capitalize font-bold text-sm">
													{product.name}
												</p>
												<p className="text-xs font-bold text-blue-400">
													{formatCurrency(product.price)}
												</p>
											</div>
											<div className="flex gap-2 items-center justify-between">
												<p className="capitalize text-sm text-muted-foreground">
													{product.category}
												</p>
												<p className="text-sm text-muted-foreground font-semibold">
													{product.quantity} Buah
												</p>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-4 text-red-500">
								Tidak ada produk yang ditampilkan
							</div>
						)}
					</div>
				</div>
				<Card className="lg:col-span-2 h-[350px] p-0 border border-gray-400">
					<CardContent className="p-0">
						<CardHeader className="border-b-2 border-gray-300 flex justify-between items-center p-4">
							<h2 className="text-lg font-semibold">Penjualan Harian</h2>
						</CardHeader>
						<CardDescription>
							<ChartOverview dailySalesData={dailySalesData} />
						</CardDescription>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Overview;
