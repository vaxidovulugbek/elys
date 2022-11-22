import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { get, isArray, sortBy } from "lodash";
import { useTranslation } from "react-i18next";

import Containers from "containers";
import { useFetchOne } from "hooks";
import { constants } from "services";

import { CrosstabHeader, CrosstabFilter, Tab } from "../components";
import { Apartments, Chess, Contract, Interactive, Plan } from "../subpages";
import { Apartment } from "../components";

import "swiper/css";
import "swiper/css/navigation";
import { crosstab_functions } from "../functions";

const Crosstab = () => {
	const { t } = useTranslation();
	const [currentTab, setCurrentTab] = useState(3);
	const [hasFilter, setHasFilter] = useState(window.innerWidth < 991 ? false : true);
	const [activeApartment, setActiveApartment] = useState(null);
	const [count, setCount] = useState(0);
	const lngCode = useSelector((state) => get(state, "system.lngCode"));

	const { id } = useParams();
	const [params, setParams] = useState({});

	const { STATUS_FREE, STATUS_INTEREST, STATUS_SOLD, STATUS_NOT_FOR_SALE } = constants;
	const complex = useFetchOne({
		url: "/user/complex",
		urlSearchParams: {
			include: "place,file,background",
		},
	});

	const testArr = [
		{ name: "4", sort: 4 },
		{ name: "3", sort: 3 },
		{ name: "2", sort: 2 },
		{ name: "1", sort: 1 },
	];

	console.log(sortBy(testArr, ["sort"]));

	const filterFunc = crosstab_functions.filterFuncCreator({ lngCode, params, STATUS_FREE });

	return (
		<div className="crosstab">
			<Containers.List
				url="/section"
				dataKey={(data) => data}
				urlSearchParams={{
					include:
						"background,floors, floors.background,floors.apartments,floors.apartments.plan.room, floors.apartments.complex, complex, floors.apartments.section, floors.apartments.plan,floors.apartments.plan.files ,floors.apartments.plan.room,floors.apartments.files,floors.apartments.floor",
					filter: {
						complex_id: id,
					},
				}}
			>
				{({ data, isFetching }) => {
					// All apartments
					const apartments = isArray(get(data, "data"))
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

					const sortedData = isArray(get(data, "data"))
						? get(data, "data").map((section) => {
								const floors = sortBy(get(section, "floors"), ["sort"]);
								console.log(get(section, "floors"), "floors");
								const filledArr = { arr: [] };
								const fillArr = (floors, i = 0) => {
									if (
										floors.length > 0 &&
										!get(floors, `[${i}].apartments`, []).length
									)
										floors[i].apartments = [false];
									if (floors.length - 1 === i || floors.length < 2) {
										filledArr.arr = floors;
										return floors;
									}
									if (floors.length > 1) {
										if (floors[i + 1].sort - floors[i].sort > 1) {
											floors.splice(i + 1, 0, {
												sort: i + 2,
												apartments: [false],
											});
										}

										i++;
										fillArr(floors, i);
									}
								};
								fillArr(floors);
								filledArr.arr.reverse();
								return { ...section, floors: filledArr.arr };
						  })
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
								{...{
									hasFilter,
									setHasFilter,
									setParams,
									apartments,
									sections: get(data, "data", []),
									complex: get(complex, "data"),
								}}
							/>
							<div className="content">
								<div className="info">
									<div className="left">
										<p className="count">
											{t("Found premises")}:{" "}
											<span className="aparmentCount">{count}</span>
										</p>
									</div>
									<div className="right">
										<div className={`color status-${STATUS_FREE}`}>
											<span></span>
											<label>{t("доступно")}</label>
										</div>
										<div className={`color status-${STATUS_INTEREST}`}>
											<span></span>
											<label>{t("забронировано")}</label>
										</div>
										{/* <div className={`color status-${STATUS_CONSTRUCTION}`}>
											<span></span>
											<label>{t("Under construction")}</label>
										</div> */}
										<div className={`color status-${STATUS_SOLD}`}>
											<span></span>
											<label>{t("продано")}</label>
										</div>
										<div className={`color status-${STATUS_NOT_FOR_SALE}`}>
											<span></span>
											<label>{t("не для продажи")}</label>
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
												data: sortedData,
												filterFunc,
												setCount: () => setCount(apartments.length),
											}}
										/>
									)}
									{currentTab === 2 && (
										<Plan
											{...{
												activeApartment,
												setActiveApartment,
												filterFunc,
												setCount,
											}}
										/>
									)}
									{currentTab === 3 && (
										<Interactive
											{...{
												activeApartment,
												setActiveApartment,
												filterFunc,
												complexes: get(complex, "data"),
												setCount,
											}}
										/>
									)}
									{currentTab === 4 && (
										<Apartments
											{...{
												activeApartment,
												setActiveApartment,
												filterFunc,
												complexID: id,
												setCount,
											}}
										/>
									)}
									{currentTab === 5 && (
										<Contract
											{...{
												currentTab,
												setCurrentTab,
												activeApartment,
												setActiveApartment,
											}}
										/>
									)}
								</div>
							</div>
							<Apartment
								{...{
									activeApartment,
									setActiveApartment,
									setCurrentTab,
									currentTab,
								}}
							/>
						</>
					);
				}}
			</Containers.List>
		</div>
	);
};

export default Crosstab;
