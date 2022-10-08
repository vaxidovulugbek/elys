import React, { useState } from "react";
import cn from "classnames";
import Slider from "rc-slider";
import ReactSelect from "react-select";
import { FastField, withFormik } from "formik";
import { debounce, get, isEmpty } from "lodash";

import "rc-slider/assets/index.css";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
// import { ReactComponent as AngleDown } from 'assets/images/angle-down.svg'
import { ReactComponent as Rotate } from "assets/images/rotate.svg";
import { useEffect } from "react";

const usernames = [{ value: "1", label: "Abdulaziz Abdurashidov" }];

const sections = [
	{ value: 1, label: "Секция 1" },
	{ value: 2, label: "Секция 2" },
	{ value: 3, label: "Секция 3" },
	{ value: 4, label: "Все секции" },
];

const thumb = {
	border: "none",
	backgroundColor: "#16997f",
	borderRadius: 0,
	width: "2px",
	height: "18px",
	top: "7.5px",
	boxShadow: "none",
};

const setFieldDebounce = debounce((handleSubmit) => {
	handleSubmit();
}, 300);

const Form = ({
	hasFilter,
	setHasFilter,
	handleSubmit,
	values,
	setFieldValue,
	resetForm,
	setParams,
	apartments,
}) => {
	const room_counts =
		Array.isArray(apartments) &&
		apartments.reduce((prev, curr) => {
			const count = get(curr, "plan.room.count");
			!prev.includes(count) && count && prev.push(count);
			return prev;
		}, []);
	room_counts?.sort((a, b) => a - b);

	window.clearFilter = () => {
		setParams({});
		resetForm();
	};

	const toggleSelect = (number, type) => {
		let newFilter;
		const filter = get(values, "room_count", []);
		if (filter.includes(number)) newFilter = filter.filter((num) => num !== number);
		if (!filter.includes(number)) newFilter = [number, ...filter];
		setFieldValue("room_count", newFilter);
		handleSubmit();
	};

	const filterBoxClass = cn("filters-box", { "filter-closed": !hasFilter });

	const checkboxProps = (number) => ({
		toggleSelect,
		number,
		filter: get(values, "room_count", []),
		setFieldValue,
	});

	const rangePickerProps = (type, title, minMax, isOpen = true) => ({
		title,
		type,
		values,
		setFieldValue,
		minMax,
		handleSubmit,
		isOpen,
	});

	return (
		<form id="filters-box" className={filterBoxClass} onSubmit={handleSubmit}>
			<div className="filters">
				<div className="select">
					<FastField
						name="username"
						component={ReactSelect}
						defaultValue={usernames[0]}
						className="crosstab__select"
						options={usernames}
						isSearchable={false}
					/>
				</div>
				<div className="select">
					<FastField
						name="section"
						component={ReactSelect}
						defaultValue={sections[3]}
						className="crosstab__select"
						options={sections}
						isSearchable={false}
					/>
				</div>
				<button className={cn("close", { hasFilter })} onClick={() => setHasFilter(false)}>
					<Xbtn />
				</button>
				<div className="rooms">
					<h3 className="rooms__title">Кол-во комнат</h3>
					<div className="btns">
						{room_counts?.map((item, index) => (
							<Checkbox key={index} {...checkboxProps(item)} />
						))}
					</div>
				</div>
				<RangePicker {...rangePickerProps(1, "Стоимость", [3200, 100000])} />
				<RangePicker {...rangePickerProps(2, "Площадь общая", [8, 200])} />
				<RangePicker {...rangePickerProps(4, "Цена м", [100, 1410])} />
				<div className="switch-box">
					<label className="switch">
						<input
							type="checkbox"
							name="discount"
							onChange={(e) => {
								setFieldValue("discount", !get(values, "discount"));
								handleSubmit();
							}}
							checked={get(values, "discount")}
						/>
						<span className="switch-slider round"></span>
					</label>
					<p>только АКЦИОННЫЕ</p>
				</div>
				<div className="switch-box">
					<label className="switch">
						<input
							type="checkbox"
							name="status"
							onChange={(e) => {
								setFieldValue("status", !get(values, "status"));
								handleSubmit();
							}}
							checked={get(values, "status")}
						/>
						<span className="switch-slider round"></span>
					</label>
					<p>только СВОБОДНЫЕ</p>
				</div>
			</div>
			{!isEmpty(values) && (
				<button type="button" className="filter-clear" onClick={() => window.clearFilter()}>
					<Rotate />
					<p>Сбросить фильтр</p>
				</button>
			)}
		</form>
	);
};

export const CrosstabFilter = withFormik({
	mapPropsToValues: () => ({}),
	handleSubmit: (values, { props }) => {
		const { setParams } = props;
		setParams(values);
	},
})(Form);

const Checkbox = ({ toggleSelect, number, filter }) => {
	return (
		<>
			<button
				type="button"
				onClick={() => toggleSelect(number)}
				className={cn({ active: filter.includes(number) })}
			>
				{number}
			</button>
		</>
	);
};

const RangePicker = ({
	isOpen = true,
	title,
	minMax = [0, 100],
	setFieldValue,
	handleSubmit,
	type,
	values,
}) => {
	const [slider, setSlider] = useState(minMax);
	const max = minMax[1];
	let key = "price";
	if (type === 2) key = "square_meter";
	if (type === 3) key = "floors";
	if (type === 4) key = "meter_price";

	const handleChange = (e) => {
		setSlider(e);
		setFieldValue(key, e);
		setFieldDebounce(handleSubmit);
	};

	let label = (val) => <span>{val}</span>;

	if (type === 1 || type === 4) label = (val) => <span>{`${val} UZS`}</span>;
	if (type === 2)
		label = (val) => (
			<span>
				{`${val} M`} <sup style={{ color: "#fff" }}>2</sup>
			</span>
		);
	useEffect(() => {
		isEmpty(values) && setSlider(minMax);
	}, [values, minMax]);

	return (
		<div className="rangePicker" style={{ display: isOpen ? "block" : "none" }}>
			<h3 className="title">{title}</h3>
			<div className="range-slider">
				<div
					className="tooltip"
					style={{ left: `${((slider[0] - minMax[0]) / (max - minMax[0])) * 100}%` }}
				>
					{label(slider[0])}
				</div>
				<div
					className="tooltip"
					style={{ left: `${((slider[1] - minMax[0]) / (max - minMax[0])) * 100}%` }}
				>
					{label(slider[1])}
				</div>
				<span className="left-border"></span>
				<span className="right-border"></span>
				<Slider
					range
					defaultValue={minMax}
					value={get(values, key) || minMax}
					min={minMax[0]}
					max={minMax[1]}
					onChange={(e) => handleChange(e)}
					allowCross={false}
					handleStyle={[thumb, thumb]}
					trackStyle={[{ background: "#1abc9c", height: "12px", borderRadius: 0 }]}
					railStyle={{ backgroundColor: "#ebe9e9", height: "12px", borderRadius: 0 }}
				/>
			</div>
			<div className="ticks">
				<span>
					<p>8</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>20</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>32</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>44</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>56</p>
				</span>
			</div>
		</div>
	);
};
