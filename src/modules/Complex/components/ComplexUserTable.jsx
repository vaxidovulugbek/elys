import React from "react";

// import { constants } from "services";

import { Table } from "components";

export const ComplexUsersTable = ({ items, onDelete }) => {
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
					title: "Username",
					dataKey: "user.username",
					render: (value) => value,
				},
				{
					title: "Status",
					dataKey: "user.status",
					render: (value) => value,
				},
			]}
		/>
	);
};
