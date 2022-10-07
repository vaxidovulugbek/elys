import React from "react";
import { useNavigate } from "react-router-dom";

import { notifications } from "services";
import { FloorForm } from "../components/FloorForm";

const Create = () => {
	const navigate = useNavigate();

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Floor is created!");
	};
	return (
		<>
			<FloorForm url={"floor"} method={"post"} btnSubmitText={"Add"} onSuccess={onSuccess} />
		</>
	);
};

export default Create;
