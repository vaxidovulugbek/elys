/* eslint-disable no-extend-native */
import { Fields } from "components";
import Containers from "containers";
import { FastField, Field } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

const ClientDetails = ({ paymentDetails }) => {
	const { t } = useTranslation();
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
						value: "",
					},
					{
						name: "mail",
						value: "",
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
							/>
							<Field
								component={Fields.DatePicker}
								type="text"
								name="birthdate"
								label={t("birthdate")}
							/>
							<FastField
								component={Fields.Input}
								type="text"
								name="phone"
								label={t("phone")}
							/>
							<FastField
								component={Fields.Input}
								type="text"
								name="mail"
								label={t("email")}
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

export default ClientDetails;
