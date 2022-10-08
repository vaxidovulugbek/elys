import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FastField, Field } from "formik";
import { get } from "lodash";

import { useFetchOne } from "hooks";

import Containers from "containers";
import { PageHeading, Fields, Button, MapPicker } from "components";
import { SectionList } from "modules/Section";
import { notifications } from "services";

const Update = () => {
	const navigate = useNavigate();
	const lngCode = useSelector((state) => state.system.lngCode);
	const { complexID } = useParams();

	const { data } = useFetchOne({
		url: `/complex/${complexID}`,
		urlSearchParams: { include: "region,district,files,svg,background" },
	});

	return (
		<>
			<PageHeading
				title={`${get(data, "name.en", "")}`}
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My Complex" },
					{ url: "", name: `${get(data, "name.en", "")}` },
				]}
				complexID={complexID}
				hasButton={true}
			/>
			<Containers.Form
				url={`/complex/${complexID}`}
				method="put"
				className="row"
				onSuccess={() => {
					navigate(-1);
					notifications.success("Успешно");
				}}
				onError={(error) => {
					notifications.error("Ошибка");
				}}
				fields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
						value: get(data, "name"),
					},
					{
						name: "address",
						validationType: "object",
						validations: [{ type: "lng" }],
						value: get(data, "address"),
					},
					{
						name: "region_id",
						validationType: "object",
						value: {
							value: get(data, "region.id"),
							label: get(data, `region.name.${lngCode}`),
						},
						onSubmitValue: (e) => get(e, "value"),
					},
					{
						name: "district_id",
						validationType: "object",
						value: {
							value: get(data, "district.id"),
							label: get(data, `district.name.${lngCode}`),
						},
						onSubmitValue: (e) => get(e, "value"),
					},
					{
						name: "background_id",
						validationType: "number",
						value: get(data, "background_id", null),
					},
					{
						name: "svg_id",
						value: get(data, "svg_id"),
					},
					{
						name: "file_ids",
						validationType: "array",
						value: data && get(data, "files", []).map((item) => item.id),
						// validations: [{ type: "required" }],
					},
					{
						name: "map",
						value:
							get(data, "lat") &&
							get(data, "lon") &&
							`${get(data, "lat")},  ${get(data, "lon")}`,
					},
					{
						name: "sort",
						validationType: "number",
						value: get(data, "sort"),
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
											label="Backround"
											btnText="Upload"
											imageTitle={get(data, "background.title")}
										/>
									</div>
									<div className="col-12">
										<FastField
											name="svg_id"
											component={Fields.Upload}
											label="Svg"
											btnText="Upload"
											accept={"image/svg+xml"}
											imageTitle={get(data, "svg.title")}
										/>
									</div>
									<div className="col-12 card-box">
										<FastField
											name="file_ids"
											component={Fields.MultiUpload}
											files={get(data, "files")}
											formData={data}
											queryKey={[
												"GET",
												`complex/${complexID}`,
												{ include: "region,district,files,svg,background" },
											]}
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
											url="/region"
											name="region_id"
											component={Fields.AsyncSelect}
											onValueChange={(option) =>
												setFieldValue("district_id", null)
											}
											optionLabel={`name.${lngCode}`}
											label="Region"
											placeholder="Moscow"
											urlSearchParams={(search) => ({
												filter: {
													name: search,
												},
											})}
										/>
									</div>

									<div className="col-12">
										<Field
											url="/district"
											name="district_id"
											component={Fields.AsyncSelect}
											key={get(values, "region_id.value")}
											isDisabled={!get(values, "region_id.value")}
											urlSearchParams={(search) => ({
												filter: {
													name: search,
													region_id: get(values, "region_id.value", null),
												},
											})}
											optionLabel={`name.${lngCode}`}
											label="District"
											placeholder="Pushkin"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="address.en"
											component={Fields.Input}
											label="Complex address EN"
											placeholder="Address"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="address.ru"
											component={Fields.Input}
											label="Complex address RU"
											placeholder="Address"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="address.uz"
											component={Fields.Input}
											label="Complex address UZ"
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
								<Button className="btn btn_green" type="submit" innerText="Save" />
							</div>
						</div>
					</>
				)}
			</Containers.Form>

			<SectionList complexID={complexID} />
		</>
	);
};

export default Update;
