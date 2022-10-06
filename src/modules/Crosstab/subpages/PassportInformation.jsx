/* eslint-disable no-extend-native */
import { Fields, Table } from "components";
import Containers from "containers";
import { FastField, Field } from "formik";
import { useFetchList } from "hooks";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { time } from "services";

const PassportInformation = ({ paymentDetails, activeApartment }) => {
	const { t } = useTranslation();
	const [apartment, setApartment] = useState({});
	const [items, setItems] = useState();
	const [month, setMonth] = useState(12);
	const [tariff, setTariff] = useState(null);

	const price = get(apartment, "price", 0);

	const { data } = useFetchList({
		url: "tariff",
		urlSearchParams: {
			filter: {
				type: get(apartment, "type"),
			},
		},
	});

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

	const calculate = () => {
		const newItems = Array(month || 1)
			.fill(1)
			.map((_, index) => ({ month: index + 1, fee: (price / month).toFixed(2) }));
		setItems(newItems);
	};

	useEffect(() => {
		if (activeApartment) setApartment(activeApartment);
	}, [activeApartment]);

	useEffect(() => {
		Array.isArray(data) && setTariff(data[0]);
	}, [data]);

	return (
		<div className="client-details">
			<div className="tariff">
				<Containers.List url="tariff">
					{({ data }) => (
						<>
							{Array.isArray(data) &&
								data.map((item, index) => {
									return (
										<div
											className="tariff__card tariff__card--active"
											onClick={() => setTariff(item)}
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
												{t("discount")}:{" "}
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
									{t("discount")}: <span>0</span>
								</p>
							</div>
						</>
					)}
				</Containers.List>
			</div>
			<Containers.Form
				method="post"
				url="contract"
				key={2}
				fields={[
					{
						name: "initial_payment",
						value: get(tariff, "payment"),
					},
					{
						name: "month_count",
						value: get(tariff, "month_count"),
					},
					{
						name: "discount",
						value: get(tariff, "discount"),
					},
					{
						name: "first_name",
						value: "",
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
						name: "birthdate",
						value: Date.now(),
						onSubmitValue: (value) => time.toTimestamp(value),
					},
					{
						name: "mail",
						value: "",
						validations: [{ type: "email" }],
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
											label={t("initial fee")}
											onlyNumber={true}
										/>
										<FastField
											component={Fields.Input}
											type="text"
											name="month_count"
											label={t("Month")}
											onlyNumber={true}
										/>
										<FastField
											component={Fields.Input}
											type="text"
											name="discount"
											label={t("discount")}
											onlyNumber={true}
										/>
										<button
											type="submit"
											className="printToDoc"
											onClick={calculate}
										>
											{t("calculate")}
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
													title: t("Fee"),
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
									component={Fields.Input}
									type="text"
									name="first_name"
									label={t("first name")}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="last_name"
									label={t("last name")}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="middle_name"
									label={t("middle name")}
								/>
								<FastField
									component={Fields.Input}
									type="text"
									name="address"
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
								<button type="submit" className="printToDoc submit">
									Submit
								</button>
							</div>
						</>
					);
				}}
			</Containers.Form>
		</div>
	);
};

export default PassportInformation;
