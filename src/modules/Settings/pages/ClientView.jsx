import { useFetchOne } from "hooks";
import { get } from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import { ClientViewTable } from "../components/ClientViewTable";

const ClientView = () => {
	const { clientID } = useParams();

	const client = useFetchOne({ url: `/client/${clientID}` });

	const clientArray = [get(client, "data", {})];

	return (
		<>
			<ClientViewTable items={clientArray.length && clientArray} />
		</>
	);
};

export default ClientView;
