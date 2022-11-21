import { Fields, Table } from "components";
import React, { useState } from "react";
import { time } from "services";
import { DateRangePicker } from "components/Fields/DateRangePicker/DateRangePicker";
import { useParams } from "react-router-dom";
import { useFetchList } from "hooks";

function StatisticsByManagers() {
	const { complexID } = useParams();

	const [fromDataUser, setFromUser] = useState();
	const [toDataUser, setToUser] = useState();

	const [rangeDate, setRangeDate] = useState([]);

	const statisticsUser = useFetchList({
		url: `/statistics/${complexID}/user`,
		urlSearchParams: {
			filter: {
				from: time.toTimestamp(fromDataUser),
				to: time.toTimestamp(toDataUser),
			},
			include: "count_apartment,sum_price",
		},
	});

	console.log(statisticsUser);
	return (
		<div
			className="by-managers p-4"
			style={{
				background: "#FFFFFF",
				boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
				borderRadius: "6px",
			}}
		>
			<div className="heading mb-5 d-flex align-items-center justify-content-between">
				<h3>Статистика по менеджерам</h3>
				<Fields.RangeDatePicker
					values={rangeDate}
					onChange={setRangeDate}
					label="Date (From ~ To)"
				/>
				{/* <R setFrom={setFromUser} setTo={setToUser} /> */}
			</div>
			<Table
				style={{ backgroundColor: "#fff" }}
				items={statisticsUser.data}
				columns={[
					{
						title: "ID",
						dataKey: "id",
						render: (value) => value,
					},
					{
						title: "ФИО",
						dataKey: "created_by",
						render: (value) => value,
					},
					{
						title: "Количество продаж",
						dataKey: "count_apartment",
						render: (value) => value,
					},
					{
						title: "Итоговая сумма",
						dataKey: "sum_price",
						render: (value) => value,
					},
				]}
			/>
		</div>
	);
}

export default StatisticsByManagers;
