import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FastField, FieldArray } from "formik";
import { get } from "lodash";

import Containers from "containers";
import { notifications } from "services";
import { Button, Fields, Typography } from "components";

export const PlanForm = ({ method, url, formData, onSuccess, btnSubmitText = "Save" }) => {
	const { roomID, planID } = useParams();
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
						name: "room_id",
						validationType: "number",
						value: Number(roomID),
					},
					{
						name: "area",
						validationType: "number",
						value: get(formData, "area"),
						// validations: [{ type: "required" }],
					},
					{
						name: "file_ids",
						validationType: "array",
						value: formData && get(formData, "files").map((item) => item.id),
						// validations: [{ type: "required" }],
					},
					{
						name: "fields",
						validationType: "array",
						value:
							get(formData, "fields") &&
							get(formData, "fields").map((field) => ({
								...field,
								plan_field_id: {
									label: field.plan_field.name.uz,
									value: field.plan_field.id,
								},
							})),
						onSubmitValue: (fields) =>
							fields.map((item) => ({
								...item,
								plan_field_id: item.plan_field_id.value,
							})),
					},
				]}
				onSuccess={() => onSuccess()}
				onError={() => {
					navigate(-1);
					notifications.error("Something went wrong!");
				}}
			>
				{({ values }) => (
					<>
						<div className="card-box col-6">
							<Typography Type="h5" className="text-muted card-sub">
								{() => (
									<>
										<b>Plan</b>
										<small className="text-muted">{planID}</small>
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
										name="area"
										component={Fields.Input}
										type="number"
										label="Area"
									/>
								</div>
								<FieldArray name="fields">
									{({ remove, push }) => (
										<>
											{values.fields.length > 0 &&
												values.fields.map((field, index) => (
													<Fragment key={index}>
														<div className="col-12">
															<FastField
																name={`fields[${index}].value.en`}
																component={Fields.Input}
																type="text"
																label="Field en"
															/>
														</div>
														<div className="col-12">
															<FastField
																name={`fields[${index}].value.ru`}
																component={Fields.Input}
																type="text"
																label="Field ru"
															/>
														</div>
														<div className="col-12">
															<FastField
																name={`fields[${index}].value.uz`}
																component={Fields.Input}
																type="text"
																label="Field uz"
															/>
														</div>
														<div className="col-12">
															<FastField
																url="plan-field"
																name={`fields[${index}].plan_field_id`}
																optionLabel="name.uz"
																component={Fields.AsyncSelect}
																label="Plan Field ID"
																urlSearchParams={(search) => ({
																	filter: {
																		name: search,
																	},
																})}
															/>
														</div>
														<div className="col-12">
															<Button
																className="btn bg_red"
																type="button"
																onClick={() => remove(index)}
																innerText="Delete field"
																style={{ color: "#fff" }}
															/>
														</div>
													</Fragment>
												))}
											<Button
												className="btn btn_green"
												type="button"
												innerText="Add field"
												onClick={() =>
													push({ value: { en: "", ru: "", uz: "" } })
												}
												style={{
													maxWidth: "fit-content",
													marginLeft: "auto",
												}}
											/>
										</>
									)}
								</FieldArray>
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
										`plan/${get(formData, "id")}`,
										{ include: "files,fields,fields.plan_field" },
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
