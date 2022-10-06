import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { get } from "lodash";

import Containers from "containers";
import { useFetchOne } from "hooks";
import { constants } from "services";

import { CrosstabHeader, CrosstabFilter, Tab } from "../components";
import { Appartments, Chess, PassportInformation, Interactive, Payment, Plan } from "../subpages";
import { Apartment } from "../components";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";

const Crosstab = () => {
	const [currentTab, setCurrentTab] = useState(5);
	const [hasFilter, setHasFilter] = useState(window.innerWidth < 991 ? false : true);
	const [activeApartment, setActiveApartment] = useState(null);
	const { id } = useParams();
	const [params, setParams] = useState({});
	const [paymentDetails, setPaymentDetails] = useState();

	const { STATUS_FREE, STATUS_INTEREST, STATUS_SOLD, STATUS_NOT_FOR_SALE, STATUS_CONSTRUCTION } =
		constants;
	const complex = useFetchOne({
		url: "/user/complex",
		urlSearchParams: {
			include: "place,file,background",
		},
	});

	const filterFunc = (apartment) => {
		let active = true;
		const { id, sort, price, discount, status, section_id } = apartment;
		const room_count = get(apartment, "plan.room.count", 0);
		const square_meter = get(apartment, "plan.area", 0);
		const meter_price = price / square_meter;

		// Filter apartments
		const filter = {
			room_count: get(params, "room_count", []),
			price: get(params, "price", [0, 100000000000]),
			square_meter: get(params, "square_meter", [0, 100000000000]),
			meter_price: get(params, "meter_price", ""),
			discount: get(params, "discount", ""),
			status: get(params, "status", ""),
			section_id: get(params, "section_id", ""),
		};

		if (filter.room_count.length > 0 && !filter.room_count.includes(room_count)) active = false;
		if (filter.price[0] > price || filter.price[1] < price) active = false;
		if (filter.square_meter[0] > square_meter || filter.square_meter[1] < square_meter)
			active = false;
		if (filter.meter_price[0] > meter_price || filter.meter_price[1] < meter_price)
			active = false;
		if (filter.discount && !discount) active = false;
		if (filter.status && status !== STATUS_FREE) active = false;
		if (filter.section_id && filter.section_id !== section_id) active = false;

		// Search apartments by area, id, number
		const search = new RegExp(`${get(params, "search", "")}`);

		const hasMatchWithSearch =
			String(square_meter).match(search) ||
			String(id).match(search) ||
			String(sort).match(search);

		if (!hasMatchWithSearch) active = false;
		return active;
	};

	return (
		<div className="crosstab">
			<Containers.List
				url="/section"
				dataKey={(data) => data}
				urlSearchParams={{
					include:
						"background,floors, floors.background,floors.apartments,floors.apartments.plan.room, floors.apartments.complex, complex, floors.apartments.section, floors.apartments.plan, floors.apartments.plan.room,floors.apartments.files",
					filter: {
						complex_id: id,
					},
				}}
			>
				{({ data, isFetching }) => {
					// All apartments
					const apartments = Array.isArray(get(data, "data"))
						? get(data, "data").reduce((prev, curr) => {
								const arr = Object.values(get(curr, "floors", {})).reduce(
									(prev, curr) => {
										return [...prev, ...get(curr, "apartments", [])];
									},
									[]
								);
								return [...prev, ...arr];
						  }, [])
						: [];

					return (
						<>
							<CrosstabHeader
								{...{
									setHasFilter,
									hasFilter,
									setActiveApartment,
									activeApartment,
									setParams,
									params,
									sections: get(data, "data", []),
									complex: get(complex, "data"),
								}}
							/>
							<CrosstabFilter
								{...{ hasFilter, setHasFilter, setParams, apartments }}
							/>
							<div className="content">
								<div className="info">
									<div className="left">
										<p className="count">
											Найдено помещений: {apartments.length}
										</p>
									</div>
									<div className="right">
										<div className={`color status-${STATUS_FREE}`}>
											<span></span>
											<label>Свободно</label>
										</div>
										<div className={`color status-${STATUS_INTEREST}`}>
											<span></span>
											<label>Интерес</label>
										</div>
										<div className={`color status-${STATUS_CONSTRUCTION}`}>
											<span></span>
											<label>Резерв</label>
										</div>
										<div className={`color status-${STATUS_SOLD}`}>
											<span></span>
											<label>Проданные</label>
										</div>
										<div className={`color status-${STATUS_NOT_FOR_SALE}`}>
											<span></span>
											<label>Не в продаже</label>
										</div>
									</div>
								</div>
								<div className="content-box list-content">
									<Tab
										{...{
											setCurrentTab,
											currentTab,
											setHasFilter,
											hasFilter,
											params,
										}}
									/>
									{currentTab === 1 && (
										<Chess
											{...{
												activeApartment,
												setActiveApartment,
												data: get(data, "data", []),
												filterFunc,
											}}
										/>
									)}
									{currentTab === 2 && (
										<Plan
											{...{
												activeApartment,
												setActiveApartment,
												filterFunc,
											}}
										/>
									)}
									{currentTab === 3 && (
										<Interactive
											{...{
												activeApartment,
												setActiveApartment,
												filterFunc,
												complex,
											}}
										/>
									)}
									{currentTab === 4 && (
										<Appartments
											{...{
												activeApartment,
												setActiveApartment,
												filterFunc,
											}}
										/>
									)}
									{currentTab === 5 && (
										<PassportInformation
											{...{
												setCurrentTab,
												activeApartment,
												setPaymentDetails,
											}}
										/>
									)}
								</div>
							</div>
							<Apartment
								{...{ activeApartment, setActiveApartment, setCurrentTab }}
							/>
						</>
					);
				}}
			</Containers.List>
		</div>
	);
};

export default Crosstab;
