import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className="flex h-screen items-center flex-col justify-center sm:px-6 lg:px-8">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="text-center text-3xl font-extrabold text-emerald-400">
					Create your account
				</h2>
			</motion.div>

			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<Card>
					<CardHeader className="space-y-1 flex flex-col justify-center items-center">
						<CardTitle className="text-2xl">Sign Up</CardTitle>
						<CardDescription>
							Create a new account to get started.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<Label htmlFor="name">Full name</Label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</div>
									<Input
										id="name"
										type="text"
										required
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										className="pl-10"
										placeholder="Input your name"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="email">Email address</Label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Mail
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</div>
									<Input
										id="email"
										type="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										className="pl-10"
										placeholder="Input your email"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="password">Password</Label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</div>
									<Input
										id="password"
										type="password"
										required
										value={formData.password}
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
										}
										className="pl-10"
										placeholder="••••••••"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</div>
									<Input
										id="confirmPassword"
										type="password"
										required
										value={formData.confirmPassword}
										onChange={(e) =>
											setFormData({
												...formData,
												confirmPassword: e.target.value,
											})
										}
										className="pl-10"
										placeholder="••••••••"
									/>
								</div>
							</div>

							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? (
									<>
										<Loader
											className="mr-2 h-5 w-5 animate-spin"
											aria-hidden="true"
										/>
										Loading...
									</>
								) : (
									<>
										<UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
										Sign up
									</>
								)}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-center text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								to="/sign-in"
								className="font-medium text-yellow-600 hover:text-emerald-300"
							>
								Login here <ArrowRight className="inline h-4 w-4" />
							</Link>
						</p>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
