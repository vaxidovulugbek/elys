import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { notifications } from "services";
import { useFetchOne } from "hooks";

import { Spinner } from "components";
import { PlanForm } from "../components/PlanForm";

const PlanUpdate = () => {
	const navigate = useNavigate();
	const { planID } = useParams();

	const { data, refetch, isLoading } = useFetchOne({
		url: `/plan/${planID}`,
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "files,fields,fields.plan_field" },
	});

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Plan is updated!");
	};

	useEffect(() => {
		refetch();
	}, [planID, refetch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<PlanForm method="put" url={`plan/${planID}`} formData={data} onSuccess={onSuccess} />
		</>
	);
};

export default PlanUpdate;
