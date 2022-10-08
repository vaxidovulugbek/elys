import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import { Navigation } from "swiper";
import { Fancybox } from "components";

import { get } from "lodash";
import { constants, functions } from "services";

import room from "assets/images/room.png";
import { ReactComponent as Clock } from "assets/images/clock-rotate-left.svg";
import { ReactComponent as Click } from "assets/images/click.svg";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as GiftBox } from "assets/images/gift.svg";

const { STATUS_FREE, STATUS_INTEREST } = constants;
const ON_SALE = [STATUS_FREE, STATUS_INTEREST];

export const ApartmentCard = ({
	setActiveApartment,
	setCurrentTab,
	activeApartment,
	currentTab,
	boxType,
}) => {
	const langCode = "ru";
	console.log(activeApartment, "activeApartment");
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
					<span className="status-1"></span>
					<p></p>
					<Clock />
				</div>
				{/*<div className="right">*/}
				{/*	<div className="fid">FID 543803</div>*/}
				{/*</div>*/}
			</div>
			<div className="apartment-number">
				<div className="left">
					<strong>
						Квартира № <span>{get(activeApartment, "sort")}</span>
					</strong>
				</div>
				<div className="right">
					<strong>ID {get(activeApartment, "id")}</strong>
				</div>
			</div>
			<div className="img-carousel">
				{/* <div className="print">
					<Print />
				</div>
				<div className="share">
					<Share />
				</div> */}
				<div className="img">
					<Fancybox options={{ infinite: false }}>
						<Swiper spaceBetween={50} modules={[Navigation]} navigation>
							<SwiperSlide>
								<img
									src={room}
									data-fancybox="gallery"
									data-src={room}
									className="button button--secondary"
									alt="gallery"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									src={room}
									data-fancybox="gallery"
									data-src={room}
									className="button button--secondary"
									alt="gallery"
								/>
							</SwiperSlide>
						</Swiper>
					</Fancybox>
				</div>
			</div>
			<div className="price">
				<dl>
					<dt>
						<p className="name">Стоимость</p>
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
					<button className="btn" onClick={() => setCurrentTab(5)}>
						продать
					</button>
				</div>
			)}

			<ul>
				<li>
					<dt className="name">Название квартиры</dt>
					<dd className="value">{get(activeApartment, `name.${langCode}`)}</dd>
				</li>
				<li>
					<dt className="name">Кол-во комнат</dt>
					<dd className="value">{get(activeApartment, "plan.room.count")}</dd>
				</li>
				<li>
					<dt className="name">Тип планировки</dt>
					<dd className="value">{get(activeApartment, `plan.name.${langCode}`)}</dd>
				</li>

				<li>
					<dt className="name">Комплекс</dt>
					<dd className="value">{get(activeApartment, "complex.sort")}</dd>
				</li>
				<li>
					<dt className="name">Секция</dt>
					<dd className="value">{get(activeApartment, "section.sort")}</dd>
				</li>
				<li>
					<div>
						<dt className="name">Этаж</dt>
						<dd className="value">{get(activeApartment, "floor.sort")}</dd>
					</div>
				</li>

				<li>
					<dt className="name">Тип</dt>
					<dd className="value">
						{
							constants.typeOptions.find(
								(item) => item.value === get(activeApartment, "type")
							)?.label
						}
					</dd>
				</li>

				<li>
					<dt className="name">Класс</dt>
					<dd className="value">
						{
							constants.classOptions.find(
								(item) => item.value === get(activeApartment, "class")
							)?.label
						}
					</dd>
				</li>
			</ul>
		</div>
	);
};
