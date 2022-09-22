import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApartmentForm } from "../components/ApartmentForm";

const Create = () => {
	const navigate = useNavigate();

	const onSuccess = () => {
		navigate(-1);
		toast.success("Apartment is created!");
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
