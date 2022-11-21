import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { functions } from "services";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom",
		},
	},
};

export function PieChart({ items }) {
	const apartmentAreasCounts = [];

	let apartmentAreaSum = 0;

	items?.map((item) => {
		apartmentAreasCounts.push(item.count_apartment);
		apartmentAreaSum += Number(item.sum_area);
	});

	const data = {
		labels: ["Доступно", "Заинтересован", "Проданные", "Hе для продажи"],
		datasets: [
			{
				label: "",
				data: [...apartmentAreasCounts],
				backgroundColor: ["#1ddd8d", "#ffb400", "#ec6372", "#5b8ec3"],
				borderColor: ["#1ddd8d", "#ffb400", "#ec6372", "#5b8ec3"],
				borderWidth: 1,
			},
		],
	};
	return (
		<div className="w-100">
			<h3
				className="mb-4"
				style={{
					fontFamily: "Roboto",
					fontStyle: "normal",
					fontWeight: "600",
					fontSize: "26px",
					lineHeight: "30px",
					textTransform: "capitalize",
					color: "#000000",
				}}
			>
				Объекты по статусам
			</h3>
			<div>
				<h3
					style={{
						fontFamily: "Roboto",
						fontStyle: "normal",
						fontWeight: "600",
						fontSize: "26px",
						lineHeight: "30px",
						textTransform: "capitalize",
						color: "#63ABFD",
					}}
				>
					{functions.toFixed(apartmentAreaSum, 2)} &#13217;
				</h3>
				<p
					style={{
						fontFamily: "Roboto",
						fontStyle: "normal",
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "16px",
						textTransform: "capitalize",
						color: "#4F4F4F",
					}}
				>
					Всего площадь
				</p>
			</div>
			<Pie data={data} options={options} />
		</div>
	);
}
