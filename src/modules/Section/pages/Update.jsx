import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Spinner } from "components";
import { useEditSvg, useFetchOne } from "hooks";
import { SectionForm } from "../components/SectionForm";
import { functions, notifications } from "services";

const Update = () => {
	const { sectionID } = useParams();
	const [svgID, setSvgID] = useState();
	const navigate = useNavigate();

	const { data, refetch, isLoading } = useFetchOne({
		url: `section/${sectionID}`,
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "file,svg,background,vector" },
	});

	const { setFiles, setVector, vector, files } = useEditSvg(data);

	const onEdit = functions.onEditCreator({ setVector, data, files });

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
				hasEdit
				onEdit={onEdit}
				vector={vector}
				setVector={setVector}
				svgID={svgID}
				setSvgID={setSvgID}
				setFiles={setFiles}
				files={files}
			/>
		</>
	);
};

export default Update;
