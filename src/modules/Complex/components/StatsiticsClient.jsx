import React, { useState } from "react";

// import { Table } from "components";
import { DateRangePicker } from "components/Fields/DateRangePicker/DateRangePicker";
import { TableClientStatistics } from "./TableClientStasistics";
import { useParams } from "react-router-dom";
import { useFetchList } from "hooks";
import { time } from "services";

export const StatisticsClient = ({ items, setTo, setFrom }) => {
	const { complexID } = useParams();

	const [fromDataClient, setFromClient] = useState();
	const [toDataClient, setToClient] = useState();

	const statisticsClient = useFetchList({
		url: `/statistics/${complexID}/client`,
		urlSearchParams: {
			filter: {
				from: time.toTimestamp(fromDataClient),
				to: time.toTimestamp(toDataClient),
			},
			include: "client",
		},
	});
	return (
		<>
			<div className="statistcs col-12 g-2">
				<h3>Client Statistics</h3>
				<div className="from-to offset-6 col-6">
					<div className="row g-2 mb-2">
						<div className="col-12">
							<DateRangePicker setFrom={setFromClient} setTo={setToClient} />
						</div>
					</div>
				</div>
				<div className="col-12">
					<TableClientStatistics items={statisticsClient.data} />
				</div>
			</div>
		</>
	);
};
