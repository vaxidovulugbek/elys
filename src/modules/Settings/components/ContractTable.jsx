import { Table } from "components";
import React from "react";
import { get } from "lodash";

import { constants, functions, time } from "services";

import Containers from "containers";
import { Fields } from "components";

import { ReactComponent as DownloadIcon } from "assets/images/download.svg";
import { FastField } from "formik";
import { Link } from "react-router-dom";
import { ReactComponent as InvoiceIcon } from "assets/images/invoice-icon.svg";

export const ContractTable = ({ items, onRowClick, refetch }) => {
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
					title: "Apartment ID",
					dataKey: "apartment_id",
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
					render: (value) => functions.convertToReadable(value),
				},
				{
					title: "Monthly payment date",
					dataKey: "monthly_payment_date",
					render: (value) => time.to(value),
				},
				{
					title: "Invoice",
					dataKey: "id",
					render: (value) => (
						<div onClick={(event) => event.stopPropagation()}>
							<Link
								to={`/invoice?contract_id=${value}`}
								className="object__action bg_blue"
							>
								<InvoiceIcon
									fill="#fff"
									stroke="#fff"
									width={"32px"}
									height={"32px"}
								/>
							</Link>
						</div>
					),
				},
				{
					title: "Status",
					dataKey: "status",
					render: (value, values) => (
						<Containers.Form
							url={`/contract/${get(values, "id")}`}
							method="put"
							onClick={(event) => event.stopPropagation()}
							onSuccess={refetch}
							onError={refetch}
							fields={[
								{
									name: "status",
									value,
									onSubmitValue: (value) => value,
								},
							]}
						>
							{({ handleSubmit }) => (
								<>
									<FastField
										name="status"
										component={Fields.Select}
										options={constants.contractStatus}
										className="min-width_120"
										onValueChange={() => handleSubmit()}
									/>
								</>
							)}
						</Containers.Form>
					),
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
							onClick={(event) => event.stopPropagation()}
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
