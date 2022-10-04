import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import cn from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

export const DatePicker = ({ label, className }) => {
	const [startDate, setStartDate] = useState(new Date());
	return (
		<div className={cn(className, "custom-datepicker")}>
			<label className="form-label">{typeof label === "string" && label}</label>
			<ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
		</div>
	);
};
