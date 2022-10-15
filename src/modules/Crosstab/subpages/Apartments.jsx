import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { get, isArray, sortBy } from "lodash";
import cn from "classnames";

import { constants, functions } from "services";
import { useFetchInfinite, useScroll } from "hooks";

import { ReactComponent as BigToSmall } from "assets/images/arrow-down-short-wide.svg";
import { ReactComponent as SmallToBig } from "assets/images/arrow-down-wide-short-solid.svg";

const Apartments = ({ filterFunc, setActiveApartment, activeApartment, complexID, setCount }) => {
	const { t } = useTranslation();
	const [sortType, setSortType] = useState("");
	const apartments = useFetchInfinite({
		url: "/apartment",
		urlSearchParams: {
			include: "plan.files, plan.room, section, floor, complex, plan.fields.plan_field",
			filter: {
				complex_id: complexID,
			},
		},
	});

	// sort table
	apartments.data =
		isArray(apartments.data) &&
		apartments.data.map((item, index) => {
			return {
				...item,
				square_meter: get(item, "price") / get(item, "plan.area"),
			};
		});
	apartments.data = sortBy(apartments.data, [
		(obj) => get(obj, sortType[0] === "-" ? sortType.slice(1) : sortType),
	]);
	if (sortType[0] === "-") apartments.data = apartments.data?.reverse();

	useScroll(document.querySelector(".crosstab .content"), apartments.fetchNextPage, 100);

	const {
		STATUS_CONSTRUCTION,
		STATUS_CONSTRUCTION_TEXT,
		STATUS_FREE,
		STATUS_FREE_TEXT,
		STATUS_INTEREST,
		STATUS_INTEREST_TEXT,
		STATUS_NOT_FOR_SALE,
		STATUS_NOT_FOR_SALE_TEXT,
		STATUS_SOLD,
		STATUS_SOLD_TEXT,
	} = constants;

	const status = {
		[`${STATUS_FREE}`]: STATUS_FREE_TEXT,
		[`${STATUS_CONSTRUCTION}`]: STATUS_CONSTRUCTION_TEXT,
		[`${STATUS_INTEREST}`]: STATUS_INTEREST_TEXT,
		[`${STATUS_NOT_FOR_SALE}`]: STATUS_NOT_FOR_SALE_TEXT,
		[`${STATUS_SOLD}`]: STATUS_SOLD_TEXT,
	};

	const handleSort = (type) => {
		type === sortType ? setSortType(`-${type}`) : setSortType(type);
	};

	const changeClass = (type) => {
		return sortType === type ? "active" : "";
	};

	useEffect(() => {
		setCount(apartments.data?.length);
	}, []);

	return (
		<div className="list">
			<table>
				<thead>
					<tr>
						<th onClick={() => handleSort("id")}>
							<div className="head-row">
								<h3>{t("ID")}</h3>
								{sortType === "id" ? (
									<SmallToBig className={changeClass("id")} />
								) : (
									<BigToSmall className={changeClass("-id")} />
								)}
							</div>
						</th>
						<th onClick={() => handleSort("plan.room.count")}>
							<div className="head-row">
								<h3>{t("Rooms")}</h3>
								{sortType === "plan.room.count" ? (
									<SmallToBig className={changeClass("plan.room.count")} />
								) : (
									<BigToSmall className={changeClass("-plan.room.count")} />
								)}
							</div>
						</th>
						<th onClick={() => handleSort("plan.area")}>
							<div className="head-row">
								<h3>{t("Area")}</h3>
								{sortType === "plan.area" ? (
									<SmallToBig className={changeClass("plan.area")} />
								) : (
									<BigToSmall className={changeClass("-plan.area")} />
								)}
							</div>
						</th>
						<th onClick={() => handleSort("section.sort")}>
							<div className="head-row">
								<h3>{t("Sections")}</h3>
								{sortType === "section.sort" ? (
									<SmallToBig className={changeClass("section.sort")} />
								) : (
									<BigToSmall className={changeClass("-section.sort")} />
								)}
							</div>
						</th>
						<th onClick={() => handleSort("floor.sort")}>
							<div className="head-row">
								<h3>{t("Floors")}</h3>
								{sortType === "floor.sort" ? (
									<SmallToBig className={changeClass("floor.sort")} />
								) : (
									<BigToSmall className={changeClass("-floor.sort")} />
								)}{" "}
							</div>
						</th>
						<th onClick={() => handleSort("sort")}>
							<div className="head-row">
								<h3>{t("Apartment")} №</h3>
								{sortType === "sort" ? (
									<SmallToBig className={changeClass("sort")} />
								) : (
									<BigToSmall className={changeClass("-sort")} />
								)}{" "}
							</div>
						</th>
						<th onClick={() => handleSort("square_meter")}>
							<div className="head-row">
								<h3>
									{t("Price")} м<sup>2</sup>
								</h3>
								{sortType === "square_meter" ? (
									<SmallToBig className={changeClass("square_meter")} />
								) : (
									<BigToSmall className={changeClass("-square_meter")} />
								)}{" "}
							</div>
						</th>
						<th onClick={() => handleSort("price")}>
							<div className="head-row">
								<h3>{t("Total price")}</h3>
								{sortType === "price" ? (
									<SmallToBig className={changeClass("price")} />
								) : (
									<BigToSmall className={changeClass("-price")} />
								)}
							</div>
						</th>
						<th onClick={() => handleSort("status")}>
							<div className="head-row">
								<h3>{t("Status")}</h3>
								{sortType === "status" ? (
									<SmallToBig className={changeClass("status")} />
								) : (
									<BigToSmall className={changeClass("-status")} />
								)}{" "}
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{isArray(apartments.data) &&
						apartments.data.map(
							(item, index) =>
								filterFunc(item) && (
									<tr
										key={index}
										onClick={() => setActiveApartment(item)}
										className={cn({
											active_row:
												get(item, "id") === get(activeApartment, "id"),
										})}
									>
										<td>{get(item, "id")}</td>
										<td>{get(item, "plan.room.count")}</td>
										<td>
											{get(item, "plan.area")} м<sup>2</sup>
										</td>
										<td>{get(item, "section.sort")}</td>
										<td>{get(item, "floor.sort")}</td>
										<td>{get(item, "sort")}</td>
										<td>
											{functions.meterPrice(item)} UZS/м
											<sup>2</sup>
										</td>
										<td>{get(item, "price")} UZS</td>
										<td>
											<span className={`status-${get(item, "status")}`}>
												{t(get(status, `${get(item, "status")}`))}
											</span>
										</td>
									</tr>
								)
						)}
				</tbody>
			</table>
		</div>
	);
};

export default Apartments;
