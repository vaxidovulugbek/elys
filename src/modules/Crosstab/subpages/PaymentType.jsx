import { Fancybox, Fields } from "components";
import Containers from "containers";
import { FastField } from "formik";
import { get } from "lodash";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const payment_types = [
	{ value: 1, label: "разсрочка" },
	{ value: 1, label: "в один клик" },
];

const month = [
	{ value: 12, label: "12 месяцев" },
	{ value: 18, label: "18 месяцев" },
	{ value: 24, label: "24 месяцев" },
];

export const PaymentType = ({ hasApartment }) => {
	const [initialFee, setInitialFee] = useState(0);
	const [apartment, setApartment] = useState();
	const images = Array.isArray(get(apartment, "files"))
		? apartment.files.reduce((prev, curr) => [...prev, get(curr, "thumbnails.small")], [])
		: [];

	useEffect(() => {
		if (hasApartment) setApartment(get(hasApartment, "files", []));
	}, [hasApartment]);

	return (
		<div className="payment-type">
			<Fancybox options={{ infinite: false }}>
				<Swiper spaceBetween={50} modules={[Navigation]} navigation>
					{images.length ? (
						images.map((src, index) => (
							<SwiperSlide key={index}>
								<img
									src={src}
									data-fancybox="gallery"
									data-src={src}
									className="button button--secondary"
									alt="gallery"
								/>
							</SwiperSlide>
						))
					) : (
						<SwiperSlide></SwiperSlide>
					)}
				</Swiper>
			</Fancybox>
			<div className="choice">
				<Containers.Form>
					{() => {
						return (
							<>
								<FastField
									component={Fields.Select}
									name="type"
									options={payment_types}
								/>
								<FastField
									component={Fields.CreatableSelect}
									name="month"
									options={month}
								/>
							</>
						);
					}}
				</Containers.Form>
				<p className="initial-fee">{initialFee}</p>
			</div>
		</div>
	);
};
