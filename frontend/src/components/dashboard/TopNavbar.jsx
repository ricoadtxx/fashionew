import { useUserStore } from "@/stores/useUserStore";
import { LogOut, Menu, UserCircle, X } from "lucide-react";
import { useState, useEffect } from "react"; // Tambahkan useEffect
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNavbar = () => {
	const { user, logout } = useUserStore();
	const location = useLocation();
	const currentPath = location.pathname;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const menuItems = [
		{ path: "/dashboard", label: "Overview" },
		{
			path: "/dashboard/products",
			label: "Products",
		},
		{
			path: "/dashboard/users",
			label: "Customers",
		},
	];

	const userInitials = user?.name
		? user.name
				.split(" ")
				.slice(0, 2)
				.map((word) => word[0])
				.join("")
				.toUpperCase()
		: "";

	// Efek untuk menutup sidebar saat ukuran layar mencapai md atau lebih besar
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1280) {
				// 768px adalah breakpoint untuk md di Tailwind CSS
				setIsSidebarOpen(false);
			}
		};

		// Tambahkan event listener untuk resize
		window.addEventListener("resize", handleResize);

		// Panggil handleResize sekali saat komponen dimount untuk memastikan sidebar tertutup jika layar sudah md atau lebih besar
		handleResize();

		// Hapus event listener saat komponen di-unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="fixed top-0 w-full justify-between items-center p-4 flex xl:hidden shadow-xl md:flex bg-gray-800 z-[9999]">
			<Button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="md:hidden p-2 bg-gray-800 text-white rounded-md"
			>
				<Menu size={24} />
			</Button>

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 w-64 md:hidden bg-gray-800 text-white transform flex flex-col justify-between ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out z-50`}
			>
				<div>
					<div className="p-4">
						<h1 className="text-white text-lg font-bold">Admin Dashboard</h1>
						<X
							onClick={() => setIsSidebarOpen(false)}
							className="text-white absolute top-4 right-4 cursor-pointer"
						/>
					</div>
					<Separator />
					<ul className="mt-4 flex flex-col gap-4">
						{menuItems.map((item, index) => {
							const isActive = currentPath === item.path;
							return (
								<Link
									key={index}
									to={item.path}
									className={`
                  text-base p-2 rounded-md transition duration-300 mx-2
                  ${
										isActive
											? "bg-white text-black"
											: "text-white hover:bg-white hover:text-black border-b"
									}
                `}
									onClick={() => setIsSidebarOpen(false)}
								>
									<span>{item.label}</span>
								</Link>
							);
						})}
					</ul>
				</div>
				<Button
					onClick={logout}
					className="flex items-center gap-2 mx-2 mb-4 bg-white text-black hover:bg-gray-900 hover:text-white"
				>
					Logout
				</Button>
			</div>

			{/* Overlay untuk menutup sidebar saat diklik di luar sidebar */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={() => setIsSidebarOpen(false)}
				></div>
			)}

			<div>
				<h1 className="text-white text-lg font-bold sm:text-sm hidden md:block">
					Admin Dashboard
				</h1>
			</div>
			<div>
				<ul className="text-black gap-2 hidden xl:hidden md:flex">
					{menuItems.map((item, index) => {
						const isActive = currentPath === item.path;
						return (
							<Link
								key={index}
								to={item.path}
								className={`
                text-base p-2 rounded-md transition duration-300 flex items-center gap-2 sm:text-xs
                ${
									isActive
										? "bg-white text-text-black"
										: "text-white hover:bg-white hover:text-black border-b"
								}
              `}
							>
								<span>{item.label}</span>
							</Link>
						);
					})}
				</ul>
			</div>
			<div className="flex items-center text-white cursor-pointer gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="flex items-center text-white bg-red-500 justify-center border-2 rounded-full cursor-pointer w-10 h-10 gap-2">
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
			</div>
		</div>
	);
};

export default TopNavbar;
