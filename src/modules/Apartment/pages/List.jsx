import React from "react";

import { get } from "lodash";

import Containers from "containers";
import { useDelete } from "hooks";

import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import { useNavigate, useParams } from "react-router-dom";
import { AddObject, FloorCard } from "components";

const Apartment = () => {
	const { floorID, complexID, sectionID } = useParams();
	const navigate = useNavigate();
	const { mutate } = useDelete({
		url: "apartment",
		queryOptions: {},
	});

	const onDelete = (id) => {
		const receivePermission = () => {
			mutate(id);
		};
		deletePermission({
			title: "Delete a Apartment?",
			icon: "error",
			text: "All data concerning this apartment will be deleted.",
			receivePermission,
		});
	};

	return (
		<>
			<div className="row section-list">
				<Containers.List
					url="apartment"
					urlSearchParams={{
						filter: { floor_id: floorID, section_id: sectionID, complex_id: complexID },
					}}
				>
					{({ data }) => {
						if (!data) return "";
						return data?.map((item) => (
							<FloorCard
								onDelete={onDelete}
								key={item.id}
								item={item}
								link={`/complex/${complexID}/section/${sectionID}/floor/${floorID}/apartment/${get(
									item,
									"id"
								)}/update`}
							/>
						));
					}}
				</Containers.List>

				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() =>
							navigate(
								`/complex/${complexID}/section/${sectionID}/floor/${floorID}/apartment/create`
							)
						}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A FLOOR APARTMENT"
						className={"p-3"}
					/>
				</div>
			</div>
		</>
	);
};

export default Apartment;
