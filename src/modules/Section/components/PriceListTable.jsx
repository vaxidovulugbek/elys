import { Fields, Table } from "components";
import { FastField } from "formik";
import React from "react";
import { constants } from "services";

export const PriceListTable = ({ data, status }) => {
	return (
		<Table
			columns={[
				{
					title: "ID",
					dataKey: "id",
					render: (value) => value,
				},
				{
					title: "Floor",
					dataKey: "name",
					render: (value) => value,
				},
				{
					title: "Price m²",
					dataKey: "price",
					render: (value, values, index) => (
						<FastField
							name={`floors.${index}.price`}
							component={Fields.InputMask}
							type="text"
							decimalSeparator=" "
							thousandSeparator=" "
						/>
					),
				},
				{
					title: "Start date",
					dataKey: "start_at",
					render: (value, values, index) => (
						<FastField
							name={`floors.${index}.start_at`}
							component={Fields.DatePicker}
						/>
					),
				},
				{
					title: "End date",
					dataKey: "end_at",
					render: (value, values, index) => (
						<FastField name={`floors.${index}.end_at`} component={Fields.DatePicker} />
					),
				},
				{
					title: "Created by",
					dataKey: "owner",
					render: (value) => value,
				},
				{
					title: "Status",
					dataKey: "status",
					render: (value) =>
						value &&
						constants.priceListOptions.find((item) => item.value === value).label,
				},
			]}
			items={data}
		/>
	);
};
