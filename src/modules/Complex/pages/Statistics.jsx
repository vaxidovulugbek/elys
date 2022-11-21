import React from "react";
import { PageHeading } from "components";
import { PieChart } from "../components/Charts/PieChart";
import { BarChart } from "../components/Charts/BarChart";
import StatisticsSell from "../components/StatisticsSell";
import ObjectsByStatus from "../components/ObjectsByStatus";
import StatisticsByManagers from "../components/StatisticsByManagers";
import { useFetchList } from "hooks";
import { useParams } from "react-router-dom";

const Statistics = () => {
	const { complexID } = useParams();

	const { data } =
		useFetchList({ url: `statistics/${complexID}`, dataKey: (value) => value }) || [];

	return (
		<>
			<PageHeading
				title="Statistics"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Statistics" },
				]}
			/>
			<div className="row g-4">
				<div className="col-lg-8">
					<StatisticsSell data={data} />
					<ObjectsByStatus data={data} />
				</div>
				<div className="col-lg-4 col-12">
					<div
						className="w-100 p-4"
						style={{
							background: "#FFFFFF",
							boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
							borderRadius: "6px",
						}}
					>
						<PieChart items={data?.apartmentArea} />
					</div>
				</div>
				<div className="col-12">
					<div
						className="w-100 p-4"
						style={{
							background: "#FFFFFF",
							boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
							borderRadius: "6px",
						}}
					>
						<BarChart />
					</div>
				</div>
				<div className="col-12">
					<StatisticsByManagers />
				</div>
			</div>
		</>
	);
};

export default Statistics;
