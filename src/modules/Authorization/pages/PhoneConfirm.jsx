import React, { useState } from "react";
import cn from "classnames";

import { Button } from "components";
import Containers from "containers";
// import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";

import "./../styles/Register.css";
import "../styles/Login.css";
import logo from "assets/images/logo.svg";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { notifications, storage } from "services";
import { auth } from "store/actions";
import { Link, useNavigate } from "react-router-dom/dist";

const PhoneConfirm = () => {
	const [page, setPage] = useState(1);
	const [isPassword, setIsPassword] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const steps = [<StepTwo {...{ isPassword, setIsPassword }} />, <StepThree />];

	const item1 = cn("item", { complete: page > 2, active: page < 3 });
	const item2 = cn("item", { complete: page > 3, active: page === 3 });

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
					<div className="reg-content-header d-flex m-auto">
						<div className="step-list">
							<div className="width">
								<div style={{ width: page > 1 ? "100%" : 0 }}></div>
							</div>
							<div className={item1} onClick={() => navigate("/register")}>
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
								url="user/sign-up-confirm"
								method="post"
								fields={[
									{
										name: "phone",
										validationType: "number",
										validations: [{ type: "required" }],
									},
									{
										name: "code",
										validationType: "number",
										validations: [{ type: "required" }],
									},
								]}
								onSuccess={(user) => {
									notifications.success("Успех");
									if (user.data.status === 9) {
										// storage.set("token", get(user.data, "token"));
										dispatch(auth.success(user.data));
										navigate("/succes-login");
									} else {
										storage.set("token", get(user.data, "token"));
										dispatch(auth.success(user.data));
										navigate("/login");
									}
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
												<div>
													<Button
														type="submit"
														className="form-btn register"
														innerText="Register"
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

export default PhoneConfirm;
