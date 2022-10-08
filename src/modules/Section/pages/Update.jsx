import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Spinner } from "components";
import { useFetchOne } from "hooks";
import { SectionForm } from "../components/SectionForm";
import { notifications } from "services";

const Update = () => {
	const { sectionID } = useParams();
	const navigate = useNavigate();

	const { data, refetch, isLoading } = useFetchOne({
		url: `section/${sectionID}`,
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "file,svg,background" },
	});

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Section is updated!");
	};

	const onClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		refetch();
	}, [sectionID, refetch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<SectionForm
				url={`section/${sectionID}`}
				method={"put"}
				formData={data}
				onSuccess={onSuccess}
				onClose={onClose}
				btnSubmitText="Save"
			/>
		</>
	);
};

export default Update;
