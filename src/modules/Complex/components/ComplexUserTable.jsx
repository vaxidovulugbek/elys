import React from "react";

import { Table } from "components";
import { time } from "services";

export const ComplexUsersTable = ({ items, onDelete, onEdit }) => {
	return (
		<Table
			items={items}
			deleteAction={onDelete}
			editAction={onEdit}
			columns={[
				{
					title: "ID",
					dataKey: "id",
					render: (value) => value,
				},
				{
					title: "Username",
					dataKey: "user.username",
					render: (value) => value,
				},
				{
					title: "Status",
					dataKey: "status",
					render: (value) =>
						value === 10 ? "active" : value === 9 ? "inactive" : "deleted",
				},
				{
					title: "Time",
					dataKey: "expires_at",
					render: (value) => time.to(value),
				},
			]}
		/>
	);
};
