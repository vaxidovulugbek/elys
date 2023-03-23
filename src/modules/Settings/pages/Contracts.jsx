import { ListPagination, PageHeading } from "components";
import { useDelete, useFetchList } from "hooks";
import { get } from "lodash";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContractTable } from "../components/ContractTable";
import { notifications } from "services";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";

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

	const contractDelete = useDelete({
		url: "/contract",
		queryOptions: {
			onSuccess: () => {
				contracts.refetch();
				notifications.success("Successfully deleted");
			},
			onError: () => {
				notifications.error("Something went wrong");
			},
		},
	});

	const onDelete = (id) => {
		deletePermission({
			title: "Delete a Contract?",
			icon: "error",
			text: "All data concerning this contract will be deleted.",
			receivePermission: () => contractDelete.mutate(id),
		});
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
				onDelete={(_, row) => onDelete(get(row, "id"))}
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
