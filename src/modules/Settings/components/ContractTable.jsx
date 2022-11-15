import { Table } from "components";
import React from "react";
import { constants, functions, time } from "services";
import { ReactComponent as DownloadIcon } from "assets/images/download.svg";

export const ContractTable = ({ items, onRowClick }) => {
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
						return constants.contractTypes.find((item) => (item.value = value)).label;
					},
				},
				{
					title: "Date",
					dataKey: "date",
					render: (value) => time.to(value),
				},
				{
					title: "Price",
					dataKey: "price",
					render: (value) => functions.convertToReadable(value),
				},
				{
					title: "Initial payment",
					dataKey: "initial_payment",
					render: (value) => value,
				},
				{
					title: "Monthly payment date",
					dataKey: "monthly_payment_date",
					render: (value) => time.to(value),
				},
				{
					title: "Status",
					dataKey: "status",
					render: (value) =>
						constants.sectionStatusOptions.find((item) => (item.value = value)).label,
				},
				{
					title: "File",
					dataKey: "destination",
					render: (value) => (
						<a
							href={value}
							blank="_target"
							className="btn btn_form btn_lg"
							style={{ height: "100%" }}
						>
							<DownloadIcon style={{ margin: 0 }} height="100%" width="100%" />
						</a>
					),
				},
			]}
			onRowClick={onRowClick}
		/>
	);
};
