import React from "react";
import { isArray } from "lodash";

import { useDelete, useFetchInfinite, useFetchOneWithId, useOverlay } from "hooks";
import { notifications } from "services";

import { AddObject, Modals, PageHeading } from "components";
import { PlanFieldCard } from "../components/PlanFieldCard";
import { PlanFieldForm } from "../components/PlanFieldForm";

const PlanField = () => {
	const planFieldModal = useOverlay("planField");

	const planFieldList = useFetchInfinite({ url: "plan-field" });

	const { data, setId } = useFetchOneWithId({
		url: "plan-field",
		queryOptions: {
			enabled: false,
		},
		refetchStatus: planFieldModal.isOpen,
	});

	const deleteData = useDelete({
		url: "plan-field",
		queryOptions: { onSuccess: () => planFieldDelete() },
	});

	const planFieldDelete = () => {
		notifications.success("Plan field delete success");
		planFieldList.refetch();
	};

	const onDelete = (id) => {
		const receivePermission = () => {
			deleteData.mutate(id);
		};
		Modals.deletePermission({
			title: "Delete a plan field?",
			icon: "error",
			text: "All data concerning this plan field will be deleted.",
			receivePermission,
		});
	};

	const fetchFormData = (id) => {
		setId(id);
		planFieldModal.handleOverlayOpen();
	};

	return (
		<>
			<PageHeading
				title="Plan fields"
				links={[
					{ name: "Control Panel", url: "/" },
					{ name: "Plan fields", url: "" },
				]}
			/>

			<div className="row">
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() => {
							setId(null);
							planFieldModal.handleOverlayOpen();
						}}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A PLAN FIELD"
						className={"p-3"}
					/>
				</div>

				{isArray(planFieldList.data) &&
					planFieldList.data.map((item) => (
						<PlanFieldCard
							key={item.id}
							item={item}
							onDelete={onDelete}
							onClick={fetchFormData}
						/>
					))}
			</div>

			<PlanFieldForm
				planFieldList={planFieldList}
				planFieldModal={planFieldModal}
				data={data}
			/>
		</>
	);
};

export default PlanField;
