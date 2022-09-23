import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { FastField } from "formik";
import { get } from "lodash";

import { Button, Fields } from "components";
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
						validationType: "number",
						value: get(formData, "price"),
					},
					{
						name: "discount",
						validationType: "number",
						value: get(formData, "discount"),
					},
					{
						name: "room_count",
						validationType: "number",
						value: get(formData, "room_count"),
					},
					{
						name: "square_meter",
						validationType: "number",
						value: get(formData, "square_meter"),
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
				]}
				onSuccess={() => onSuccess()}
				onError={() => {
					navigate(-1);
					toast.error("Something went wrong!");
				}}
			>
				{() => (
					<>
						<div className="card-box">
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
										component={Fields.Input}
										type="number"
										label="Price"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="discount"
										component={Fields.Input}
										type="number"
										label="Discount"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="room_count"
										component={Fields.Input}
										type="number"
										label="Room count"
									/>
								</div>
								<div className="col-12">
									<FastField
										name="square_meter"
										component={Fields.Input}
										type="number"
										label="Square meter"
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
