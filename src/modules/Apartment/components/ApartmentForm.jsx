import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FastField, Field } from "formik";
import { get } from "lodash";

import { constants, functions, notifications } from "services";

import { Button, Fields, Typography } from "components";
import Containers from "containers";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const ApartmentForm = ({ method, url, formData, onSuccess, btnSubmitText = "Save" }) => {
	const { sectionID, complexID, floorID } = useParams();
	const lngCode = useSelector((state) => state.system.lngCode);
	const { t } = useTranslation();
	const navigate = useNavigate();

	const onClose = () => {
		navigate(-1);
	};

	const translatedStatusOptions = functions.translateConstans(t, constants.statusOptions);
	const translatedTypeOptions = functions.translateConstans(t, constants.typeOptions);
	const translatedClassOptions = functions.translateConstans(t, constants.classOptions);
	const translatedConstructionOptions = functions.translateConstans(
		t,
		constants.constructionOptions
	);

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
						value: Number(get(formData, "price_area")),
						onSubmitValue: (value) => Number(String(value).replaceAll(" ", "")),
					},
					{
						name: "discount",
						validationType: "string",
						value: Number(get(formData, "discount")),
						onSubmitValue: (value) => Number(String(value).replaceAll(" ", "")),
					},
					{
						name: "sort",
						validationType: "number",
						value: Number(get(formData, "sort")),
					},
					{
						name: "type",
						validationType: "number",
						value: Number(get(formData, "type")) || constants.typeOptions[0].value,
					},
					{
						name: "construction_type",
						validationType: "number",
						value:
							Number(get(formData, "construction_type")) ||
							constants.constructionOptions[0].value,
					},
					{
						name: "class",
						validationType: "number",
						value: Number(get(formData, "class")) || constants.classOptions[0].value,
					},
					{
						name: "status",
						validationType: "number",
						value: Number(get(formData, "status")) || constants.typeOptions[0].value,
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
							label: get(formData, `plan.name.${lngCode}`),
							value: get(formData, "plan.id"),
						},
						onSubmitValue: (option) => get(option, "value"),
					},
					{
						name: "pdf_id",
						validationType: "mixed",
						value: get(formData, "pdf.id"),
					},
				]}
				onSuccess={() => onSuccess()}
				onError={() => {
					navigate(-1);
					notifications.error("Something went wrong!");
				}}
			>
				{({ isSubmitting }) => (
					<>
						<div className="card-box col-6">
							<Typography Type="h5" className="text-muted card-sub">
								{() => (
									<>
										<b>{t("Floor")}</b>
										<small className="text-muted"> ID {floorID}</small>
									</>
								)}
							</Typography>

							<div className="row g-4">
								<div className="col-12">
									<FastField
										name="name.en"
										component={Fields.Input}
										type="text"
										label={["Name of the apartment", " (EN)", <span>*</span>]}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="name.ru"
										component={Fields.Input}
										type="text"
										label={["Name of the apartment", " (RU)", <span>*</span>]}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="name.uz"
										component={Fields.Input}
										type="text"
										label={["Name of the apartment", " (UZ)", <span>*</span>]}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="description.en"
										component={Fields.Input}
										type="text"
										label={["Description", " (EN)"]}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="description.ru"
										component={Fields.Input}
										type="text"
										label={["Description", " (RU)"]}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="description.uz"
										component={Fields.Input}
										type="text"
										label={["Description", " (UZ)"]}
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
										label={["Discount", " %"]}
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
										key={lngCode}
										optionLabel={`name.${lngCode}`}
										component={Fields.AsyncSelect}
										label="Plan ID"
										urlSearchParams={(search) => ({
											filter: {
												name: search,
												complex_id: complexID,
												lngCode,
											},
										})}
									/>
								</div>

								<div className="col-12">
									<Field
										name="status"
										component={Fields.Select}
										options={translatedStatusOptions}
										label="Status"
									/>
								</div>

								<div className="col-12">
									<Field
										name="type"
										component={Fields.Select}
										options={translatedTypeOptions}
										label="Type"
									/>
								</div>

								<div className="col-12">
									<Field
										name="construction_type"
										component={Fields.Select}
										options={translatedConstructionOptions}
										label="Construction type"
									/>
								</div>

								<div className="col-12">
									<Field
										name="class"
										component={Fields.Select}
										options={translatedClassOptions}
										label="Class"
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
										`/apartment/${get(formData, "id")}`,
										{ include: "plan,files" },
									]}
								/>

								<FastField
									name="pdf_id"
									component={Fields.Upload}
									label="PDF"
									placeholder="Select File"
									btnText="Upload"
									className="mt-4"
									accept=".pdf"
									imageTitle={get(formData, "pdf.title")}
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
									isLoading={isSubmitting}
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};
