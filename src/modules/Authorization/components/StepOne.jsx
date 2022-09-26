import React from "react";
import { FastField, Field } from "formik";

import { Fields } from "components";

import "../styles/Login.css";
import "../styles/Register.css";

const StepOne = ({ isPassword, setIsPassword }) => {
	return (
		<>
			<div className="form-group">
				<label htmlFor="username" className="label-control">
					Name
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="username" component={Fields.Input} type="text" />
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="email" className="label-control">
					Email(gmail only)
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="email" component={Fields.Input} type="email" />
					<p className="help-block">
						<small>
							You will receive an activation link on the indicated email address.
						</small>
					</p>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="phone" className="label-control">
					Mobile phone
					<span className="red"> * </span>
				</label>
				<div>
					<FastField name="phone" component={Fields.Input} type="tel" />
					<p className="help-block">
						<small> Just the number of your mobile phone.</small>
					</p>
				</div>
			</div>
			<div className="form-group">
				<div htmlFor="password" className="label-pass">
					<label htmlFor="password" className="label-control">
						Password
					</label>
					<div className="eye" onClick={() => setIsPassword(!isPassword)}>
						<img src={require("assets/images/eye.png")} alt="eye" />
					</div>
				</div>
				<div>
					<Field
						name="password"
						component={Fields.Input}
						type={isPassword ? "password" : "text"}
					/>
					<p className="help-block">
						<small>
							If you do not remember your password - just leave this field blank and
							you will receive a new one, along with an activation link.
						</small>
					</p>
				</div>
			</div>
		</>
	);
};

export default StepOne;
