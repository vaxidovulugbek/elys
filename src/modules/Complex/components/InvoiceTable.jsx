import { Table } from "components";
import React from "react";
import { functions, time } from "services";

export const InvoiceTable = ({ items, modal, onEdit }) => {
	const onView = () => {};
	return (
		<>
			<Table
				editAction={onEdit}
				viewAction={onView}
				checkAction={() => {}}
				columns={[
					{
						title: "ID",
						dataKey: "id",
						render: (value) => value,
					},
					{
						title: "Complex",
						dataKey: "complex_id",
						render: (value) => value,
					},
					{
						title: "Apartment",
						dataKey: "apartment_id",
						render: (value) => value,
					},
					{
						title: "Status",
						dataKey: "status",
						render: (value) => value,
					},
					{
						title: "Created at",
						dataKey: "created_at",
						render: (value) => time.to(value),
					},
					{
						title: "Payment type",
						dataKey: "payment_type",
						render: (value) => value,
					},
					{
						title: "Date",
						dataKey: "date",
						render: (value) => time.to(value),
					},
					{
						title: "Amount",
						dataKey: "amount",
						render: (value) => functions.toFixed(value, 2),
					},
				]}
				items={items}
			/>
		</>
	);
};
