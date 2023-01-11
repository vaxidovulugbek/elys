import { ListPagination, PageHeading } from "components";
import { useFetchList } from "hooks";
import { get } from "lodash";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContractTable } from "../components/ContractTable";

const Contracts = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);

	const contracts = useFetchList({
		url: "contract",
		urlSearchParams: {
			page,
			include: "document",
			filter: {
				apartment_id: new URLSearchParams(location.search).get("apartment_id"),
			},
		},
	});

	const onRowClick = (row) => {
		navigate(`/client/${get(row, "client_id")}`);
	};

	return (
		<>
			<PageHeading
				title="Contracts"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Contracts" },
				]}
			/>
			<ContractTable
				items={contracts.data}
				onRowClick={onRowClick}
				refetch={contracts.refetch}
			/>

			<ListPagination
				pageCount={get(contracts, "meta.pageCount")}
				onPageChange={(page) => {
					setPage(page + 1);
				}}
			/>
		</>
	);
};

export default Contracts;
