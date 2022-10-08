import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { constants, notifications } from "services";

import { Button, Fields, Typography } from "components";
import Containers from "containers";

export const ApartmentForm = ({ method, url, formData, onSuccess, btnSubmitText = "Save" }) => {
	const { sectionID, complexID, floorID } = useParams();
	const navigate = useNavigate();

	const onClose = () => {
		navigate(-1);
	};

	return (
		<>
			<Containers.Form
				className="row"
				method={method}
				url={url}
				fields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
						value: {
							en: get(formData, "name.en", ""),
							ru: get(formData, "name.ru", ""),
							uz: get(formData, "name.uz", ""),
						},
					},
					{
						name: "description",
						validationType: "object",
						validations: [{ type: "lng" }],
						value: {
							en: get(formData, "description.en", ""),
							ru: get(formData, "description.ru", ""),
							uz: get(formData, "description.uz", ""),
						},
					},
					{
						name: "price",
						validationType: "string",
						value: Number(get(formData, "price")),
						onSubmitValue: (value) => Number(value.replaceAll(" ", "")),
					},
					{
						name: "discount",
						validationType: "string",
						value: Number(get(formData, "discount")),
						onSubmitValue: (value) => Number(value.replaceAll(" ", "")),
					},
					{
						name: "sort",
						validationType: "number",
						value: Number(get(formData, "sort")),
					},
					{
						name: "status",
						validationType: "number",
						value: 1,
					},
					{
						name: "type",
						validationType: "number",
						value: Number(get(formData, "type")),
					},
					{
						name: "construction_type",
						validationType: "number",
						value: Number(get(formData, "construction_type")),
					},
					{
						name: "class",
						validationType: "number",
						value: Number(get(formData, "class")),
					},
					{
						name: "status",
						validationType: "number",
						value: Number(get(formData, "status")),
					},
					{
						name: "file_ids",
						validationType: "array",
						value: formData && get(formData, "files").map((item) => item.id),
						// validations: [{ type: "required" }],
					},
					{
						name: "floor_id",
						validationType: "number",
						value: Number(floorID),
					},
					{
						name: "section_id",
						validationType: "number",
						value: Number(sectionID),
					},
					{
						name: "complex_id",
						validationType: "number",
						value: Number(complexID),
					},
					{
						name: "plan_id",
						validationType: "object",
						value: {
							label: get(formData, "plan.name.uz"),
							value: get(formData, "plan.id"),
						},
						onSubmitValue: (option) => get(option, "value"),
					},
				]}
				onSuccess={() => onSuccess()}
				onError={() => {
					navigate(-1);
					notifications.error("Something went wrong!");
				}}
			>
				{({ errors }) => (
					<>
						<div className="card-box col-6">
							<Typography Type="h5" className="text-muted card-sub">
								{() => (
									<>
										<b>Section</b>
										<small className="text-muted"> ID 2714</small>
									</>
								)}
							</Typography>

							<div className="row g-4">
								<div className="col-12">
									<FastField
										name="name.uz"
										component={Fields.Input}
										type="text"
										label="Name uz"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="name.ru"
										component={Fields.Input}
										type="text"
										label="Name ru"
									/>
								</div>

								<div className="col-12">
									<FastField
										name="name.en"
										component={Fields.Input}
										type="text"
										label="Name en"
									/>
								</div>

								<div className="col-12">
									<FastField
										name="description.uz"
										component={Fields.Input}
										type="text"
										label="Description uz"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="description.ru"
										component={Fields.Input}
										type="text"
										label="Description ru"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="description.en"
										component={Fields.Input}
										type="text"
										label="Description en"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="price"
										component={Fields.InputMask}
										type="text"
										label="Price"
										decimalSeparator=" "
										thousandSeparator=" "
									/>
								</div>
								<div className="col-12">
									<FastField
										name="discount"
										component={Fields.InputMask}
										type="text"
										label="Discount %"
										decimalSeparator=" "
										thousandSeparator=" "
									/>
								</div>
								<div className="col-12">
									<FastField
										name="sort"
										component={Fields.Input}
										type="number"
										label="Sort"
									/>
								</div>
								<div className="col-12">
									<FastField
										url="plan"
										name="plan_id"
										optionLabel="name.uz"
										component={Fields.AsyncSelect}
										label="Plan ID"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="status"
										component={Fields.Select}
										options={constants.statusOptions}
										label="Status"
										defaultValue={constants.statusOptions[0]}
									/>
								</div>
								<div className="col-12">
									<FastField
										name="type"
										component={Fields.Select}
										options={constants.typeOptions}
										label="Type"
										defaultValue={constants.typeOptions[0]}
									/>
								</div>
								<div className="col-12">
									<FastField
										name="construction_type"
										component={Fields.Select}
										options={constants.constructionOptions}
										label="Construction type"
										defaultValue={constants.constructionOptions[0]}
									/>
								</div>
								<div className="col-12">
									<FastField
										name="class"
										component={Fields.Select}
										options={constants.classOptions}
										label="Class"
										defaultValue={constants.classOptions[0]}
									/>
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="col-12 card-box">
								<FastField
									name="file_ids"
									component={Fields.MultiUpload}
									files={get(formData, "files")}
									formData={formData}
									queryKey={[
										"GET",
										`apartment/${get(formData, "id")}`,
										{ include: "plan,files" },
									]}
								/>
							</div>
						</div>
						<div className="bottom-buttons">
							<hr />
							<div className="d-flex align-items-center justify-content-center">
								<Button
									onClick={onClose}
									className="btn btn_outlined"
									type="button"
									innerText="Cancel"
								/>
								<Button
									className="btn btn_green"
									type="submit"
									innerText={btnSubmitText}
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};
