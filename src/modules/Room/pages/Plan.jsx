import { AddObject, Modals } from "components";
import Containers from "containers";
import { useDelete, useFetchList, useFetchOneWithId, useOverlay } from "hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { notifications } from "services";
import { PlanForm } from "../components/PlanForm";
import { RoomCard } from "../components/RoomCard";

const Plan = () => {
	const { roomID } = useParams();
	const planRoom = useOverlay("planRoom");

	const planList = useFetchList({
		url: "plan",
		urlSearchParams: {
			filter: { room_id: roomID },
		},
	});

	const { data, setId } = useFetchOneWithId({
		url: "plan",
		queryOptions: {
			enabled: false,
		},
		refetchStatus: planRoom.isOpen,
	});
	const deleteData = useDelete({
		url: "plan",
		queryOptions: { onSuccess: () => planDeleted() },
	});

	const planDeleted = () => {
		notifications.success("Plan delete success");
		planList.refetch();
	};

	const onDelete = (id) => {
		const receivePermission = () => {
			deleteData.mutate(id);
		};
		Modals.deletePermission({
			title: "Delete a plan?",
			icon: "error",
			text: "All data concerning this plan will be deleted.",
			receivePermission,
		});
	};

	const fetchFormData = (id) => {
		setId(id);
		planRoom.handleOverlayOpen();
	};

	return (
		<>
			<div className="row">
				<Containers.List
					url="plan"
					urlSearchParams={{
						filter: { room_id: roomID },
					}}
				>
					{({ data }) => (
						<>
							{Array.isArray(data) &&
								data.map((item, index) => (
									<RoomCard
										key={index}
										item={item}
										onClick={fetchFormData}
										onDelete={onDelete}
									/>
								))}
						</>
					)}
				</Containers.List>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() => {
							setId(null);
							planRoom.handleOverlayOpen();
						}}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A ROOM PLAN"
						className={"p-3"}
					/>
				</div>
			</div>
			<PlanForm {...{ planRoom, roomID, data, planList }} />
		</>
	);
};

export default Plan;
