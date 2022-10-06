import React from "react";

import { constants } from "services";

import { Table } from "components";

export const TariffTable = ({ items, onDelete }) => {
	return (
		<Table
			items={items}
			deleteAction={onDelete}
			columns={[
				{
					title: "ID",
					dataKey: "id",
					render: (value) => value,
				},
				{
					title: "Type",
					dataKey: "type",
					render: (value) => {
						return constants.typeOptions.find((item) => (item.value = value)).label;
					},
				},
				{
					title: "Initial payment %",
					dataKey: "payment",
					render: (value) => value,
				},
				{
					title: "Discount %",
					dataKey: "discount",
					render: (value) => value,
				},
				{
					title: "Duration month",
					dataKey: "month_count",
					render: (value) => value,
				},
			]}
		/>
	);
};
