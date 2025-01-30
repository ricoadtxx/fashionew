/* eslint-disable react/prop-types */
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
      <div className="p-3 bg-white border border-gray-300 rounded shadow-lg w-[200px]">
        <h1 className="font-bold text-base">Keterangan</h1>
				<p className="text-gray-800 font-semibold">{`Date: ${label}`}</p>
				<p className="text-green-500 font-medium">{`Penjualan: ${payload[0].value}`}</p>
				<p className="text-blue-500 font-medium">{`Pendapatan: ${payload[1].value}`}</p>
			</div>
		);
	}
	return null;
};

const ChartOverview = ({ dailySalesData }) => {
	return (
		<ResponsiveContainer width="100%" height={280}>
			<LineChart
				data={dailySalesData}
				margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
			>
				<CartesianGrid strokeDasharray="5 5" stroke="#E5E7EB" />
				<XAxis dataKey="name" stroke="#9CA3AF" />
				<YAxis yAxisId="left" stroke="#6EE7B7" />
				<YAxis yAxisId="right" orientation="right" stroke="#93C5FD" />
				<Tooltip content={<CustomTooltip />} />
				<Legend
					verticalAlign="top"
					align="right"
					wrapperStyle={{ paddingBottom: 10 }}
					iconType="circle"
				/>
				<Line
					yAxisId="left"
					type="monotone"
					dataKey="sales"
					stroke="#10B981"
					strokeWidth={3}
					dot={{ fill: "#10B981", r: 4 }}
					activeDot={{ r: 8 }}
					name="Penjualan"
				/>
				<Line
					yAxisId="right"
					type="monotone"
					dataKey="revenue"
					stroke="#3B82F6"
					strokeWidth={3}
					dot={{ fill: "#3B82F6", r: 4 }}
					activeDot={{ r: 8 }}
					name="Pendapatan"
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default ChartOverview;
