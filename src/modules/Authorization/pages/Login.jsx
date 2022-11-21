import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FastField } from "formik";
import { get } from "lodash";

import { notifications, storage } from "services";
import { auth } from "store/actions";

import { Fields, Button } from "components";
import Containers from "containers";

import logo from "assets/images/logo-binvest.svg";
import logoRteco from "assets/images/erteko.svg";
import "./../styles/Login.css";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="login">
			<div className="row row-reg">
				<div className="col-lg-6 reg-bg">
					<div className="text">
						{/* <div className="logo">
							<img
								width={"300px"}
								style={{ top: "-150px", position: "absolute" }}
								src={logo}
								alt="logo"
							/>
						</div> */}
						{/* <h4 className="title"></h4> */}
					</div>
				</div>
				<div className="col-lg-6 reg-content">
					<div className="reg-content-header">
						<Link to="/register">Registration</Link>
					</div>
					<div className="reg-content-main">
						<div className="reg-form">
							<div className="logo">
								<img width={"300px"} className="mb-3" src={logo} alt="logo" />
							</div>
							<h4>Log in</h4>
							<Containers.Form
								url="/user/login"
								method="post"
								onSuccess={(user) => {
									storage.set("token", get(user.data, "token"));
									dispatch(auth.success(user.data));
									if (user.data.status === 10) {
										navigate("/");
									} else {
										navigate("/succes-login");
									}
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

							<div className="logo">
								<img
									width={"300px"}
									className="mb-3 mt-4"
									src={logoRteco}
									alt="logo"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
