import { create } from "zustand";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,
	customer: [],

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axiosInstance.post("/auth/signup", {
				name,
				email,
				password,
			});
			set({ user: res.data.user, loading: false });
			toast.success("Berhasil membuat akun", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
			});
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "An error occurred", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	signin: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axiosInstance.post("/auth/signin", {
				email,
				password,
			});

			set({ user: res.data.user, loading: false });
			toast.success("Berhasil login ke akun anda", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
			});
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "An error occurred", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ user: null });
			toast.success("Berhasil logout dari akun anda", {
				className: "bg-green-500 text-white rounded-lg p-4 shadow-md",
			});
		} catch (error) {
			toast.error(error.response.data.error || "An error occurred", {
				className: "bg-red-500 text-white rounded-lg p-4 shadow-md",
			});
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axiosInstance.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axiosInstance.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},

	fetchAllUser: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/auth/users"); // Sesuaikan dengan endpoint Anda
			set({ users: response.data.users, loading: false });
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	},
}));

// TODO: Implement the axios interceptors for refreshing access token

// axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
