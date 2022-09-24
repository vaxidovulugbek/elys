import Containers from "containers";
import { get } from "lodash";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { CrosstabHeader, CrosstabFilter, Tab, FlatList } from "../components";
import Apartment from "../subpages/Appartment";
import Chess from "../subpages/Chess";
import Interactive from "../subpages/Interactive";
import Rooms from "../subpages/Rooms";

const Crosstab = () => {
	const [currentTab, setCurrentTab] = useState(1);
	const [hasFilter, setHasFilter] = useState(window.innerWidth < 991 ? false : true);
	const [hasApartment, setHasApartment] = useState(false);
	const { id } = useParams();
	const [params, setParams] = useState({});

	const filterFunc = (apartment) => {
		let active = true;
		const { room_count, price, discount, square_meter, status } = apartment;
		const meter_price = price / square_meter;

		const filter = {
			room_count: get(params, "room_count", []),
			price: get(params, "price", [0, 100000000000]),
			square_meter: get(params, "square_meter", [0, 100000000000]),
			meter_price: get(params, "meter_price", ""),
			discount: get(params, "discount", ""),
			status: get(params, "status", ""),
		};

		if (filter.room_count.length > 0 && !filter.room_count.includes(room_count)) active = false;
		if (filter.price[0] > price || filter.price[1] < price) active = false;
		if (filter.square_meter[0] > square_meter || filter.square_meter[1] < square_meter)
			active = false;
		if (filter.meter_price[0] > meter_price || filter.meter_price[1] < meter_price)
			active = false;
		if (filter.discount && !discount) active = false;
		if (filter.status && status !== 1) active = false;

		return active;
	};

	return (
		<div className="crosstab">
			<Containers.List
				url={`cross-tab/${id}`}
				dataKey={(data) => data}
				urlSearchParams={{
					include: "file",
				}}
			>
				{({ data }) => {
					// All apartments
					const apartments = get(data, "sections", []).reduce((prev, curr) => {
						const arr = Object.values(get(curr, "floors", {})).reduce((prev, curr) => {
							return [...prev, ...get(curr, "apartments", [])];
						}, []);
						return [...prev, ...arr];
					}, []);

					return (
						<>
							<CrosstabHeader
								{...{ setHasFilter, hasFilter, setHasApartment, hasApartment }}
							/>
							<CrosstabFilter {...{ hasFilter, setHasFilter, setParams }} />
							<div className="content">
								<div className="info">
									<div className="left">
										<p className="count">Найдено помещений: 462</p>
									</div>
									<div className="right">
										<div className="color">
											<span></span>
											<label>Свободно</label>
										</div>
										<div className="color">
											<span></span>
											<label>Резерв</label>
										</div>
										<div className="color">
											<span></span>
											<label>Продано</label>
										</div>
										<div className="color">
											<span></span>
											<label>Не в продаже</label>
										</div>
									</div>
								</div>
								<div className="content-box list-content">
									<Tab
										{...{ setCurrentTab, currentTab, setHasFilter, hasFilter }}
									/>
									{currentTab === 1 && (
										<Chess
											{...{
												hasApartment,
												setHasApartment,
												data: get(data, "sections", []),
												filterFunc,
											}}
										/>
									)}
									{currentTab === 2 && (
										<Rooms
											{...{
												hasApartment,
												setHasApartment,
												data: apartments,
												filterFunc,
											}}
										/>
									)}
									{currentTab === 3 && (
										<Interactive
											{...{ hasApartment, setHasApartment, filterFunc }}
										/>
									)}
									{currentTab === 4 && (
										<FlatList
											{...{
												hasApartment,
												setHasApartment,
												data: apartments,
												filterFunc,
											}}
										/>
									)}
								</div>
							</div>
							<Apartment {...{ hasApartment, setHasApartment, setCurrentTab }} />
						</>
					);
				}}
			</Containers.List>
		</div>
	);
};

export default Crosstab;
