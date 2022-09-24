import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FastField } from "formik";
import { get } from "lodash";

import { Fields, Button } from "components";
import Containers from "containers";

import { notifications, storage } from "services";
import { auth } from "store/actions";

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
						<h4 className="title">
							Flatris helps you to sell apartments quickly and easily.
						</h4>
					</div>
				</div>
				<div className="col-lg-7 reg-content">
					<div className="reg-content-header">
						<Link to="/register">Registration</Link>
					</div>
					<div className="reg-content-main">
						<div className="reg-form">
							<h4>Log in</h4>
							<Containers.Form
								url="/user/login"
								method="post"
								onSuccess={(user) => {
									console.log(user, "user");
									storage.set("token", get(user.data, "token"));
									dispatch(auth.success(user.data));
									navigate("/");
									notifications.success("Успех");
								}}
								onError={(error, formHelpers) => {
									notifications.error("Ошибка");
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
								{(props) => {
									return (
										<>
											<div className="form-group">
												<label htmlFor="username" className="label-control">
													Login
													<span className="red"> * </span>
												</label>
												<div>
													<FastField
														name="username"
														type="text"
														component={Fields.Input}
													/>

													<p className="help-block">
														<small>
															Enter the email you used while
															registering.
														</small>
													</p>
												</div>
											</div>
											<div className="form-group">
												<label htmlFor="password" className="label-control">
													Password
													<span className="red"> * </span>
												</label>
												<div>
													<FastField
														name="password"
														component={Fields.Input}
														type="password"
													/>

													<p className="help-block">
														<small>
															If you do not remember your password -
															just leave this field blank and you will
															receive a new one, along with an
															activation link.
														</small>
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
