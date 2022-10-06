import React from "react";
import Input from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import "./PhoneInput.scss";

export const PhoneInput = ({ form, field, label }) => {
	return (
		<div className="custom-phone-input">
			<label className="form-label">{typeof label === "string" && label}</label>
			<Input
				country={"uz"}
				onlyCountries={["uz"]}
				disableDropdown
				enableAreaCodes={false}
				placeholder="+998 99 876 54 32"
				{...field}
			/>
		</div>
	);
};
