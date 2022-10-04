import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchOne } from "hooks";
import { notifications } from "services";

import { Spinner } from "components";
import { ApartmentForm } from "../components/ApartmentForm";

const Update = () => {
	const navigate = useNavigate();
	const { apartmentID } = useParams();
	const { data, refetch, isLoading } = useFetchOne({
		url: `apartment/${apartmentID}`,
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "plan,files" },
	});

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Apartment is updated!");
	};

	useEffect(() => {
		refetch();
	}, [apartmentID, refetch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<ApartmentForm
				method="put"
				url={`apartment/${apartmentID}`}
				formData={data}
				onSuccess={onSuccess}
			/>
		</>
	);
};

export default Update;
