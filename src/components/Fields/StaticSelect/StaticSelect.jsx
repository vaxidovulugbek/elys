import { ControlLabel } from "components/common";
import React from "react";
import ReactSelect from "react-select";
import "./StaticSelect";

export const StaticSelect = ({ options, placeholder, value, onChange = () => {}, name, label }) => {
	return (
		<div className="form-select">
			<ControlLabel label={label} />
			<ReactSelect
				name={name}
				component={ReactSelect}
				options={options}
				placeholder={placeholder}
				classNamePrefix="select"
				value={value}
				onChange={(option) => {
					onChange(option);
				}}
			/>
		</div>
	);
};
