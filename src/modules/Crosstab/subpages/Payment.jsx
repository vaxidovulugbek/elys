/* eslint-disable no-extend-native */
import { Fancybox, Fields, Table } from "components";
import Containers from "containers";
import { FastField } from "formik";
import { get } from "lodash";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { functions } from "services";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const payment_types = [
	{ value: 1, label: "рассрочка" },
	{ value: 2, label: "в один клик" },
];

const option_month = [
	{ value: 12, label: "12 месяцев" },
	{ value: 18, label: "18 месяцев" },
	{ value: 24, label: "24 месяцев" },
];

export const Payment = ({ activeApartment, setCurrentTab, setPaymentDetails }) => {
	const { t } = useTranslation();

	const [initialFee, setInitialFee] = useState(0);
	const [apartment, setApartment] = useState({});
	const [type, setType] = useState(1);
	const [month, setMonth] = useState(12);

	const price = get(apartment, "price", 0);

	const items = Array(month || 1)
		.fill(1)
		.map((_, index) => ({ month: index + 1, fee: (price / month).toFixed(2) }));

	const images = Array.isArray(get(apartment, "files"))
		? apartment.files.reduce((prev, curr) => [...prev, get(curr, "thumbnails.small")], [])
		: [];

	useEffect(() => {
		if (activeApartment) setApartment(activeApartment);
	}, [activeApartment]);

	const setNext = () => {
		setPaymentDetails({
			price,
			initialFee,
			month,
			type,
		});
		setCurrentTab(6);
	};

	return (
		<div className="payment-type">
			<div className="left">
				<div className="payment-type__choice">
					<Containers.Form>
						{() => {
							return (
								<>
									<FastField
										component={Fields.Select}
										name="type"
										options={payment_types}
										defaultValue={payment_types[0]}
										onValueChange={(option) => setType(get(option, "value"))}
									/>
									{type === 1 && (
										<FastField
											component={Fields.CreatableSelect}
											name="month"
											defaultValue={option_month[0]}
											options={option_month}
											onValueChange={(option) =>
												setMonth(get(option, "value"))
											}
										/>
									)}
								</>
							);
						}}
					</Containers.Form>
					<p className="initial-fee">
						{t("initial fee")}:{" "}
						{functions.convertToReadable(type === 1 ? initialFee : price)}
					</p>
					<div className="submit">
						<button className="btn btn--next" onClick={setNext}>
							Next
						</button>
					</div>
				</div>
			</div>
			<div className="right">
				{type === 1 && (
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
		</div>
	);
};

export default Payment;

// appartment images

// <div className="payment-type__slider">
// 	<Fancybox options={{ infinite: false }}>
// 		<Swiper
// 			spaceBetween={50}
// 			modules={[Navigation]}
// 			navigation
// 			className="payment-type__swiper"
// 		>
// 			{images.length ? (
// 				images.map((src, index) => (
// 					<SwiperSlide key={index}>
// 						<img
// 							src={src}
// 							data-fancybox="gallery"
// 							data-src={src}
// 							className="button button--secondary"
// 							alt="gallery"
// 						/>
// 					</SwiperSlide>
// 				))
// 			) : (
// 				<SwiperSlide></SwiperSlide>
// 			)}
// 		</Swiper>
// 	</Fancybox>
// </div>
