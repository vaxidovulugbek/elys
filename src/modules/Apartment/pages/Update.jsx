import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { httpCLient } from "services";

import { Spinner } from "components";
import { ApartmentForm } from "../components/ApartmentForm";

const Update = () => {
	const navigate = useNavigate();
	const { apartmentID } = useParams();
	const { mutate, data, isLoading } = useMutation(fetchFormData);

	const onSuccess = () => {
		navigate(-1);
		toast.success("Apartment is updated!");
	};

	async function fetchFormData() {
		const res = await httpCLient.get(`apartment/${apartmentID}`);
		return res.data.data;
	}

	useEffect(() => {
		mutate();
	}, [apartmentID, mutate]);

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
