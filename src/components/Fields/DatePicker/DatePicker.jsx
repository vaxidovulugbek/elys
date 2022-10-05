import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import cn from "classnames";

import { time } from "services";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

export const DatePicker = ({ label, className, form, field }) => {
	return (
		<div className={cn(className, "custom-datepicker")}>
			<label className="form-label">{typeof label === "string" && label}</label>
			<ReactDatePicker selected={field.value} {...field} />
		</div>
	);
};
