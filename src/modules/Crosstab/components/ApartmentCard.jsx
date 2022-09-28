import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import { Navigation } from "swiper";
import { Fancybox } from "components";

import { ReactComponent as Clock } from "assets/images/clock-rotate-left.svg";
import { ReactComponent as Click } from "assets/images/click.svg";
import { ReactComponent as Print } from "assets/images/print.svg";
import { ReactComponent as Share } from "assets/images/share.svg";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as GiftBox } from "assets/images/gift.svg";

import room from "assets/images/room.png";

export const ApartmentCard = ({
	setHasApartment,
	setCurrentTab,
	hasApartment,
	boxType,
	setBoxType,
}) => {
	return (
		<div className={cn("apartment-card", { active: boxType === "card" })}>
			<button
				className={cn("close", { hasApartment })}
				onClick={() => setHasApartment(false)}
			>
				<Xbtn />
			</button>
			<div className="status">
				<div className="left">
					<span className="status-1"></span>
					<p>Продано</p>
					<Clock />
				</div>
				<div className="right">
					<div className="fid">FID 543803</div>
				</div>
			</div>
			<div className="apartment-number">
				<div className="left">
					<strong>
						Квартира № <span>75</span>
					</strong>
				</div>
				<div className="right">
					<strong>ID 89</strong>
				</div>
			</div>
			<div className="img-carousel">
				<div className="print">
					<Print />
				</div>
				<div className="share">
					<Share />
				</div>
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
						<p className="value">43 428 $</p>
					</dt>
					<dd>
						1 410 $/м<sup>2</sup>
					</dd>
				</dl>
			</div>
			<div className="discount">
				<GiftBox />
				<span>Cкидка {5}%</span>
				<span>действует до {"28.05.2020"}</span>
			</div>
			<div className="submit">
				<button className="btn" onClick={() => setBoxType("form")}>
					Оставить заявку
				</button>
			</div>
			<ul>
				<li>
					<dt className="name">Площадь общая</dt>
					<dd className="value">
						30.8 м<sup>2</sup>
					</dd>
				</li>
				<li>
					<dt className="name">Жилая площадь</dt>
					<dd className="value">
						11.9 м<sup>2</sup>
					</dd>
				</li>
				<li>
					<dt className="name">Площадь кухни</dt>
					<dd className="value">
						7.2 м<sup>2</sup>
					</dd>
				</li>
				<li>
					<dt className="name">Кол-во комнат</dt>
					<dd className="value">1</dd>
				</li>
				<li>
					<dt className="name">Тип планировки</dt>
					<dd className="value">C1</dd>
				</li>
				<li>
					<dt className="name">Кол-во балконов</dt>
					<dd className="value">1</dd>
				</li>
				<li>
					<dt className="name">Кол-во совмещенных санузлов</dt>
					<dd className="value">1</dd>
				</li>
				<li>
					<div>
						<dt className="name">Этаж</dt>
						<dd className="value">6</dd>
					</div>
					<button className="plan" onClick={() => setCurrentTab(3)}>
						<Click />
						<span>План этажа</span>
					</button>
				</li>
				<li>
					<dt className="name">Секция</dt>
					<dd className="value">1</dd>
				</li>
				<li>
					<dt className="name">Дом</dt>
					<dd className="value">1</dd>
				</li>
				<li>
					<dt className="name">Объект</dt>
					<dd className="value">Rteco</dd>
				</li>
				<li>
					<dt className="name">Первый взнос</dt>
					<dd className="value">16 936.92 $</dd>
				</li>
				<li>
					<dt className="name">Ежемесячный платеж</dt>
					<dd className="value">1 766.07 $</dd>
				</li>
				<li>
					<dt className="name">Срок кредита</dt>
					<dd className="value">15</dd>
				</li>
				<li>
					<dt className="name">Стоимость по кредиту</dt>
					<dd className="value">43 428 $</dd>
				</li>
			</ul>
		</div>
	);
};

// const Fancybox = (props) => {
// 	const delegate = props.delegate || "[data-fancybox]";

// 	useEffect(() => {
// 		const opts = props.options || {};

// 		NativeFancybox.bind(delegate, opts);

// 		return () => {
// 			NativeFancybox.destroy();
// 		};
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	return <>{props.children}</>;
// };
