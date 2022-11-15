import { PageHeading } from "components";
import { useFetchList } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClientsTable } from "../components/ClientsTable";

const Clients = () => {
	const navigate = useNavigate();

	const clients = useFetchList({ url: "/client" });

	const onRowClick = (row) => {
		navigate(`/client/${row.id}`);
	};

	return (
		<>
			<PageHeading
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "Clients" },
				]}
			/>

			<ClientsTable items={clients?.data} onRowClick={onRowClick} />
		</>
	);
};

export default Clients;
