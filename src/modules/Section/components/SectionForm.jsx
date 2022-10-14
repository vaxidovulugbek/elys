import React from "react";
import { useParams } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { constants } from "services";

import { Button, Fields, Typography } from "components";
import Containers from "containers";

export const SectionForm = ({ method, url, formData, onSuccess, btnSubmitText, onClose }) => {
	const { complexID, sectionID } = useParams();

	return (
		<>
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
						value: get(formData, "background_id"),
					},
					{
						name: "svg_id",
						validationType: "number",
						value: Number(get(formData, "svg_id")),
					},
					{
						name: "sort",
						validationType: "number",
						value: get(formData, "sort"),
					},
					{
						name: "status",
						validationType: "number",
						value: get(formData, "status"),
					},
					{
						name: "complex_id",
						validationType: "number",
						value: Number(complexID),
					},
				]}
				onSuccess={onSuccess}
			>
				{({ errors, isSubmitting }) => (
					<>
						<div className="card-box col-12">
							<Typography Type="h5" className="text-muted card-sub">
								{() => (
									<>
										<b>Section</b>
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
										options={constants.statusOptions}
										label="Status"
										defaultValue={constants.statusOptions[0]}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="background_id"
										component={Fields.Upload}
										label="Background"
										placeholder="Select File"
										btnText="Upload"
										imageTitle={get(formData, "background.title")}
									/>
								</div>

								<div className="col-12">
									<FastField
										name="svg_id"
										component={Fields.Upload}
										label="Svg"
										placeholder="Select File"
										btnText="Upload"
										accept={"image/svg+xml"}
										imageTitle={get(formData, "svg.title")}
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
		</>
	);
};
