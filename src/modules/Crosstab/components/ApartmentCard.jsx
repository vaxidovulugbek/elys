import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { get, isArray, isEmpty } from "lodash";
import cn from "classnames";

import { constants, functions } from "services";
import { useModalWithHook } from "hooks/useModalWithHook";

import { Fancybox } from "components";
import { ApartmentBookModal } from "../components/ApartmentBookModal";

import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ApartmentBookingHistoryModal } from "modules/Crosstab/components/ApartmentBookingHistoryModal";

const { STATUS_FREE, STATUS_INTEREST, STATUS_SOLD } = constants;
const ON_SALE = [STATUS_FREE, STATUS_INTEREST];
const ON_SOLD = [STATUS_INTEREST, STATUS_SOLD];

export const ApartmentCard = ({
	setActiveApartment,
	setCurrentTab,
	activeApartment,
	currentTab,
	boxType,
	refetch,
}) => {
	const { t } = useTranslation();
	const lngCode = useSelector((state) => get(state, "system.lngCode"));
	const files = get(activeApartment, "plan.files");
	const images = isArray(files) && files.map((file) => get(file, "thumbnails.full"));

	const planFields = get(activeApartment, "plan.fields");
	const book = useModalWithHook();
	const bookHistory = useModalWithHook();

	return (
		<>
			<ApartmentBookModal
				book={book}
				activeApartment={activeApartment}
				setActiveApartment={setActiveApartment}
				refetch={refetch}
			/>

			<ApartmentBookingHistoryModal
				refetch={refetch}
				setActiveApartment={setActiveApartment}
				bookHistory={bookHistory}
				apartmentId={get(activeApartment, "id")}
				bookings={get(activeApartment, "bookings")}
			/>

			<div className={cn("apartment-card", { active: boxType === "card" })}>
				<button
					className={cn("close", { activeApartment })}
					onClick={() => {
						currentTab !== 5 && setActiveApartment(false);
					}}
				>
					<Xbtn />
				</button>
				<div className="status">
					<div className="left">
						<span className={`status-${get(activeApartment, "status")}`}></span>
						<p>{get(constants.statuses, `[${get(activeApartment, "status")}]`)}</p>
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

					{!isEmpty(get(activeApartment, "bookings")) && (
						<button className="booked__btn" onClick={bookHistory.handleOverlayOpen}>
							Booked
						</button>
					)}
				</div>
				{/* {get(activeApartment, "discount") && (
				<div className="discount">
					<GiftBox />
					<span>Cкидка {get(activeApartment, "discount", "")}%</span>
					<span>действует до {"28.05.2020"}</span>
				</div>
			)} */}
				{constants.STATUS_FREE === get(activeApartment, "status") && (
					<div className="submit">
						<button className="btn" onClick={book.handleOverlayOpen} type="button">
							{t("Book")}
						</button>
					</div>
				)}

				{ON_SALE.includes(get(activeApartment, "status")) && (
					<div className="submit">
						<button className="btn" onClick={() => setCurrentTab(5)} type="button">
							{t("Sell")}
						</button>
					</div>
				)}

				{ON_SOLD.includes(get(activeApartment, "status")) && (
					<div className="submit">
						<Link
							to={`/contract?apartment_id=${get(activeApartment, "id")}`}
							className="btn"
						>
							{t("Contracts")}
						</Link>
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
		</>
	);
};
