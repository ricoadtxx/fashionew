import {
	ShoppingCart,
	LogInIcon,
	UserCircle,
	LogOut,
	Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { ListCategories } from "@/lib/utils";
import Sidebar from "@/components/store/Sidebar";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const userInitials = user?.name
		? user.name
				.split(" ")
				.slice(0, 2)
				.map((word) => word[0])
				.join("")
				.toUpperCase()
		: "";

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1028) {
				setIsSidebarOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
			<div className="mx-auto px-4 py-3">
				<nav className="grid grid-cols-2 lg:grid-cols-6 cursor-pointer">
					<div className="flex items-center gap-2 lg:hidden">
						<Menu
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							size={24}
							className="text-white my-auto border-2 rounded-md"
						/>
					</div>
					<Link
						to="/"
						className="text-2xl lg:col-span-1 font-bold text-emerald-400 items-center space-x-2 lg:block hidden my-auto"
					>
						Fashionew
					</Link>
					<div className="hidden lg:flex gap-6 mx-auto col-span-4">
						{ListCategories.map((category) => (
							<Link
								key={category.id}
								to={"/category" + category.href}
								className={`px-3 py-2 rounded-md relative ${
									location.pathname.includes(category.href)
										? "text-blue-600"
										: "text-gray-300"
								}`}
							>
								{category.name}
								<div
									className={`${
										location.pathname.includes(category.href)
											? "absolute flex justify-center w-full left-0 -bottom-[13px] border-2 border-blue-400"
											: ""
									}`}
								></div>
							</Link>
						))}
					</div>
					<div className="flex items-center gap-2 justify-end lg:col-span-1">
						{isAdmin && (
							<div className="flex items-center gap-2">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="px-2">
											<Link
												to="/cart"
												className={`flex items-center gap-2 relative ${
													location.pathname.includes("/cart")
														? "bg-blue-300 text-black p-1 rounded-lg"
														: "text-white"
												}`}
											>
												<ShoppingCart size={25} />
												{cart.length > 0 && (
													<span
														className={`absolute -top-4 -left-4 bg-emerald-500 text-white rounded-full py-0.5 px-1.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out ${
															location.pathname.includes("/cart")
																? "-top-3 -left-3"
																: "-top-4 -left-4"
														}`}
													>
														{cart.length}
													</span>
												)}
											</Link>
										</TooltipTrigger>
										<TooltipContent className="text-base">
											Your Cart
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<Button className="hidden md:block border px-2 hover:opacity-80 rounded-md bg-white text-black hover:text-white">
									<Link to="/dashboard" className="flex items-center gap-2">
										Dashboard
									</Link>
								</Button>
							</div>
						)}

						{user ? (
							<>
								{!isAdmin && (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="px-2">
												<Link
													to="/cart"
													className={`flex items-center gap-2 relative ${
														location.pathname.includes("/cart")
															? "bg-blue-300 text-black p-1 rounded-lg"
															: "text-white"
													}`}
												>
													<ShoppingCart size={25} />
													{cart.length > 0 && (
														<span
															className={`absolute -top-4 -left-4 bg-emerald-500 text-white rounded-full py-0.5 px-1.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out ${
																location.pathname.includes("/cart")
																	? "-top-3 -left-3"
																	: "-top-4 -left-4"
															}`}
														>
															{cart.length}
														</span>
													)}
												</Link>
											</TooltipTrigger>
											<TooltipContent className="text-base">
												Your Cart
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div className="flex items-center text-white bg-red-500 justify-center border-2 rounded-full cursor-pointer w-10 h-10 p-2 gap-2">
											{userInitials}
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-40 mx-5 my-2 border rounded-none border-gray-500">
										<DropdownMenuItem>
											<Link
												to="/profile"
												className="w-full border p-1.5 rounded-lg bg-blue-950 text-white hover:bg-white hover:text-black transition duration-300 hover:border-black flex items-center gap-2"
											>
												<UserCircle />
												<span className="text-base">Profile</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link
												className="w-full border p-1.5 rounded-lg bg-blue-950 text-white hover:bg-white hover:text-black transition duration-300 hover:border-black flex items-center gap-2"
												onClick={logout}
											>
												<LogOut /> <span className="text-base">Logout</span>
											</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
						) : (
							<Button className="border-2 px-2 hover:opacity-80 rounded-lg">
								<Link to="/sign-in" className="flex items-center gap-2">
									<LogInIcon size={20} />
									<span>Login</span>
								</Link>
							</Button>
						)}
					</div>
				</nav>
				<Sidebar
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
				/>
			</div>
		</header>
	);
};
export default Navbar;
