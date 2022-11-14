import React from "react";
import { FastField } from "formik";

import { Fields } from "components";

import "../styles/Login.css";
import "../styles/Register.css";

const StepTwo = ({ page }) => {
	return (
		<>
			<div className="form-group">
				<label htmlFor="office-register-form-fax" className="label-control">
					Confirmation number
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="phone" component={Fields.Input} />
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="office-register-form-fax" className="label-control">
					Confirmation number
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="code" component={Fields.Input} />
				</div>
			</div>
		</>
	);
};

export default StepTwo;
