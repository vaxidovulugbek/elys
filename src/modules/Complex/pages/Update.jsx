import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FastField, Field } from "formik";
import { get } from "lodash";

import { useEditSvg, useFetchOne } from "hooks";

import Containers from "containers";
import { PageHeading, Fields, Button, MapPicker, Typography } from "components";
import { SectionList } from "modules/Section";
import { functions, notifications } from "services";
import { EditSvg } from "components/Fields/Upload/EditSvg";
import { ReactQuillComponent } from "components/Fields/ReactQuill/ReactQuillComponent";

const Update = () => {
	const navigate = useNavigate();
	const lngCode = useSelector((state) => state.system.lngCode);
	const { complexID } = useParams();

	const [svgID, setSvgID] = useState();

	const { data } = useFetchOne({
		url: `/complex/${complexID}`,
		urlSearchParams: { include: "region,district,files,svg,background,vector" },
	});

	const { setFiles, setVector, vector, files } = useEditSvg(data);

	const onEdit = functions.onEditCreator({ files, data, setVector });

	return (
		<>
			<PageHeading
				title={`${get(data, "name.en", "")}`}
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My complexes" },
					{ url: "", name: `${get(data, "name.en", "")}` },
				]}
				complexID={complexID}
				hasButton={true}
			/>
			{!vector && (
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
							name: "content",
							validationType: "object",
							validations: [{ type: "lng" }],
							value: get(data, "content"),
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
							value: files.background_id || get(data, "background_id", null),
						},
						{
							name: "svg_id",
							value: svgID || get(data, "svg_id"),
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
							value: get(data, "lat"),
						},
						{
							name: "lon",
							validationType: "string",
							value: get(data, "lon"),
						},
					]}
				>
					{({ values, setFieldValue, isSubmitting }) => (
						<>
							<div className="col-lg-6">
								<div className="card-box">
									<Typography Type="h5" className="text-muted card-sub">
										{(t) => (
											<>
												<b>{t("Complex")}</b>
												<small className="text-muted">
													{" "}
													ID {complexID}
												</small>
											</>
										)}
									</Typography>

									<div className="row g-4">
										<div className="col-12">
											<FastField
												name="name.en"
												component={Fields.Input}
												label={[
													"Name of the Complex",
													" (EN)",
													<span>*</span>,
												]}
												placeholder="Complex"
											/>
										</div>

										<div className="col-12">
											<FastField
												name="name.ru"
												component={Fields.Input}
												label={[
													"Name of the Complex",
													" (RU)",
													<span>*</span>,
												]}
												placeholder="Complex"
											/>
										</div>

										<div className="col-12">
											<FastField
												name="name.uz"
												component={Fields.Input}
												label={[
													"Name of the Complex",
													" (UZ)",
													<span>*</span>,
												]}
												placeholder="Complex"
											/>
										</div>

										<div className="col-12">
											<FastField
												name="content.en"
												component={ReactQuillComponent}
												label={["Content", " (EN)"]}
												placeholder="Complex"
											/>
										</div>

										<div className="col-12">
											<FastField
												name="content.ru"
												component={ReactQuillComponent}
												label={["Content", " (RU)"]}
												placeholder="Complex"
											/>
										</div>

										<div className="col-12">
											<FastField
												name="content.uz"
												component={ReactQuillComponent}
												label={["Content", " (UZ)"]}
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
												label="Background"
												btnText="Upload"
												imageTitle={
													get(files, "background.name") ||
													get(data, "background.title")
												}
												setFiles={setFiles}
											/>
										</div>
										<div className="col-12">
											<Field
												name="svg_id"
												component={Fields.Upload}
												label="Svg"
												btnText="Upload"
												accept={"image/svg+xml"}
												imageTitle={
													get(files, "svg.name") || get(data, "svg.title")
												}
												setFiles={setFiles}
												hasEdit
												onEdit={onEdit}
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
													`/complex/${complexID}`,
													{
														include:
															"region,district,files,svg,background,vector",
													},
												]}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="card-box">
									<Typography Type="h5" className="text-muted card-sub">
										{() => <b>Location</b>}
									</Typography>

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
														region_id: get(
															values,
															"region_id.value",
															null
														),
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

									<Button
										className="btn btn_green"
										type="submit"
										innerText="Save"
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
					filter={{ complex_id: complexID }}
					dataAttribute="section"
					setSvgID={setSvgID}
					link={"section"}
				/>
			)}
			{!vector && <SectionList complexID={complexID} />}
		</>
	);
};

export default Update;
