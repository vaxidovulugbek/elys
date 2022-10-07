import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";

import { notifications } from "services";
import { useDelete, useFetchList } from "hooks";

import Containers from "containers";
import { AddObject, Modals, PageHeading } from "components";
import { RoomCard } from "../components/RoomCard";

const Plan = () => {
	const { roomID } = useParams();
	const navigate = useNavigate();

	const planList = useFetchList({
		url: "/plan",
		urlSearchParams: {
			filter: { room_id: roomID },
		},
	});

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

	return (
		<>
			<PageHeading
				title={`Plan ${roomID}`}
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/room", name: "Room" },
					{ url: "", name: "Plan" },
				]}
			/>
			<div className="row gap" style={{ "--column-gap": 0 }}>
				<Containers.List
					url="/plan"
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
										link={`/room/${roomID}/plan/${get(item, "id")}/update`}
										onDelete={onDelete}
									/>
								))}
						</>
					)}
				</Containers.List>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() => {
							navigate(`/room/${roomID}/plan/create`);
						}}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A ROOM PLAN"
						className={"p-3"}
					/>
				</div>
			</div>
		</>
	);
};

export default Plan;
