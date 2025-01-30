import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signin, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signin(email, password);
	};

	return (
		<div className="flex pt-32 flex-col justify-center py-12 sm:px-6 lg:px-8">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
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
					<CardHeader className="space-y-1 flex flex-col items-center justify-center">
						<CardTitle className="text-2xl">Sign In</CardTitle>
						<CardDescription>
							Enter your email and password to sign in.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
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
										value={email}
										onChange={(e) => setEmail(e.target.value)}
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
										value={password}
										onChange={(e) => setPassword(e.target.value)}
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
										<LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
										Login
									</>
								)}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-center text-sm text-gray-600">
							Not a member?{" "}
							<Link
								to="/sign-up"
								className="font-medium text-yellow-600 hover:text-emerald-300"
							>
								Sign up now <ArrowRight className="inline h-4 w-4" />
							</Link>
						</p>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};
export default SignInPage;
