import { HomeIcon, PackageIcon, User2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";

const LeftSidebar = () => {
	const { user, logout } = useUserStore();
	const location = useLocation();
	const currentPath = location.pathname;

	const menuItems = [
		{ path: "/dashboard", label: "Overview", icon: <HomeIcon size={20} /> },
		{
			path: "/dashboard/products",
			label: "Products",
			icon: <PackageIcon size={20} />,
		},
		{
			path: "/dashboard/users",
			label: "Customers",
			icon: <User2 size={20} />,
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

	return (
		<div className="w-64 bg-gray-800 p-4 border-r hidden border-gray-400 xl:flex xl:flex-col justify-between">
			<div>
				<div className="flex items-center gap-2">
					<div className="flex items-center text-white bg-red-500 justify-center border-2 rounded-full cursor-pointer w-8 h-8 gap-2">
						{userInitials}
					</div>
					<h1 className="text-white text-base xl:text-center font-bold">
						Admin Dashboard
					</h1>
				</div>
				<Separator className="my-4 text-white" />
				<ul className="flex flex-col gap-4">
					{menuItems.map((item, index) => {
						const isActive = currentPath === item.path;
						return (
							<Link
								key={index}
								to={item.path}
								className={`
                text-lg p-2 rounded-md transition duration-300 flex items-center gap-2
                ${
									isActive
										? "bg-white text-black"
										: "text-white hover:bg-white hover:text-black border-b"
								}
              `}
							>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						);
					})}
				</ul>
			</div>
			<div>
				<Button
					onClick={logout}
					className="w-full bg-white text-black hover:text-white"
				>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default LeftSidebar;
