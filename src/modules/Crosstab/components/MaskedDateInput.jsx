import React, { useEffect } from "react";
import ReactInputMask from "react-input-mask";

export const MaskedDateInput = ({ label, form, field, placeholder }) => {
	const handleChange = (e) => {
		const { value } = e.target;
		const date = value.split(".");
		if (date[0] > 31) date[0] = 31;
		if (date[1] > 12) date[1] = 12;
		if (date[2] > 2038) date[2] = 2038;
		form.setFieldValue(field.name, date);
	};
	return (
		<div className="masked-date form-wrapper">
			<span className="form-label">{label}</span>
			<label className="form-control cursor_text">
				<ReactInputMask mask="99.99.9999" value={field.value} onChange={handleChange}>
					{(inputProps) => (
						<input
							{...inputProps}
							type="text"
							className="form-control__input"
							placeholder="__.__.____"
						/>
					)}
				</ReactInputMask>
			</label>
		</div>
	);
};
