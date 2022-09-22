import React, { useState } from "react";
import { Link } from "react-router-dom";

import cn from "classnames";

import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import { Button } from "components";
import Containers from "containers";

import "./../styles/Register.css";
import "../styles/Login.css";
import logo from "assets/images/logo.svg";

const Register = () => {
	const [page, setPage] = useState(1);
	const [isPassword, setIsPassword] = useState(true);

	const handlePage = ({ errors }) => {
		if (!errors["username"] && !errors["email"] && !errors["phone"] && !errors["password"]) {
			setPage(2);
		}
	};

	const steps = [<StepOne {...{ isPassword, setIsPassword }} />, <StepTwo />];

	const item1 = cn("item", { complete: page > 1, active: page < 2 });
	const item2 = cn("item", { complete: page > 2, active: page === 2 });

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
					<div className="reg-content-header">
						<div className="step-list">
							<div className="width">
								<div style={{ width: page > 1 ? "100%" : 0 }}></div>
							</div>
							<div className={item1} onClick={() => setPage(1)}>
								<div className="cl"></div>
							</div>
							<div className={item2}>
								<div className="cl"></div>
							</div>
						</div>
						<div className="r">
							<span>Already have an account?</span>
							<Link to="/login">Login</Link>
						</div>
					</div>
					<div className="reg-content-main">
						<div className="reg-form">
							{page === 1 ? (
								<h4 className="form-title">Create your account</h4>
							) : page === 2 ? (
								<div className="form-title-step2">
									<p>Last step of registration</p>
									<h4 className="form-title">
										Tell us a little about your company
									</h4>
								</div>
							) : (
								<StepThree />
							)}

							<Containers.Form
								url="/"
								method="post"
								fields={[
									{
										name: "username",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "email",
										validationType: "string",
										validations: [{ type: "required" }, { type: "email" }],
									},
									{
										name: "phone",
										validationType: "number",
										validations: [{ type: "required" }],
									},
									{
										name: "password",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "fax",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "web_site",
										validationType: "string",
										validations: [{ type: "required" }],
									},
								]}
								onSuccess={(_, { resetForm }) => {
									setPage(3);
									resetForm();
								}}
							>
								{(props) => {
									return (
										<>
											{steps[page - 1]}

											<div className="form-group text-center">
												<div style={{ display: page === 3 && "none" }}>
													<Button
														onClick={() => handlePage(props)}
														type={page === 1 ? "button" : "submit"}
														className="form-btn register"
														innerText={
															page === 1
																? "Start for free"
																: "Create an account"
														}
													/>
												</div>
											</div>
										</>
									);
								}}
							</Containers.Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
