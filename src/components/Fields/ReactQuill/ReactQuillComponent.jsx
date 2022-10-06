import React from "react";
import ReactQuill from "react-quill";

import "./ReactQuillComponent.scss";

export const ReactQuillComponent = ({ form, field }) => {
	console.log(field);
	return (
		<ReactQuill
			theme="snow"
			className="react-quill"
			value={field.value}
			onChange={field.onChange(field.name)}
		/>
	);
};
