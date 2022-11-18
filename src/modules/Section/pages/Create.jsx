import React from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "services";
import { SectionForm } from "../components/SectionForm";

const Create = () => {
	const navigate = useNavigate();

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Section is created!");
	};

	const onClose = () => {
		navigate(-1);
	};
	return (
		<>
			<SectionForm
				url={"section"}
				method={"post"}
				onSuccess={onSuccess}
				onClose={onClose}
				btnSubmitText="Add"
			/>
		</>
	);
};

export default Create;
