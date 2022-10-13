import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, isArray } from "lodash";

import { useDelete, useFetchInfinite, useScroll } from "hooks";

import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import { AddObject, FloorCard, PageHeading, Typography } from "components";
import PlanList from "./PlanList";
import { useTranslation } from "react-i18next";

const Apartment = () => {
	const { floorID, complexID, sectionID } = useParams();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const apartmentList = useFetchInfinite({
		url: "/apartment",
		urlSearchParams: {
			filter: { floor_id: floorID, section_id: sectionID, complex_id: complexID },
		},
	});
	useScroll(document.documentElement, apartmentList.fetchNextPage, 300);

	const { mutate } = useDelete({
		url: "/apartment",
		queryOptions: {
			onSuccess: () => {
				apartmentList.refetch();
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

			<div className="row section-list">
				<div className="col-6">
					<div className="card-box transparent">
						<Typography Type="h5" className="text-muted card-sub">
							{() => <b>{t("Apartments")}</b>}
						</Typography>
						<div className="row gap" style={{ "--column-gap": 0 }}>
							<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
								<AddObject
									onClick={() =>
										navigate(
											`/complex/${complexID}/section/${sectionID}/floor/${floorID}/apartment/create`
										)
									}
									src={require("assets/images/section-img1.png")}
									innerText="ADD AN APARTMENT"
									className={"p-3"}
								/>
							</div>

							{isArray(apartmentList.data) &&
								apartmentList.data.map((item) => (
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
								))}
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className="card-box transparent">
						<Typography Type="h5" className="text-muted card-sub">
							{() => <b>{t("Plans")}</b>}
						</Typography>
						<PlanList />
					</div>
				</div>
			</div>
		</>
	);
};

export default Apartment;
