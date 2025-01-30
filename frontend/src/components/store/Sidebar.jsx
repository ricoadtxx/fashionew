/* eslint-disable react/prop-types */
import { useUserStore } from "@/stores/useUserStore";
import { Link } from "react-router-dom";
import { ListCategories } from "@/lib/utils";
import { Button } from "../ui/button";

const Sidebar = ({ isOpen, onClose }) => {
	const { user } = useUserStore();
	const isAdmin = user?.role === "admin";

	return (
		<div
			className={`fixed flex flex-col justify-between top-0 left-0 w-64 h-screen bg-gray-900 backdrop-blur-md shadow-lg z-40 transition-transform duration-300 ease-in-out lg:hidden ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<div className="p-4">
				<div className="flex justify-between items-center mb-6">
					<Link
						to="/"
						className="text-2xl font-bold text-emerald-400"
						onClick={onClose}
					>
						Fashionew
					</Link>
					<Button className="text-white text-xl" onClick={onClose}>
						&times;
					</Button>
				</div>
				<div className="grid grid-cols-1 gap-2">
					{ListCategories.map((category) => (
						<Link
							key={category.id}
							to={"/category" + category.href}
							className={`px-3 py-2 rounded-md relative text-center border-b shadow-md ${
								location.pathname.includes(category.href)
									? "bg-green-500 text-white"
									: "text-gray-300"
							}`}
							onClick={onClose}
						>
							{category.name}
						</Link>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-2 p-4">
				{isAdmin && (
					<Button className="border md:hidden w-full px-2 hover:opacity-80 rounded-md hover:text-white">
						<Link to="/dashboard" className="flex items-center gap-2">
							Dashboard
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
