import React from "react";
import { useParams } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { constants, functions } from "services";

import { Button, Fields, Typography } from "components";
import Containers from "containers";
import { useTranslation } from "react-i18next";
import { EditSvg } from "components/Fields/Upload/EditSvg";

export const SectionForm = ({
	method,
	url,
	formData,
	onSuccess,
	btnSubmitText,
	onClose,
	vector,
	setVector,
	setSvgID,
	svgID,
	hasEdit = false,
	files = null,
	setFiles = () => {},
	onEdit = () => {},
}) => {
	const { complexID, sectionID } = useParams();
	const { t } = useTranslation();

	const translatedOptions = functions.translateConstans(t, constants.sectionStatusOptions);
	return (
		<>
			{!vector && (
				<Containers.Form
					method={method}
					url={url}
					fields={[
						{
							name: "name",
							validationType: "object",
							validations: [{ type: "lng" }],
							value: {
								en: get(formData, "name.en", ""),
								uz: get(formData, "name.uz", ""),
								ru: get(formData, "name.ru", ""),
							},
						},
						{
							name: "file_id",
							validationType: "number",
							value: get(formData, "file_id"),
						},
						{
							name: "background_id",
							validationType: "number",
							value: files.background_id || get(formData, "background_id"),
						},
						{
							name: "svg_id",
							validationType: "number",
							value: svgID || Number(get(formData, "svg_id")),
						},
						{
							name: "sort",
							validationType: "number",
							value: get(formData, "sort"),
						},
						{
							name: "status",
							validationType: "number",
							value: get(formData, "status")
								? get(formData, "status")
								: translatedOptions[0].value,
						},
						{
							name: "complex_id",
							validationType: "number",
							value: Number(complexID),
						},
					]}
					onSuccess={onSuccess}
				>
					{({ errors, isSubmitting, values }) => (
						<>
							{console.log(values)}
							<div className="card-box col-12">
								<Typography Type="h5" className="text-muted card-sub">
									{() => (
										<>
											<b>{t("Section")}</b>
											<small className="text-muted"> ID {sectionID}</small>
										</>
									)}
								</Typography>

								<div className="row g-4">
									<div className="col-12">
										<FastField
											name="name.en"
											component={Fields.Input}
											type="text"
											label={["Name of the section", " (EN)"]}
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.ru"
											component={Fields.Input}
											type="text"
											label={["Name of the section", " (RU)"]}
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.uz"
											component={Fields.Input}
											type="text"
											label={["Name of the section", " (UZ)"]}
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
											name="status"
											component={Fields.Select}
											options={translatedOptions}
											label="Status"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="background_id"
											component={Fields.Upload}
											label="Background"
											placeholder="Select File"
											btnText="Upload"
											imageTitle={
												get(files, "background.name") ||
												get(formData, "background.title")
											}
											setFiles={setFiles}
										/>
									</div>

									<div className="col-12">
										<FastField
											name="svg_id"
											component={Fields.Upload}
											hasEdit
											label="Svg"
											placeholder="Select File"
											btnText="Upload"
											accept={"image/svg+xml"}
											imageTitle={
												get(files, "svg.name") || get(formData, "svg.title")
											}
											onEdit={onEdit}
											setFiles={setFiles}
										/>
									</div>
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
			)}
			{vector && (
				<EditSvg
					vector={vector}
					setVector={setVector}
					filter={{ section_id: sectionID }}
					dataAttribute="floor"
					setSvgID={setSvgID}
					link={"floor"}
				/>
			)}
		</>
	);
};
