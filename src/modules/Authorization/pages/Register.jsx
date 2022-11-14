import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { Button } from "components";
import Containers from "containers";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";

import "./../styles/Register.css";
import "../styles/Login.css";
import logo from "assets/images/logo.svg";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { notifications, storage } from "services";
import { auth } from "store/actions";

const Register = () => {
	const [page, setPage] = useState(1);
	const [isPassword, setIsPassword] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePage = (props) => {
		props.submitForm();
		console.log(props);
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
							<h4 className="form-title">Create your account</h4>

							<Containers.Form
								url={"user/sign-up"}
								method="post"
								fields={[
									{
										name: "email",
										validationType: "string",
										validations: [{ type: "required" }, { type: "email" }],
									},
									{
										name: "password",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "first_name",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "last_name",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "username",
										validationType: "string",
										validations: [{ type: "required" }],
									},
									{
										name: "phone",
										validationType: "number",
										validations: [{ type: "required" }],
									},
								]}
								onSuccess={(user) => {
									console.log(user);
									storage.set("token", get(user.data, "token"));
									dispatch(auth.success(user.data));
									notifications.success("Успех");
									navigate("/phone-confirm");
								}}
								onError={(error, formHelpers) => {
									notifications.error("Ошибка");
									formHelpers.setErrors(get(error, "response.data.errors"));
								}}
							>
								{(props) => {
									return (
										<>
											{steps[page - 1]}

											<div className="form-group text-center">
												<div style={{ display: page === 3 && "none" }}>
													<Button
														onClick={
															page === 1
																? () => handlePage(props)
																: null
														}
														type={page === 1 ? "button" : "submit"}
														className="form-btn register"
														innerText={"Start for free"}
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
