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
import { useParams } from "react-router-dom";
import { useFetchList } from "hooks";
import { time } from "services";
import { Fields } from "components";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	borderRadius: "8px",
};

export function BarChart() {
	const { complexID } = useParams();
	const [rangeDate, setRangeDate] = useState([]);

	const statisticsContract = useFetchList({
		url: `/statistics/${complexID}/contract`,
		urlSearchParams: {
			filter: {
				from: rangeDate && Number(time.toTimestamp(rangeDate[0])),
				to: rangeDate && Number(time.toTimestamp(rangeDate[1])),
			},
		},
	});

	const contractsCount = [];
	const contractsDate = [];

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

	return (
		<div className="w-100" style={{ width: "100%" }}>
			<div className="d-flex mb-5 justify-content-between align-items-center ">
				<h3>Всего лидов по дням</h3>
				<Fields.RangeDatePicker
					values={rangeDate}
					onChange={setRangeDate}
					label="Дата (от ~ до)"
				/>
			</div>
			<Bar options={options} data={data} />
		</div>
	);
}
