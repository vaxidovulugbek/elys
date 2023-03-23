import React from "react";

import { Table } from "components";
import { functions } from "services";

export const UserTable = ({ items, onDelete, onEdit }) => {
	return (
		<Table
			items={items}
			deleteAction={onDelete}
			editAction={onEdit}
			columns={[
				{
					title: "Ism",
					dataKey: "first_name",
					render: (value) => value,
				},
				{
					title: "Familiya",
					dataKey: "last_name",
					render: (value) => value,
				},
				{
					title: "Username",
					dataKey: "username",
					render: (value) => value,
				},
				{
					title: "Phone",
					dataKey: "phone",
					render: (value) => value,
				},
				{
					title: "email",
					dataKey: "email",
					render: (value) => value,
				},
				{
					title: "Status",
					dataKey: "status",
					render: (value) =>
						value === 10 ? "active" : value === 9 ? "inactive" : "deleted",
				},
				{
					title: "Role",
					dataKey: "role",
					render: (value) => functions.showUserRole(value),
				},
			]}
		/>
	);
};
