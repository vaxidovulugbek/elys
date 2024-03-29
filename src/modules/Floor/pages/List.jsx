import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, isArray } from "lodash";

import { useDelete, useFetchInfinite, useOverlay, useScroll } from "hooks";

import {
	AddObject,
	Breadcrumb,
	Fields,
	FloorCard,
	ModalRoot,
	Modals,
	Typography,
} from "components";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import { useTranslation } from "react-i18next";

const List = () => {
	const modal = useOverlay("modal");
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { sectionID, complexID } = useParams();

	const floorList = useFetchInfinite({
		url: "/floor",
		urlSearchParams: {
			include: "file",
			filter: { section_id: sectionID },
		},
	});
	useScroll(document.documentElement, floorList.fetchNextPage, 300);

	const { mutate } = useDelete({
		url: "/floor",
		queryOptions: {
			onSuccess: () => {
				floorList.refetch();
			},
		},
	});

	const onDelete = (id) => {
		deletePermission({
			title: "Delete a Floor?",
			icon: "error",
			text: "All data concerning this floor will be deleted.",
			receivePermission: () => mutate(id),
		});
	};

	return (
		<>
			<div className="container-fluid section__update">
				<div className="mb-4">
					<Typography Type="h1" className="page-title" text={`Section ${sectionID}`} />
					<Breadcrumb
						links={[
							{
								name: "Control Panel",
								url: "/",
							},
							{
								name: "Complex",
								url: "/",
							},
							{
								name: "Section",
								url: `/complex/update/${complexID}`,
							},
							{
								name: "Floor",
								url: "",
							},
						]}
					/>
				</div>

				<div className="row">
					<div className="col-lg-12">
						<div className="card-box transparent">
							<Typography Type="h5" className="text-muted card-sub">
								{() => <b>{t("Floors")}</b>}
							</Typography>

							<div className="row section-list">
								<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
									<AddObject
										onClick={() => {
											navigate(
												`/complex/${complexID}/section/${sectionID}/floor/create`
											);
										}}
										src={require("assets/images/section-img1.png")}
										innerText="ADD A FLOOR"
										className={"p-3"}
									/>
								</div>

								{isArray(floorList.data) &&
									floorList.data.map((item) => (
										<FloorCard
											onDelete={onDelete}
											onClick={() =>
												navigate(
													`/complex/${complexID}/section/${sectionID}/floor/${get(
														item,
														"id"
													)}/update`
												)
											}
											key={item.id}
											item={item}
											link={`/complex/${complexID}/section/${sectionID}/floor/${get(
												item,
												"id"
											)}/apartment`}
										/>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<ModalRoot isOpen={modal.isOpen} style={{ maxWidth: "500px" }}>
				<Modals.AddObject
					onClose={modal.handleOverlayClose}
					title={"Adding a layout"}
					fields={[
						{
							name: "name",
							component: Fields.Input,
							label: ["Layout name", <span>*</span>],
							placeholder: "1A",
						},
					]}
				/>
			</ModalRoot>
		</>
	);
};

export default List;
