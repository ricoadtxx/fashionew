import { Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";

/* eslint-disable react/prop-types */
const UserList = ({ users }) => {
	return (
		<div className="overflow-y-auto border border-gray-400 rounded-lg h-full">
			<div className="flex bg-gray-100 dark:bg-gray-800 justify-between items-center p-3">
				<div>
					<h1 className="font-bold">Daftar Customer</h1>
				</div>
				<div className="">
					<Filter />
				</div>
			</div>
			{users.length > 0 ? (
				users.map((user) => (
					<div
						key={user._id}
						className="flex justify-between p-4 hover:bg-gray-300 cursor-pointer"
					>
						<div className="flex items-center gap-1">
							<div className="border-2 rounded-full border-blue-600 h-10 w-10"></div>
							<div>
								<div className="flex gap-2 items-center">
									<p className="font-bold text-sm">{user.name}</p>
									<p className="bg-green-500 px-1 text-xs text-white font-bold rounded-md">
										{user.role}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">{user.email}</p>
								</div>
							</div>
						</div>
						{/* <Button className="bg-red-500 rounded-full px-3 py-5">
							<Trash2 />
						</Button> */}
					</div>
				))
			) : (
				<tr>
					<td colSpan="4" className="text-center py-4">
						No customers found
					</td>
				</tr>
			)}
		</div>
	);
};

export default UserList;
