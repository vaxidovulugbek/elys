import React, {  } from "react";
import { useParams } from "react-router-dom";

import { PageHeading } from "components";
import { StatisticsClient } from "../components/StatsiticsClient";
import { StatisticsUser } from "../components/StatisticsUser";
import { StatisticsPending } from "../components/StatisticsPending";

const Statistics = () => {
	const { complexID } = useParams();

	return (
		<>
			<PageHeading
				title="Users"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Statistics" },
				]}
			/>
			<div className="row g-3">
				<div className="col-6">
					<StatisticsClient />
				</div>
				<div className="col-6">
					<StatisticsUser />
				</div>
				<div className="col-6">
					<StatisticsPending />
				</div>
			</div>
		</>
	);
};

export default Statistics;
