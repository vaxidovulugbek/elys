import { AddObject, Modals } from "components";
import { useDelete, useFetchInfinite, useScroll } from "hooks";
import { useScrollElement } from "hooks/useScrollElement";
import { get, isArray } from "lodash";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "services";
import { PlanCard } from "../components/PlanCard";

const PlanList = () => {
	const { complexID } = useParams();
	const navigate = useNavigate();

	const planList = useFetchInfinite({
		url: "/plan",
		urlSearchParams: { filter: { complex_id: complexID } },
	});
	// useScroll(document.documentElement, planList.fetchNextPage, 100);

	useScrollElement(planList.hasNextPage, planList.fetchNextPage);

	const deleteData = useDelete({
		url: "/plan",
		queryOptions: { onSuccess: () => planDeleted() },
	});

	const planDeleted = () => {
		notifications.success("Plan delete success");
		planList.refetch();
	};

	const onDelete = (id) => {
		Modals.deletePermission({
			title: "Delete a plan?",
			icon: "error",
			text: "All data concerning this plan will be deleted.",
			receivePermission: () => deleteData.mutate(id),
		});
	};

	const onUpdate = (id) => {
		navigate(`/complex/${complexID}/plan/${id}/update`);
	};

	console.log(planList.isLoading, "loading");
	return (
		<>
			<div className="row gap" style={{ "--column-gap": 0 }}>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() => {
							navigate(`/complex/${complexID}/plan/create`);
						}}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A PLAN"
						className={"p-3"}
					/>
				</div>

				{isArray(planList.data) &&
					planList.data.map((item, index) => (
						<PlanCard
							key={index}
							item={item}
							link={`/complex/${complexID}/plan/${get(item, "id")}/update`}
							onDelete={onDelete}
							onClick={onUpdate}
						/>
					))}
				{planList.isLoading && <div>Loading...</div>}
			</div>
		</>
	);
};

export default PlanList;
