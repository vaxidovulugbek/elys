/* eslint-disable no-extend-native */
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FastField, Field } from "formik";
import { get, isArray } from "lodash";

import { useFetchList } from "hooks";
import { constants, notifications, time } from "services";

import Containers from "containers";
import { Fields, Table } from "components";
import { MaskedDateInput } from "../components";

import { crosstab_functions } from "../functions";
import { functions } from "services";

const languages = [
	{ value: constants.UZBEK, label: "Uzbek" },
	{ value: constants.RUSSIAN, label: "Russian" },
];

const Contract = ({ paymentDetails, setActiveApartment, activeApartment, setCurrentTab }) => {
	const { t } = useTranslation();
	const [apartment, setApartment] = useState({});
	const [items, setItems] = useState();
	const [tariff, setTariff] = useState(null);
	const queryClient = useQueryClient();

	const { fixPassportInput, handleContractSuccess, calculateCredit, handleContractError } =
		crosstab_functions;

	const price = get(apartment, "price", 0);

	const { data } = useFetchList({
		url: "/tariff",
		urlSearchParams: {
			filter: {
				type: get(activeApartment, "type"),
			},
		},
	});

	const calculate = calculateCredit({ price, setItems });

	const handleError = handleContractError(notifications);

	const handleSuccess = handleContractSuccess({
		notifications,
		setActiveApartment,
		setCurrentTab,
		queryClient,
	});

	useEffect(() => {
		if (activeApartment) setApartment(activeApartment);
	}, [activeApartment]);

	useEffect(() => {
		isArray(data) && setTariff(data[0]);
	}, [data]);

	return (
		<div className="client-details">
			<div className="tariff">
				<Containers.List
					url="/tariff"
					urlSearchParams={{
						filter: {
							type: get(activeApartment, "type"),
						},
					}}
				>
					{({ data }) => (
						<>
							{isArray(data) &&
								data.map((item, index) => {
									return (
										<div
											className="tariff__card tariff__card--active"
											onClick={() => setTariff(item)}
											key={index}
										>
											<p className="payment">
												{t("Month")}:{" "}
												<span>{get(item, "month_count")}</span>
											</p>
											<p className="monthly">
												{t("Initial fee")}:{" "}
												<span>{get(item, "payment")}</span>
											</p>
											<p className="month-count">
												{t("Discount")}:{" "}
												<span>{get(item, "discount")}</span>
											</p>
										</div>
									);
								})}
							<div
								className="tariff__card tariff__card--active"
								onClick={() => setTariff(null)}
							>
								<p className="payment">
									{t("Month")}: <span>0</span>
								</p>
								<p className="monthly">
									{t("Initial fee")}: <span>100%</span>
								</p>
								<p className="month-count">
									{t("Discount")}: <span>0</span>
								</p>
							</div>
						</>
					)}
				</Containers.List>
			</div>
			<Containers.Form
				method="post"
				url="/contract"
				key={2}
				onError={handleError}
				onSuccess={handleSuccess}
				fields={[
					{
						name: "initial_payment",
						value: get(tariff, "payment"),
						onSubmitValue: (value) => (value?.length > 0 ? Number(value) : 100),
					},
					{
						name: "month_count",
						value: get(tariff, "month_count"),
						onSubmitValue: (value) => Number(value) || 0,
					},
					{
						name: "discount",
						value: Number(get(tariff, "discount")) || 0,
						onSubmitValue: (value) => Number(value) || 0,
					},
					{
						name: "first_name",
						value: "",
					},
					{
						name: "price",
						value: get(apartment, "price"),
						validationType: "number",
					},
					{
						name: "apartment_id",
						value: get(apartment, "id"),
					},
					{
						name: "last_name",
						value: "",
					},
					{
						name: "middle_name",
						value: "",
					},
					{
						name: "address",
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
						name: "contract_number",
						value: "",
					},
					{
						name: "birthdate",
						value: "",
						validationType: "number",
						onSubmitValue: (value) =>
							Math.floor(time.toTimestamp([value[2], value[1], value[0]])),
					},
					{
						name: "monthly_payment_date",
						value: "",
						validationType: "number",
						onSubmitValue: (value) =>
							Math.floor(time.toTimestamp([value[2], value[1], value[0]])),
					},
					{
						name: "passport_issued_date",
						value: "",
						validationType: "number",
						onSubmitValue: (value) =>
							Math.floor(time.toTimestamp([value[2], value[1], value[0]])),
					},
					{
						name: "date",
						value: "",
						validationType: "number",
						onSubmitValue: (value) =>
							Math.floor(time.toTimestamp([value[2], value[1], value[0]])),
					},
					{
						name: "mail",
						value: "",
						validations: [{ type: "email" }],
					},
					{
						name: "language_id",
						value: 1,
						validationType: "number",
					},
				]}
			>
				{({ values, errors }) => {
					return (
						<>
							{tariff && (
								<div className="calculator">
									<div className="calculator__numbers">
										<FastField
											component={Fields.Input}
											type="text"
											name="initial_payment"
											label={"Initial fee"}
											onlyNumber={true}
										/>
										<FastField
											component={Fields.Input}
											type="text"
											name="month_count"
											label={"Month"}
											onlyNumber={true}
										/>
										<FastField
											component={Fields.Input}
											type="text"
											name="discount"
											label={"Discount"}
											onlyNumber={true}
										/>
										<button
											type="button"
											className="printToDoc"
											onClick={() => calculate(values)}
										>
											{t("Calculate")}
										</button>
									</div>
									{items && (
										<Table
											className="payment-type__table"
											columns={[
												{
													title: t("Month"),
													dataKey: "month",
													render: (value) => value,
												},
												{
													title: t("Initial fee"),
													dataKey: "fee",
													render: (value) => value,
												},
											]}
											items={items}
										/>
									)}
								</div>
							)}
							<div className="user-details">
								<FastField
									component={Fields.InputMask}
									type="text"
									name="price"
									placeholder="Apartment price"
									label={"Apartment price"}
									onlyNumber={true}
									decimalSeparator=" "
									thousandSeparator=" "
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="first_name"
									label={"First name"}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="last_name"
									label={"Last name"}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="middle_name"
									label={"Middle name"}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="address"
									label={"Address"}
								/>
								<Field
									component={MaskedDateInput}
									// type="text"
									name="birthdate"
									label={"Birthdate"}
								/>
								<FastField
									component={Fields.PhoneInput}
									type="text"
									name="phone"
									label={"Phone number"}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="mail"
									label={"Email"}
									placeholder="example@gmail.com"
								/>
								<div className="lang-select">
									<FastField
										component={Fields.Select}
										name="language_id"
										label={"Document language"}
										options={languages}
										defaultValue={languages[0].value}
										placeholder="Language"
									/>
								</div>
								<Field
									component={MaskedDateInput}
									name="monthly_payment_date"
									label={"Monthly payment date"}
								/>
								<Field
									component={MaskedDateInput}
									name="date"
									label={"Contract date"}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="passport"
									label={"Passport seria and number"}
									onInput={fixPassportInput}
									placeholder="AB1234567"
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="passport_issued_by"
									label={"Passport issued by"}
								/>
								<Field
									component={MaskedDateInput}
									name="passport_issued_date"
									label={"Passport issued date"}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="contract_number"
									label={"Contract number"}
								/>

								<button type="submit" className="printToDoc submit">
									{t("Submit")}
								</button>
							</div>
						</>
					);
				}}
			</Containers.Form>
		</div>
	);
};

export default Contract;
