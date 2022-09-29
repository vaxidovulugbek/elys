import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FastField } from "formik";
import { get } from "lodash";

import Containers from "containers";
import { notifications } from "services";
import { Button, Fields } from "components";

export const PlanForm = ({ method, url, formData, onSuccess, btnSubmitText = "Save" }) => {
	const { roomID } = useParams();
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
				]}
				onSuccess={() => onSuccess()}
				onError={() => {
					navigate(-1);
					notifications.error("Something went wrong!");
				}}
			>
				{(formik) => (
					<>
						<div className="card-box col-6">
							<h5 className="text-muted card-sub">
								<b>Section</b>
								<small className="text-muted"> ID 2714</small>
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
										name="area"
										component={Fields.Input}
										type="number"
										label="Area"
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
									queryData={[
										"GET",
										`plan/${get(formData, "id")}`,
										{ include: "files" },
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
