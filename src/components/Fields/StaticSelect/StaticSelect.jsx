import React from "react";
import ReactSelect from "react-select";

export const StaticSelect = ({ options, placeholder, value, onChange = () => {}, name }) => {
	return (
		<div>
			<ReactSelect
				name={name}
				component={ReactSelect}
				options={options}
				placeholder={placeholder}
				classNamePrefix="select"
				value={value}
				onChange={(option) => {
					onChange(option.value);
				}}
			/>
		</div>
	);
};
