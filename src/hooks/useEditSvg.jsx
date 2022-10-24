import { useState } from "react";

import { get } from "lodash";
import { functions, notifications } from "services";

export const useEditSvg = (data) => {
	const [files, setFiles] = useState({ background: null, svg: null, background_id: null });
	const [vector, setVector] = useState(null);

	const onEdit = async (f) => {
		if (f.svg || f.background) {
			const svg = await functions.generateVector({
				background: f.background || get(data, "background.src"),
				svg: f.svg || get(data, "vector"),
			});
			setVector(svg);
		} else if (get(data, "vector")) {
			setVector(get(data, "vector"));
		} else {
			notifications.error("Damini ol!");
		}
	};

	return { setFiles, onEdit, setVector, vector, files };
};
