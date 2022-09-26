import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FastField } from "formik";
import { get } from "lodash";

import { storage } from "services";
import { auth } from "store/actions";

import { Fields, Button, Typography } from "components";
import Containers from "containers";

import logo from "assets/images/logo.svg";
import "./../styles/Login.css";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="login">
			<div className="row row-reg">
				<div className="col-lg-5 reg-bg">
					<div className="text">
						<div className="logo">
							<img src={logo} alt="logo" />
						</div>
						<Typography
							className="title"
							text="Flatris helps you to sell apartments quickly and easily."
						/>
					</div>
				</div>
				<div className="col-lg-7 reg-content">
					<div className="reg-content-header">
						<Link to="/register">Registration</Link>
					</div>
					<div className="reg-content-main">
						<div className="reg-form">
							<Typography text="Log in" />
							<Containers.Form
								url="/user/login"
								method="post"
								onSuccess={(user) => {
									storage.set("token", get(user, "token"));
									dispatch(auth.success(user));
									navigate("/");
									toast.success("Успех");
								}}
								onError={(error, formHelpers) => {
									toast.error("Ошибка");
									formHelpers.setErrors(get(error, "response.data.errors"));
								}}
								fields={[
									{
										name: "username",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "password",
										validationType: "string",
										validations: [{ type: "required" }],
									},
								]}
							>
								{(formik) => {
									return (
										<>
											<div className="form-group">
												<Typography
													text="Login"
													append={<span className="red"> * </span>}
													className="label-control"
													htmlFor="username"
												/>
												<div>
													<FastField
														name="username"
														type="text"
														component={Fields.Input}
													/>

													<p className="help-block">
														<Typography
															Type="small"
															text="Enter the email you used while
															registering."
														/>
													</p>
												</div>
											</div>
											<div className="form-group">
												<Typography
													text="Password"
													append={<span className="red"> * </span>}
													className="label-control"
													htmlFor="password"
												/>
												<div>
													<FastField
														name="password"
														component={Fields.Input}
														type="password"
													/>

													<p className="help-block">
														<Typography
															Type="small"
															text="If you do not remember your password -
															just leave this field blank and you will
															receive a new one, along with an
															activation link."
														/>
													</p>
												</div>
											</div>
											<div className="form-group">
												<Button
													type="submit"
													className="form-btn"
													innerText="LOG IN"
												/>
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

export default Login;
