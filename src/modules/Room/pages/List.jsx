import React from "react";
import { get } from "lodash";

import { useDelete, useFetchList, useFetchOneWithId, useOverlay } from "hooks";
import { notifications } from "services";

import Containers from "containers";
import { AddObject, Modals, PageHeading } from "components";
import { RoomCard } from "../components/RoomCard";
import { RoomForm } from "../components/RoomForm";

const List = () => {
	const roomModal = useOverlay("room");
	const roomList = useFetchList({ url: "/room" });

	const { data, setId } = useFetchOneWithId({
		url: "/room",
		queryOptions: {
			enabled: false,
		},
		refetchStatus: roomModal.isOpen,
	});

	const deleteData = useDelete({
		url: "/room",
		queryOptions: { onSuccess: () => roomDeleted() },
	});

	const roomDeleted = () => {
		notifications.success("Room delete success");
		roomList.refetch();
	};

	const onDelete = (id) => {
		Modals.deletePermission({
			title: "Delete a room?",
			icon: "error",
			text: "All data concerning this room will be deleted.",
			receivePermission: () => deleteData.mutate(id),
		});
	};

	const fetchFormData = (id) => {
		setId(id);
		roomModal.handleOverlayOpen();
	};

	return (
		<>
			<PageHeading
				title="My rooms"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "Complex" },
					{ url: "", name: "Room" },
				]}
			/>
			<div className="row g-4">
				<Containers.List url="/room">
					{({ data }) => {
						return (
							<>
								{Array.isArray(data) &&
									data.map((item, index) => (
										<RoomCard
											key={index}
											item={item}
											onClick={fetchFormData}
											onDelete={onDelete}
											link={`/room/${get(item, "id")}/plan`}
										/>
									))}
							</>
						);
					}}
				</Containers.List>

				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() => {
							setId(null);
							roomModal.handleOverlayOpen();
						}}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A ROOM"
						className={"p-3"}
					/>
				</div>
			</div>

			<RoomForm roomModal={roomModal} data={data} roomList={roomList} />
		</>
	);
};

export default List;
