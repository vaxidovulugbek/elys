import { Fields, Table } from "components";
import { FastField } from "formik";
import React from "react";

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
					title: "floor",
					dataKey: "name.uz",
					render: (value) => value,
				},
				{
					title: "Price",
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
					title: "Start at",
					dataKey: "start_at",
					render: (value, values, index) => (
						<FastField
							name={`floors.${index}.start_at`}
							component={Fields.DatePicker}
						/>
					),
				},
				{
					title: "End at",
					dataKey: "end_at",
					render: (value, values, index) => (
						<FastField name={`floors.${index}.end_at`} component={Fields.DatePicker} />
					),
				},
				{
					title: "Created by",
					dataKey: "created_by",
					render: (value) => value,
				},
				{
					title: "Status",
					dataKey: "status",
					render: (value) => <span className={`status-${value}`}>{status[value]}</span>,
				},
			]}
			items={data}
		/>
	);
};
