import React, { useState } from "react";

import StepThree from "../components/StepThree";

import "./../styles/Register.css";
import "../styles/Login.css";
import logo from "assets/images/logo.svg";

const SuccesLogin = () => {
	return (
		<div className="login">
			<div className="row row-reg">
				<div className="col-lg-5 reg-bg">
					<div className="text">
						<div className="logo">
							<img src={logo} alt="logo" />
						</div>

						<h4 className="title">
							Flatris helps you to sell apartments quickly and easily.
						</h4>
					</div>
				</div>
				<div className="col-lg-7 reg-content">
					<div className="reg-content-main">
						<div className="reg-form">
							<h4 className="form-title">Create your account</h4>
							<StepThree />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccesLogin;
