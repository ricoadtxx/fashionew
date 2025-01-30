/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative bg-gradient-to-br h-[150px] ${color}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		whileHover={{
			scale: 1.05,
			rotate: 1,
			boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
		}}
	>
		<div className="flex justify-between items-center">
			<div className="z-0">
				<p className="text-gray-300 text-sm mb-1 font-semibold">{title}</p>
				<h3 className="text-white text-3xl font-bold">{value}</h3>
			</div>
		</div>
		<div className="absolute inset-0 bg-gradient-to-br opacity-30" />
		<div className="absolute -bottom-4 -right-4 text-gray-800 opacity-50">
			<Icon className="h-32 w-32" />
		</div>
	</motion.div>
);

export default AnalyticsCard;
