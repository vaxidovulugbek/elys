import { useState } from "react";

export const useEditSvg = () => {
	const [files, setFiles] = useState({ background: null, svg: null, background_id: null });
	const [vector, setVector] = useState(null);

	return { setFiles, setVector, vector, files };
};
