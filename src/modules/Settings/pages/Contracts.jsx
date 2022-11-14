import { ListPagination, PageHeading } from "components";
import { useFetchList } from "hooks";
import { get } from "lodash";
import React from "react";
import { useState } from "react";
import { ContractTable } from "../components/ContractTable";

const Contracts = () => {
	const [page, setPage] = useState(1);
	const contracts = useFetchList({
		url: "contract",
		urlSearchParams: { page, include: "document" },
	});

	console.log(contracts.data, "contracts");
	return (
		<>
			<PageHeading
				title="Contracts"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Contracts" },
				]}
			/>
			<ContractTable items={contracts.data} />

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
