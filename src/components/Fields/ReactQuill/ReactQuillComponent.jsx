import React from "react";
import ReactQuill from "react-quill";

import { ControlError, ControlLabel } from "components/common";

import "./ReactQuillComponent.scss";

export const ReactQuillComponent = ({ outerClass = "", form, field, label, ...props }) => {
	return (
		<div className={outerClass}>
			<ControlLabel label={label} />
			<ReactQuill
				theme="snow"
				className="react-quill"
				{...props}
				value={field.value}
				onChange={(value) => form.setFieldValue(field.name, value)}
				onBlur={() => form.setFieldTouched(field.name, true)}
			/>
			<ControlError field={field} form={form} />
		</div>
	);
};
