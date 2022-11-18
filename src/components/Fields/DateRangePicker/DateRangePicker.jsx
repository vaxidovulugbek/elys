import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import cn from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

export const DateRangePicker = ({ label, className, setTo, setFrom }) => {
	const [startDate, setStartDate] = useState(new Date("2022/11/16"));
	const [endDate, setEndDate] = useState(new Date("2022/11/16"));

	return (
		<div className={cn(className, "custom-datepicker")}>
			<label className="form-label">{typeof label === "string" && label}</label>
			<div className="d-flex justify-content-around ">
				<div className="col-6 d-flex g-1">
					<ReactDatePicker
						selected={startDate}
						onChange={(date) => {
							setFrom(date);
							setStartDate(date);
						}}
						selectsStart
						startDate={startDate}
						endDate={endDate}
					/>
				</div>
				<div className="col-6 d-flex g-1">
					<ReactDatePicker
						selected={endDate}
						onChange={(date) => {
							setTo(date);
							setEndDate(date);
						}}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
					/>
				</div>
			</div>
		</div>
	);
};
