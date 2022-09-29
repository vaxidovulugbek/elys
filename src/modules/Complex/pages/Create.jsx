import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FastField, Field } from "formik";
import { get } from "lodash";

import { notifications } from "services";

import Containers from "containers";
import { PageHeading, Fields, Button, MapPicker } from "components";

const Create = () => {
	const navigate = useNavigate();
	const { complexID } = useParams();

	const onSuccess = () => {
		notifications.success("Object create success");
		navigate(-1);
	};

	return (
		<>
			<PageHeading
				title="Complex"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My complex" },
					{ url: "", name: "Complex" },
				]}
				complexID={complexID}
				hasButton={true}
			/>
			<Containers.Form
				url="/complex"
				method="post"
				className="row"
				onSuccess={onSuccess}
				onError={() => notifications.error("Something went wrong")}
				fields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
					},
					{
						name: "address",
						validationType: "object",
						validations: [{ type: "lng" }],
					},
					{
						name: "region_id",
						validationType: "object",
						onSubmitValue: (e) => get(e, "value"),
					},
					{
						name: "district_id",
						validationType: "object",
						onSubmitValue: (e) => get(e, "value"),
					},

					{
						name: "lat",
						validationType: "string",
					},
					{
						name: "lon",
						validationType: "string",
					},
				]}
			>
				{({ errors, values }) => (
					<>
						<div className="col-lg-6">
							<div className="card-box">
								<h5 className="text-muted card-sub">
									<b>Object</b>
									<small className="text-muted"> ID {complexID}</small>
								</h5>

								<div className="row g-4">
									<div className="col-12">
										<FastField
											name="name.en"
											component={Fields.Input}
											label={["Name of the Object EN", <span>*</span>]}
											placeholder="Object"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.ru"
											component={Fields.Input}
											label={["Name of the Object RU", <span>*</span>]}
											placeholder="Object"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.uz"
											component={Fields.Input}
											label={["Name of the Object UZ", <span>*</span>]}
											placeholder="Object"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-6">
							<div className="card-box">
								<h5 className="text-muted card-sub">
									<b>Location</b>
								</h5>

								<div className="row g-4">
									<FastField
										name="map"
										component={MapPicker}
										label="Coordinates"
										btnText="Choose on the map"
									/>

									<div className="col-12">
										<FastField
											url="region"
											name="region_id"
											component={Fields.AsyncSelect}
											optionLabel="name.ru"
											label="Region"
											placeholder="Toshkent"
										/>
									</div>

									<div className="col-12">
										<Field
											url="district"
											name="district_id"
											component={Fields.AsyncSelect}
											key={get(values, "region_id.value")}
											isDisabled={
												get(values, "region_id.value") ? false : true
											}
											optionLabel="name.uz"
											params={{
												filter: {
													region_id: get(values, "region_id.value", null),
												},
											}}
											label="District"
											placeholder="Yunusobod"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="address.en"
											component={Fields.Input}
											label="Object address EN"
											placeholder="Address"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="address.ru"
											component={Fields.Input}
											label="Object address RU"
											placeholder="Address"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="address.uz"
											component={Fields.Input}
											label="Object address UZ"
											placeholder="Address"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="bottom-buttons">
							<hr />
							<div className="d-flex align-items-center justify-content-center">
								<Button
									className="btn btn_outlined"
									type="reset"
									innerText="Cancel"
									onClick={() => navigate("/", { replace: true })}
								/>
								<Button className="btn btn_green" type="submit" innerText="Add" />
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default Create;
