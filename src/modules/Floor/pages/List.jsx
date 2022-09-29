import React from "react";
import { useParams } from "react-router-dom";
import { get } from "lodash";

import { useDelete, useFetchList, useFetchOneWithId, useOverlay } from "hooks";
import { notifications } from "services";

import Containers from "containers";
import { AddObject, Breadcrumb, Fields, FloorCard, ModalRoot, Modals } from "components";
import { SectionCard } from "../components/SectionCard";
import { FloorForm } from "../components/FloorForm";

const List = () => {
	const modal = useOverlay("modal");
	const planModal = useOverlay("plan");

	const { sectionID, complexID } = useParams();
	const floorQuery = useFetchList({
		url: "floor",
		urlSearchParams: {
			include: "file",
			filter: { section_id: sectionID },
		},
	});

	const { data, setId } = useFetchOneWithId({
		url: "floor",
		queryOptions: {
			enabled: false,
		},
		refetchStatus: planModal.isOpen,
	});

	const deleteData = useDelete({
		url: "floor",
		queryOptions: { onSuccess: () => floorDeleted() },
	});

	const floorDeleted = () => {
		notifications.success("Floor delete success");
		floorQuery.refetch();
	};

	const onDelete = (id) => {
		const receivePermission = () => {
			deleteData.mutate(id);
		};
		Modals.deletePermission({
			title: "Delete a floor?",
			icon: "error",
			text: "All data concerning this floor will be deleted.",
			receivePermission,
		});
	};

	const fetchFormData = (id) => {
		setId(id);
		planModal.handleOverlayOpen();
	};

	return (
		<>
			<div className="container-fluid section__update">
				<div className="mb-4">
					<h1 className="page-title">Section {sectionID}</h1>
					<Breadcrumb
						links={[
							{
								name: "Control Panel",
								url: "/",
							},
							{
								name: "Objects",
								url: "/",
							},
							{
								name: "My objects",
								url: "/",
							},
							{
								name: "Demo",
								url: "/",
							},
							{
								name: "Building 1",
								url: "/",
							},
							{
								name: "Floor",
								url: "/",
							},
						]}
					/>
				</div>

				<div className="row">
					<div className="col-lg-6">
						<div className="card-box transparent">
							<h5 className="text-muted card-sub">
								<b>Floor Plans</b>
							</h5>

							<div className="row section-list">
								<Containers.List
									url="floor"
									urlSearchParams={{
										include: "file",
										filter: { section_id: sectionID },
									}}
								>
									{({ data }) => {
										if (!data) return "";
										return data?.map((item) => (
											<FloorCard
												onDelete={onDelete}
												onClick={fetchFormData}
												key={item.id}
												item={item}
												link={`/complex/${complexID}/section/${sectionID}/floor/${get(
													item,
													"id"
												)}/apartment`}
											/>
										));
									}}
								</Containers.List>

								<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
									<AddObject
										onClick={() => {
											setId(null);
											planModal.handleOverlayOpen();
										}}
										src={require("assets/images/section-img1.png")}
										innerText="ADD A FLOOR PLAN"
										className={"p-3"}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="card-box transparent">
							<h5 className="text-muted card-sub">
								<b>Layout of accomodations</b>
							</h5>

							<div className="row g-4">
								{new Array(5).fill(1).map((el, index) => (
									<div
										className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card"
										key={index}
									>
										<SectionCard />
									</div>
								))}

								<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
									<AddObject
										onClick={modal.handleOverlayOpen}
										src={require("assets/images/layout-add.jpg")}
										innerText="ADD A LAYOUT"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ModalRoot isOpen={modal.isOpen} style={{ maxWidth: "500px" }}>
				<Modals.AddObject
					onClose={modal.handleOverlayClose}
					onSuccess={() => {
						console.log("Submited");
					}}
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

			<FloorForm {...{ data, planModal, floorQuery, sectionID }} />
		</>
	);
};

export default List;
