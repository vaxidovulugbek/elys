import { Table } from "components";
import React from "react";
import { constants } from "services";

export const ContractTable = ({ items }) => {
	return (
		<Table
			items={items}
			columns={[
				{
					title: "ID",
					dataKey: "id",
					render: (value) => value,
				},
				{
					title: "Contract number",
					dataKey: "contract_number",
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
					title: "Price",
					dataKey: "price",
					render: (value) => value,
				},
				{
					title: "Initial payment",
					dataKey: "initial_payment",
					render: (value) => value,
				},
				{
					title: "Monthly payment date",
					dataKey: "monthly_payment_date",
					render: (value) => value,
				},
			]}
		/>
	);
};
