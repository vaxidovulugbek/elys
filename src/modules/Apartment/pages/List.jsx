import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";

import { useDelete, useFetchList } from "hooks";

import Containers from "containers";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import { AddObject, FloorCard, PageHeading, Typography } from "components";

const Apartment = () => {
	const { floorID, complexID, sectionID } = useParams();
	const navigate = useNavigate();

	const apartment = useFetchList({
		url: "/apartment",
		urlSearchParams: {
			filter: { floor_id: floorID, section_id: sectionID, complex_id: complexID },
		},
	});

	const { mutate } = useDelete({
		url: "/apartment",
		queryOptions: {
			onSuccess: () => {
				apartment.refetch();
			},
		},
	});

	const onDelete = (id) => {
		deletePermission({
			title: "Delete a Apartment?",
			icon: "error",
			text: "All data concerning this apartment will be deleted.",
			receivePermission: () => mutate(id),
		});
	};

	return (
		<>
			<PageHeading
				title={`Floor ${floorID}`}
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "Complex" },
					{ url: `/complex/update/${complexID}`, name: "My complex" },
					{ url: `/complex/${complexID}/section/${sectionID}/floor`, name: "Floor" },
					{ url: "", name: "Apartment" },
				]}
			/>

			<div className="card-box transparent">
				<Typography Type="h5" className="text-muted card-sub">
					{() => <b>Apartments</b>}
				</Typography>
				<div className="row section-list">
					<Containers.List
						url="/apartment"
						urlSearchParams={{
							filter: {
								floor_id: floorID,
								section_id: sectionID,
								complex_id: complexID,
							},
						}}
					>
						{({ data }) => {
							if (!data) return "";
							return data?.map((item) => (
								<FloorCard
									onDelete={onDelete}
									key={item.id}
									item={item}
									onClick={(event) =>
										navigate(
											`/complex/${complexID}/section/${sectionID}/floor/${floorID}/apartment/${get(
												item,
												"id"
											)}/update`
										)
									}
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
			</div>
		</>
	);
};

export default Apartment;
