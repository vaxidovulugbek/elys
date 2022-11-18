import { Table } from "components";
import React from "react";
import { time } from "services";

export const ClientsTable = ({ items, onRowClick }) => {
	return (
		<Table
			columns={[
				{
					title: "ID",
					dataKey: "id",
					render: (value) => value,
				},
				{
					title: "First name",
					dataKey: "first_name",
					render: (value) => value,
				},
				{
					title: "Middle name",
					dataKey: "middle_name",
					render: (value) => value,
				},
				{
					title: "Last name",
					dataKey: "last_name",
					render: (value) => value,
				},
				{
					title: "Address",
					dataKey: "address",
					render: (value) => value,
				},
				{
					title: "Birthdate",
					dataKey: "birthdate",
					render: (value) => time.to(value),
				},
				{
					title: "Phone",
					dataKey: "phone",
					render: (value) => value,
				},
				// {
				// 	title: "Email",
				// 	dataKey: "mail",
				// 	render: (value) => value,
				// },
				// {
				// 	title: "Passport",
				// 	dataKey: "passport",
				// 	render: (value) => value,
				// },
				// {
				// 	title: "Passport issued by",
				// 	dataKey: "passport_issued_by",
				// 	render: (value) => value,
				// },
				// {
				// 	title: "Passport issued date",
				// 	dataKey: "passport_issued_date",
				// 	render: (value) => time.to(value),
				// },
			]}
			items={items}
			onRowClick={onRowClick}
		/>
	);
};
