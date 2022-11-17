import React, { useState } from "react";

// import { Table } from "components";
import { DateRangePicker } from "components/Fields/DateRangePicker/DateRangePicker";
import { TableUserStatistics } from "./TableUserStatistics";
import { time } from "services";
import { useFetchList } from "hooks";
import { useParams } from "react-router-dom";

export const StatisticsUser = ({ items, setTo, setFrom }) => {
	const { complexID } = useParams();

	const [fromDataUser, setFromUser] = useState();
	const [toDataUser, setToUser] = useState();

	const statisticsUser = useFetchList({
		url: `/statistics/${complexID}/user`,
		urlSearchParams: {
			filter: {
				from: time.toTimestamp(fromDataUser),
				to: time.toTimestamp(toDataUser),
			},
		},
	});
	return (
		<>
			<div className="statistcs col-12 g-2">
				<h3>User Statistics</h3>
				<div className="from-to offset-6 col-6">
					<div className="row g-2 mb-2">
						<div className="col-12">
							<DateRangePicker setFrom={setFromUser} setTo={setToUser} />
						</div>
					</div>
				</div>
				<div className="col-12">
					<TableUserStatistics items={statisticsUser.data} />
				</div>
			</div>
		</>
	);
};
