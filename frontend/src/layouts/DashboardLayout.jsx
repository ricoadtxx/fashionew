import LeftSidebar from "@/components/dashboard/LeftSidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<>
			<TopNavbar />
			<div className="flex xl:h-screen justify-center border border-black">
				{/* Sidebar */}
				<LeftSidebar />

				{/* Konten Utama */}
				<div className="container xl:flex-1max-w-lg sm:max-w-3xl md:max-w-7xl xl:max-w-screen-xl mx-auto p-5">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
