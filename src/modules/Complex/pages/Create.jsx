import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FastField, Field } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { notifications } from "services";

import Containers from "containers";
import { PageHeading, Fields, Button, MapPicker } from "components";

const Create = () => {
	const navigate = useNavigate();
	const lngCode = useSelector((state) => state.system.lngCode);

	const onSuccess = () => {
		notifications.success("Complex create success");
		navigate(-1);
	};

	return (
		<>
			<PageHeading
				title="Complex"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My complexes" },
					{ url: "", name: "Complex" },
				]}
				hasButton={true}
			/>

			<Containers.Form
				url="/complex"
				method="post"
				isFormData
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
						name: "background_id",
						validationType: "number",
					},
					{
						name: "status",
						validationType: "number",
						value: 10,
					},
					{
						name: "svg_id",
						validationType: "number",
					},
					{
						name: "file_ids",
						validationType: "array",
					},
					{
						name: "category_id",
						validationType: "object",
						onSubmitValue: (e) => get(e, "value"),
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
						name: "sort",
						validationType: "number",
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
				{({ errors, values, setFieldValue }) => (
					<>
						<div className="col-lg-6">
							<div className="card-box">
								<h5 className="text-muted card-sub">
									<b>Complex</b>
								</h5>

								<div className="row g-4">
									<div className="col-12">
										<FastField
											name="name.en"
											component={Fields.Input}
											label={["Name of the Complex", " (EN)", <span>*</span>]}
											placeholder="Complex"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.ru"
											component={Fields.Input}
											label={["Name of the Complex", " (RU)", <span>*</span>]}
											placeholder="Complex"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.uz"
											component={Fields.Input}
											label={["Name of the Complex", " (UZ)", <span>*</span>]}
											placeholder="Complex"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="sort"
											component={Fields.Input}
											label="Sort"
											placeholder="sort"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="background_id"
											component={Fields.Upload}
											label={"Background"}
											placeholder="Select File"
											btnText="Upload"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="svg_id"
											component={Fields.Upload}
											label={"Svg"}
											placeholder="Select File"
											btnText="Upload"
											accept={"image/svg+xml"}
										/>
									</div>
									<div className="col-12">
										<FastField name="file_ids" component={Fields.MultiUpload} />
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
											url="category"
											name="category_id"
											component={Fields.AsyncSelect}
											optionLabel={`name.${lngCode}`}
											label="Category"
											placeholder="Category"
											urlSearchParams={(search) => ({
												filter: {
													name: search,
												},
											})}
										/>
									</div>

									<div className="col-12">
										<FastField
											url="region"
											name="region_id"
											component={Fields.AsyncSelect}
											optionLabel={`name.${lngCode}`}
											onValueChange={() => setFieldValue("district_id", null)}
											label="Region"
											placeholder="Toshkent"
											urlSearchParams={(search) => ({
												filter: {
													name: search,
												},
											})}
										/>
									</div>

									<div className="col-12">
										<Field
											url="district"
											name="district_id"
											component={Fields.AsyncSelect}
											key={get(values, "region_id.value")}
											isDisabled={!get(values, "region_id.value")}
											optionLabel={`name.${lngCode}`}
											urlSearchParams={(search) => ({
												filter: {
													name: search,
													region_id: get(values, "region_id.value", null),
												},
											})}
											label="District"
											placeholder="Yunusobod"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="address.en"
											component={Fields.Input}
											label={["Complex address", " (EN)"]}
											placeholder="Address"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="address.ru"
											component={Fields.Input}
											label={["Complex address", " (RU)"]}
											placeholder="Address"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="address.uz"
											component={Fields.Input}
											label={["Complex address", " (UZ)"]}
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
