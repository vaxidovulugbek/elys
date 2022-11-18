import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import { Navigation } from "swiper";
import { Fancybox } from "components";

import { get } from "lodash";
import { constants, functions } from "services";

import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { useSelector } from "react-redux";
import { isArray } from "lodash";
import { useTranslation } from "react-i18next";

const { STATUS_FREE, STATUS_INTEREST } = constants;
const ON_SALE = [STATUS_FREE, STATUS_INTEREST];

export const ApartmentCard = ({
	setActiveApartment,
	setCurrentTab,
	activeApartment,
	currentTab,
	boxType,
}) => {
	const { t } = useTranslation();
	const lngCode = useSelector((state) => get(state, "system.lngCode"));
	const files = get(activeApartment, "plan.files");
	const images = isArray(files) && files.map((file) => get(file, "thumbnails.full"));

	const planFields = get(activeApartment, "plan.fields");

	return (
		<div className={cn("apartment-card", { active: boxType === "card" })}>
			<button
				className={cn("close", { activeApartment })}
				onClick={() => currentTab !== 5 && setActiveApartment(false)}
			>
				<Xbtn />
			</button>
			<div className="status">
				<div className="left">
					<span className={`status-${get(activeApartment, "status")}`}></span>
					<p></p>
					{/* <Clock /> */}
				</div>
				{/*<div className="right">*/}
				{/*	<div className="fid">FID 543803</div>*/}
				{/*</div>*/}
			</div>
			<div className="apartment-number">
				<div className="left">
					<strong>
						{t("Apartment")} № <span>{get(activeApartment, "sort")}</span>
					</strong>
				</div>
				<div className="right">
					<strong>
						{t("ID")} {get(activeApartment, "id")}
					</strong>
				</div>
			</div>
			<div className="img-carousel">
				<div className="img">
					<Fancybox options={{ infinite: false }}>
						<Swiper spaceBetween={50} modules={[Navigation]} navigation>
							{images.length > 0 ? (
								images.map((img, index) => (
									<SwiperSlide key={index}>
										<img
											src={img}
											data-fancybox="gallery"
											data-src={img}
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
				</div>
			</div>
			<div className="price">
				<dl>
					<dt>
						<p className="name">{t("Price")}</p>
						<p className="value">
							{functions.convertToReadable(get(activeApartment, "price"))} UZS
						</p>
					</dt>
					<dd>
						{functions.meterPrice(activeApartment)} UZS/м
						<sup>2</sup>
					</dd>
				</dl>
			</div>
			{/* {get(activeApartment, "discount") && (
				<div className="discount">
					<GiftBox />
					<span>Cкидка {get(activeApartment, "discount", "")}%</span>
					<span>действует до {"28.05.2020"}</span>
				</div>
			)} */}
			{ON_SALE.includes(get(activeApartment, "status")) && (
				<div className="submit">
					<button className="btn" onClick={() => setCurrentTab(5)} type="button">
						{t("Sell")}
					</button>
				</div>
			)}

			<ul>
				<li>
					<dt className="name">{t("Name of the apartment")}</dt>
					<dd className="value">{get(activeApartment, `name.${lngCode}`)}</dd>
				</li>
				<li>
					<dt className="name">{t("Number of rooms")}</dt>
					<dd className="value">{get(activeApartment, "plan.room.count")}</dd>
				</li>
				<li>
					<dt className="name">{t("Total area")}</dt>
					<dd className="value">
						{get(activeApartment, "plan.area")} {t("м")}
						<sup>2</sup>
					</dd>
				</li>
				<li>
					<dt className="name">{t("Plan type")}</dt>
					<dd className="value">{get(activeApartment, `plan.name.${lngCode}`)}</dd>
				</li>

				<li>
					<dt className="name">{t("Complex")}</dt>
					<dd className="value">{get(activeApartment, "complex.sort")}</dd>
				</li>
				<li>
					<dt className="name">{t("Section")}</dt>
					<dd className="value">{get(activeApartment, "section.sort")}</dd>
				</li>
				<li>
					<div>
						<dt className="name">{t("Floor")}</dt>
						<dd className="value">{get(activeApartment, "floor.sort")}</dd>
					</div>
				</li>

				<li>
					<dt className="name">{t("Type")}</dt>
					<dd className="value">
						{
							constants.typeOptions.find(
								(item) => item.value === get(activeApartment, "type")
							)?.label
						}
					</dd>
				</li>

				<li>
					<dt className="name">{t("Class")}</dt>
					<dd className="value">
						{
							constants.classOptions.find(
								(item) => item.value === get(activeApartment, "class")
							)?.label
						}
					</dd>
				</li>
			</ul>
			{planFields?.length && <h4 className="planFields__title">{t("inner plans")}</h4>}
			<ul>
				{isArray(planFields) &&
					planFields.map((item, index) => (
						<li>
							<dt className="name">{get(item, `plan_field.name.${lngCode}`)}</dt>
							<dl className="value">{get(item, `value.${lngCode}`)}</dl>
						</li>
					))}
			</ul>
		</div>
	);
};
