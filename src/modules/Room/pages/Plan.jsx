import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, isArray } from "lodash";

import { notifications } from "services";
import { useDelete, useFetchInfinite, useScroll } from "hooks";

import { AddObject, Modals, PageHeading } from "components";
import { RoomCard } from "../components/RoomCard";

const Plan = () => {
	const { roomID } = useParams();
	const navigate = useNavigate();

	const planList = useFetchInfinite({
		url: "/plan",
		urlSearchParams: {
			filter: { room_id: roomID },
		},
	});
	useScroll(document.documentElement, planList.fetchNextPage, 100);

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
		navigate(`/room/${roomID}/plan/${id}/update`);
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

				{isArray(planList.data) &&
					planList.data.map((item, index) => (
						<RoomCard
							key={index}
							item={item}
							link={`/room/${roomID}/plan/${get(item, "id")}/update`}
							onDelete={onDelete}
							onClick={onUpdate}
						/>
					))}
			</div>
		</>
	);
};

export default Plan;
