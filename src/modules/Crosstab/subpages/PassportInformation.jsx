/* eslint-disable no-extend-native */
import { Fields } from "components";
import Containers from "containers";
import { FastField, Field } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

const PassportInformation = ({ paymentDetails }) => {
	const { t } = useTranslation();
	const fixPassportInput = (e) => {
		const letters = /[A-Z]/;
		const numbers = /[0-9]/;
		const charArray = e.target.value.toUpperCase().split("");
		const correctCharArray = charArray.filter((char, i) => {
			if (i < 2) {
				return char.match(letters);
			} else if (i >= 2) {
				return char.match(numbers);
			} else return false;
		});
		e.target.value = correctCharArray.join("");
	};
	return (
		<div className="client-details">
			<Containers.Form
				fields={[
					{
						name: "fname",
						value: "",
					},
					{
						name: "lname",
						value: "",
					},
					{
						name: "mname",
						value: "",
					},
					{
						name: "passport",
						value: "",
					},
					{
						name: "phone",
						value: "",
					},
					{
						name: "birthdate",
						value: Date.now(),
					},
					{
						name: "mail",
						value: "",
						validations: [{ type: "email" }],
					},
				]}
			>
				{() => {
					return (
						<>
							<FastField
								component={Fields.Input}
								type="text"
								name="fname"
								label={t("first name")}
							/>
							<FastField
								component={Fields.Input}
								type="text"
								name="lname"
								label={t("last name")}
							/>
							<FastField
								component={Fields.Input}
								type="text"
								name="mname"
								label={t("middle name")}
							/>
							<FastField
								component={Fields.Input}
								type="text"
								name="passport"
								label={t("passport seria and number")}
								onInput={fixPassportInput}
								placeholder="AB1234567"
							/>
							<Field
								component={Fields.DatePicker}
								// type="text"
								name="birthdate"
								label={t("birthdate")}
							/>
							<FastField
								component={Fields.PhoneInput}
								type="text"
								name="phone"
								label={t("phone")}
							/>
							<FastField
								component={Fields.Input}
								type="text"
								name="mail"
								label={t("email")}
								placeholder="example@gmail.com"
							/>
							<button type="submit" className="printToDoc">
								Submit
							</button>
						</>
					);
				}}
			</Containers.Form>
		</div>
	);
};

export default PassportInformation;
