import { PageHeading } from "components";
import { useFetchList } from "hooks";
import React from "react";
import { ContractTable } from "../components/ContractTable";

const Contracts = () => {
	const items = useFetchList({ url: "contract", urlSearchParams: { include: "document" } });
	return (
		<>
			<PageHeading
				title="Contracts"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Contracts" },
				]}
			/>
			<ContractTable items={items.data} />
		</>
	);
};

export default Contracts;
