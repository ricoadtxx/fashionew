import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/dashboard/AdminPage";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductPage from "./pages/dashboard/ProductPage";
import CustomerPage from "./pages/dashboard/CustomerPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import { useCartStore } from "@/stores/useCartStore";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	const location = useLocation();

	const hideElementsPaths = ["/sign-in", "/sign-up", "/dashboard"];
	const shouldShowElements = !hideElementsPaths.some((path) =>
		location.pathname.startsWith(path)
	);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	const dashboardRoutes = [
		{
			path: "",
			element: <AdminPage />,
		},
		{
			path: "products",
			element: <ProductPage />,
		},
		{
			path: "users",
			element: <CustomerPage />,
		},
	];

	return (
		<div className="min-h-screen relative overflow-hidden bg-gray-200">
			<ScrollToTop />
			<div className={`relative z-50 ${shouldShowElements ? "pt-20" : ""}`}>
				{shouldShowElements && <Navbar />}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/sign-up"
						element={!user ? <SignUpPage /> : <Navigate to="/" />}
					/>
					<Route
						path="/sign-in"
						element={!user ? <SignInPage /> : <Navigate to="/" />}
					/>
					<Route
						path="/dashboard"
						element={
							user?.role === "admin" ? (
								<DashboardLayout />
							) : (
								<Navigate to="/sign-in" />
							)
						}
					>
						{dashboardRoutes.map((route, index) => (
							<Route key={index} path={route.path} element={route.element} />
						))}
					</Route>
					<Route path="/category/:category" element={<CategoryPage />} />
					<Route
						path="/cart"
						element={user ? <CartPage /> : <Navigate to="/sign-in" />}
					/>
				</Routes>
				{shouldShowElements && <Footer />}
			</div>
			<Toaster position="top-center" duration={2000} />
		</div>
	);
}

export default App;
