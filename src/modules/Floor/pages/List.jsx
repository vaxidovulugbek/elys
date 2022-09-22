import React from "react";
import { useMutation } from "@tanstack/react-query";
import { AddObject, Breadcrumb, Fields, FloorCard, ModalRoot, Modals } from "components";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import Containers from "containers";
import { useDelete, useFetchList, useOverlay } from "hooks";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { httpCLient } from "services";
import { SectionCard } from "../components/SectionCard";

const List = () => {
	const modal = useOverlay("modal");
	const planModal = useOverlay("plan");
	const { mutate, data, reset } = useMutation(fetchFormData);
	const deleteData = useDelete({
		url: "floor",
		queryOptions: {},
	});
	const { sectionID, complexID } = useParams();
	const floorQuery = useFetchList({
		url: "floor",
		urlSearchParams: {
			include: "file",
			filter: { section_id: sectionID },
		},
	});

	const onSuccess = () => {
		floorQuery.refetch();
		planModal.handleOverlayClose();
		reset();
		toast.success(data ? "floor is updated" : "floor is created");
	};

	const onClose = (cb) => {
		reset();
		planModal.handleOverlayClose();
		cb();
	};

	const onDelete = (id) => {
		const receivePermission = () => {
			deleteData.mutate({ id });
		};
		deletePermission({
			title: "Delete a floor?",
			icon: "error",
			text: "All data concerning this floor will be deleted.",
			receivePermission,
		});
	};

	async function fetchFormData(id) {
		const res = await httpCLient.get(`floor/${id}`);
		planModal.handleOverlayOpen();
		return res.data.data;
	}

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
												onClick={mutate}
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
										onClick={planModal.handleOverlayOpen}
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
								{new Array(1, 2, 3, 4, 5).map((el) => (
									<div
										className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card"
										key={el}
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

			<ModalRoot isOpen={planModal.isOpen} style={{ maxWidth: "500px" }}>
				<Modals.AddObject
					onClose={onClose}
					title={"Adding plan of floor"}
					onSuccess={onSuccess}
					fields={[
						{
							name: "name.en",
							component: Fields.Input,
							label: ["Floor name", <span>*</span>],
							placeholder: "1 floor",
						},
						{
							name: "name.ru",
							component: Fields.Input,
							label: ["Название этажа", <span>*</span>],
							placeholder: "1 этаж",
						},
						{
							name: "name.uz",
							component: Fields.Input,
							label: ["Qavat nomi", <span>*</span>],
							placeholder: "1 qavat",
						},
						{
							name: "file_id",
							component: Fields.Upload,
							placeholder: "Select Image",
							btnText: "Upload",
							className: "mt-4",
						},
					]}
					formFields={[
						{
							name: "name",
							validationType: "object",
							validations: [{ type: "lng" }],
							value: {
								en: get(data, "name.en", ""),
								uz: get(data, "name.uz", ""),
								ru: get(data, "name.ru", ""),
							},
						},
						{
							name: "file_id",
							validationType: "number",
							// validations: [{ type: "required" }],
						},
						{
							name: "section_id",
							validationType: "number",
							value: Number(sectionID),
							validations: [{ type: "required" }],
						},
					]}
					url={get(data, "id") ? `floor/${data.id}` : "floor"}
					submitText={get(data, "id") ? "Save" : "Add"}
					method={get(data, "id") ? "put" : "post"}
				/>
			</ModalRoot>
		</>
	);
};

export default List;
