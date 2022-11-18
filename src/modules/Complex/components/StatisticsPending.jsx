import React, { useState } from "react";

// import { Table } from "components";
import { DateRangePicker } from "components/Fields/DateRangePicker/DateRangePicker";
import { TablePendingStatistics } from "./TablePendingStatistics";
import { useParams } from "react-router-dom";
import { useFetchList } from "hooks";
import { time } from "services";

export const StatisticsPending = ({ items }) => {
	const { complexID } = useParams();

	const [fromDataPending, setFromPending] = useState();
	const [toDataPending, setToPending] = useState();

	const statisticsPending = useFetchList({
		url: `/statistics/${complexID}/pending`,
		urlSearchParams: {
			filter: {
				from: time.toTimestamp(fromDataPending),
				to: time.toTimestamp(toDataPending),
			},
		},
	});
	return (
		<>
			<div className="statistcs col-12 g-2">
				<h3>Pending Statistics</h3>
				<div className="from-to offset-6 col-6">
					<div className="row g-2 mb-2">
						<div className="col-12">
							<DateRangePicker setFrom={setFromPending} setTo={setToPending} />
						</div>
					</div>
				</div>
				<div className="col-12">
					<TablePendingStatistics items={statisticsPending.data} />
				</div>
			</div>
		</>
	);
};
