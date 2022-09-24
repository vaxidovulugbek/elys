import React from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "services";

import { ApartmentForm } from "../components/ApartmentForm";

const Create = () => {
	const navigate = useNavigate();

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Apartment is created!");
	};

	return (
		<>
			<ApartmentForm
				method="post"
				url={"apartment"}
				onSuccess={onSuccess}
				btnSubmitText="Add"
			/>
		</>
	);
};

export default Create;
