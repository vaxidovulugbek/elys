import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchOne } from "hooks";
import { notifications } from "services";

import { Spinner } from "components";
import { ApartmentForm } from "../components/ApartmentForm";

const Update = () => {
	const navigate = useNavigate();
	const { apartmentID } = useParams();
	const query = useFetchOne({
		url: `apartment/${apartmentID}`,
		queryOptions: {
			enabled: false,
		},
	});

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Apartment is updated!");
	};

	useEffect(() => {
		query.refetch();
	}, [apartmentID, query]);

	if (query.isLoading) return <Spinner />;

	return (
		<>
			<ApartmentForm
				method="put"
				url={`apartment/${apartmentID}`}
				formData={query.data}
				onSuccess={onSuccess}
			/>
		</>
	);
};

export default Update;
