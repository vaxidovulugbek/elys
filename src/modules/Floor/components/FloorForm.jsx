import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";

import Containers from "containers";
import { Button, Fields } from "components";
import { FastField } from "formik";

export const FloorForm = ({
	method,
	url,
	formData,
	onSuccess,
	btnSubmitText = "Save",
	isFormData = false,
}) => {
	const { sectionID } = useParams();
	const navigate = useNavigate();

	const onClose = () => {
		navigate(-1);
	};
	return (
		<>
			<Containers.Form
				method={method}
				url={url}
				isFormData={isFormData}
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
						name: "section_id",
						validationType: "number",
						value: Number(sectionID),
						validations: [{ type: "required" }],
					},
				]}
				onSuccess={() => onSuccess()}
			>
				{({ errors }) => (
					<>
						<div className="card-box col-12">
							<h5 className="text-muted card-sub">
								<b>Floor</b>
								<small className="text-muted"> ID {sectionID}</small>
							</h5>
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
										name="sort"
										component={Fields.Input}
										type="number"
										label="Sort"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="background_id"
										component={Fields.Upload}
										label="Backround"
										placeholder="Select image"
										btnText="Upload"
										imageTitle={get(formData, "background.title")}
									/>
								</div>
								<div className="col-12">
									<FastField
										name="svg_id"
										component={Fields.Upload}
										label="Svg"
										placeholder="Select svg image"
										btnText="Upload"
										accept={"image/svg+xml"}
										imageTitle={get(formData, "svg.title")}
									/>
								</div>
								<div className="col-12">
									<FastField
										name="file_id"
										component={Fields.Upload}
										label="File"
										placeholder="Select image"
										btnText="Upload"
										imageTitle={get(formData, "file.title")}
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
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};
