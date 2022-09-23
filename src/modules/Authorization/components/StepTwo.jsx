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
					Company name
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="fax" component={Fields.Input} />
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="office-auth-register-website" className="label-control">
					Website
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="web_site" component={Fields.Input} />
				</div>
			</div>
		</>
	);
};

export default StepTwo;
