import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEditSvg, useFetchOne } from "hooks";
import { notifications } from "services";
import { Spinner } from "components";
import { FloorForm } from "../components/FloorForm";

const Update = () => {
	const { floorID } = useParams();
	const navigate = useNavigate();

	const [svgID, setSvgID] = useState();

	const { data, refetch, isLoading } = useFetchOne({
		url: `floor/${floorID}`,
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "file,svg,background,vector" },
	});

	const { onEdit, setFiles, setVector, vector, files } = useEditSvg(data);

	const onSuccess = () => {
		navigate(-1);
		notifications.success("Apartment is updated!");
	};

	useEffect(() => {
		refetch();
	}, [floorID, refetch]);

	if (isLoading) return <Spinner />;
	return (
		<>
			<FloorForm
				url={`floor/${floorID}`}
				method={"put"}
				formData={data}
				onSuccess={onSuccess}
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
