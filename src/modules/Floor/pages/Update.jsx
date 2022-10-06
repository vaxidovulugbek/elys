import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchOne } from "hooks";
import { notifications } from "services";
import { Spinner } from "components";
import { FloorForm } from "../components/FloorForm";

const Update = () => {
	const { floorID } = useParams();
	const navigate = useNavigate();

	const { data, refetch, isLoading } = useFetchOne({
		url: `floor/${floorID}`,
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "files" },
	});

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Apartment is updated!");
	};

	useEffect(() => {
		refetch();
	}, [floorID, refetch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<FloorForm url={"floor"} method={"put"} formData={data} onSuccess={onSuccess} />
		</>
	);
};

export default Update;
