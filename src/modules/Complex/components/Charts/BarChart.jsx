import React, { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DateRangePicker } from "components/Fields/DateRangePicker/DateRangePicker";
import { useParams } from "react-router-dom";
import { useFetchList } from "hooks";
import { time } from "services";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	borderRadius: "8px",
};

export function BarChart() {
	const { complexID } = useParams();

	const [fromDataContract, setFromContract] = useState();
	const [toDataContract, setToContract] = useState();

	const statisticsContract = useFetchList({
		url: `/statistics/${complexID}/contract`,
		urlSearchParams: {
			filter: {
				from: time.toTimestamp(fromDataContract),
				to: time.toTimestamp(toDataContract),
			},
		},
	});

	const contractsCount = [15, 156, 134, 56];
	const contractsDate = ["12-23-26", "12-23-27", "12-23-278", "12-23-286"];

	statisticsContract.data?.map((item) => {
		contractsCount.push(item.count);
		contractsDate.push(item.date);
	});

	const labels = [...contractsDate];

	const data = {
		labels,
		datasets: [
			{
				label: "контракты",
				data: [...contractsCount],
				backgroundColor: "#65ABFD",
			},
		],
	};
	console.log(statisticsContract);
	return (
		<div className="w-100" style={{ width: "100%" }}>
			<div className="d-flex mb-5 justify-content-between align-items-center ">
				<h3>Всего лидов по дням</h3>
				<DateRangePicker setFrom={setFromContract} setTo={setToContract} />
			</div>
			<Bar options={options} data={data} />
		</div>
	);
}
