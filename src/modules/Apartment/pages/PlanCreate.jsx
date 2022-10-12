import React from "react";
import { useNavigate } from "react-router-dom";

import { notifications } from "services";

import { PlanForm } from "../components/PlanForm";

const PlanCreate = () => {
	const navigate = useNavigate();

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Plan is created!");
	};

	return (
		<>
			<PlanForm method="post" url={"plan"} onSuccess={onSuccess} btnSubmitText="Add" />
		</>
	);
};

export default PlanCreate;
