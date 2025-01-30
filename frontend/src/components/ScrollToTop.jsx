import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname } = useLocation(); // Mendapatkan URL saat ini

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll ke atas dengan efek halus
	}, [pathname]); // Efek akan berjalan setiap kali pathname berubah

	return null;
};

export default ScrollToTop;
