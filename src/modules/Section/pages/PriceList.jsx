import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FieldArray } from "formik";
import { Button, PageHeading } from "components";
import Containers from "containers";
import { useFetchList } from "hooks";
import { get, isNumber, isObject } from "lodash";
import { constants, notifications, time } from "services";
import { PriceListTable } from "../components/PriceListTable";
import { useSelector } from "react-redux";

const PriceList = () => {
	const { complexID, sectionID } = useParams();
	const lngCode = useSelector((state) => state.system.lngCode);
	const navigate = useNavigate();

	const floorPriceList = useFetchList({
		url: `/section/${sectionID}/floor`,
		urlSearchParams: { include: "price.owner" },
	});

	const normalizedData = floorPriceList?.data?.map((item) => {
		const status = get(item, "price.status", null);
		const price = isObject(item.price) ? get(item, "price.price", null) : get(item, "price");
		const start_at = (isObject(item.price) && item.price.start_at * 1000) || null;
		const end_at = (isObject(item.price) && item.price.end_at * 1000) || null;
		const owner = get(item, "price.owner.username", null);
		return {
			id: get(item, "id"),
			name: get(item, `name.${lngCode}`),
			price,
			status,
			start_at,
			end_at,
			owner,
		};
	});

	if (normalizedData && !normalizedData.length)
		return (
			<div style={{ position: "absolute", left: "50%", top: "50%" }}>FLOORS NOT FOUND!!!</div>
		);

	return (
		<>
			<PageHeading
				title="Price List"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: `/complex/update/${complexID}`, name: "Sections" },
					{ url: "", name: "Price list" },
				]}
			/>
			<Containers.Form
				url={`/section/${sectionID}/floor`}
				method="put"
				onSuccess={() => {
					notifications.success("floor prices is updated");
					navigate(-1);
				}}
				fields={[
					{
						name: "floors",
						validationType: "array",
						value: normalizedData,
						onSubmitValue: (floors) => {
							return floors.map((floor) => {
								return {
									id: get(floor, "id"),
									start_at: isNumber(get(floor, "start_at"))
										? get(floor, "start_at") / 1000
										: time.toTimestamp(get(floor, "start_at")),
									end_at: isNumber(get(floor, "end_at"))
										? get(floor, "end_at") / 1000
										: time.toTimestamp(get(floor, "end_at")),
									price: Number(String(floor.price).replaceAll(" ", "")),
								};
							});
						},
					},
				]}
			>
				{({ values, isSubmitting, errors }) => (
					<>
						<FieldArray name="floors">
							{(remove, push) => {
								return (
									<div>
										<PriceListTable
											data={normalizedData}
											status={constants.statuses}
										/>
									</div>
								);
							}}
						</FieldArray>
						<div className="bottom-buttons">
							<hr />

							<div className="d-flex align-items-center justify-content-center">
								<Button
									onClick={() => {
										navigate(-1);
									}}
									className="btn btn_outlined"
									type="reset"
									innerText="Cancel"
								/>

								<Button
									className="btn btn_green"
									type="submit"
									innerText={"Save"}
									isSubmitting={isSubmitting}
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default PriceList;
