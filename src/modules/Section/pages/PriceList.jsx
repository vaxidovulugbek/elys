import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FieldArray } from "formik";
import { Button } from "components";
import Containers from "containers";
import { useFetchList } from "hooks";
import { get, isNumber, isObject } from "lodash";
import { constants, notifications, time } from "services";
import { PriceListTable } from "../components/PriceListTable";

const PriceList = () => {
	const { sectionID } = useParams();
	const navigate = useNavigate();

	const {
		STATUS_CONSTRUCTION,
		STATUS_CONSTRUCTION_TEXT,
		STATUS_FREE,
		STATUS_FREE_TEXT,
		STATUS_INTEREST,
		STATUS_INTEREST_TEXT,
		STATUS_NOT_FOR_SALE,
		STATUS_NOT_FOR_SALE_TEXT,
		STATUS_SOLD,
		STATUS_SOLD_TEXT,
	} = constants;

	const status = {
		[`${STATUS_FREE}`]: STATUS_FREE_TEXT,
		[`${STATUS_CONSTRUCTION}`]: STATUS_CONSTRUCTION_TEXT,
		[`${STATUS_INTEREST}`]: STATUS_INTEREST_TEXT,
		[`${STATUS_NOT_FOR_SALE}`]: STATUS_NOT_FOR_SALE_TEXT,
		[`${STATUS_SOLD}`]: STATUS_SOLD_TEXT,
	};

	const floorPriceList = useFetchList({
		url: `/section/${sectionID}/floor`,
		urlSearchParams: { include: "owner" },
	});

	const normalizedData = floorPriceList?.data?.map((item) => {
		const created_by = (isObject(item.price) && item.price.created_by) || null;
		const status = (isObject(item.price) && item.price.status) || null;
		const price = isObject(item.price) ? item.price.price : item.price;
		const start_at = (isObject(item.price) && item.price.start_at * 1000) || null;
		const end_at = (isObject(item.price) && item.price.end_at * 1000) || null;
		return {
			id: item.id,
			"name.uz": item.name.uz,
			price,
			status,
			created_by,
			start_at,
			end_at,
		};
	});

	if (normalizedData && !normalizedData.length)
		return (
			<div style={{ position: "absolute", left: "50%", top: "50%" }}>FLOORS NOT FOUND!!!</div>
		);
	return (
		<>
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
						onSubmitValue: (value) => {
							return value.map((item) => {
								return {
									id: item.id,
									start_at: isNumber(get(item, "start_at"))
										? get(item, "start_at") / 1000
										: time.toTimestamp(get(item, "start_at")),
									end_at: isNumber(get(item, "end_at"))
										? get(item, "end_at") / 1000
										: time.toTimestamp(get(item, "end_at")),
									price: Number(String(item.price).replaceAll(" ", "")),
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
										<PriceListTable data={normalizedData} status={status} />
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
