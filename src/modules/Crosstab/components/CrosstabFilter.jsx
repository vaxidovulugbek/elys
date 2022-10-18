import React, { useState } from "react";
import cn from "classnames";
import Slider from "rc-slider";
import ReactSelect from "react-select";
import { FastField, withFormik } from "formik";
import { debounce, findIndex, get, isArray, isEmpty } from "lodash";

import "rc-slider/assets/index.css";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as Rotate } from "assets/images/rotate.svg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { constants, functions } from "services";

import "components/Fields/Select/Select.scss";
import { Fields } from "components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const thumb = {
	border: "none",
	backgroundColor: "#16997f",
	borderRadius: 0,
	width: "2px",
	height: "18px",
	top: "7.5px",
	boxShadow: "none",
};

const classOptions = [{ value: "", label: "All" }, ...constants.classOptions];
const typeOptions = [{ value: "", label: "All" }, ...constants.typeOptions];

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
	complex,
	sections,
}) => {
	const { t } = useTranslation();
	const translatedClassOptions = functions.translateConstans(t, classOptions);
	const translatedTypeOptions = functions.translateConstans(t, typeOptions);
	const { id } = useParams();
	const lngCode = useSelector((state) => get(state, "system.lngCode"));
	const [minmax, setMinmax] = useState({ price: [0, 0], area: [0, 0] });

	const room_counts =
		isArray(apartments) &&
		apartments.reduce((prev, curr) => {
			const price = get(curr, "price");
			const area = get(curr, "plan.area");
			const count = get(curr, "plan.room.count");

			!minmax.price[0] &&
				setMinmax((prev) => ({ ...prev, price: [price - price / 5, prev.price[1]] }));
			!minmax.price[1] &&
				setMinmax((prev) => ({ ...prev, price: [prev.price[0], price + price / 5] }));

			price < minmax.price[0] &&
				setMinmax((prev) => ({ ...prev, price: [price - price / 5, prev.price[1]] }));
			price > minmax.price[1] &&
				setMinmax((prev) => ({ ...prev, price: [prev.price[0], price + price / 5] }));

			area < minmax.area[0] &&
				setMinmax((prev) => ({ ...prev, area: [area - area / 5, prev.area[1]] }));
			area > minmax.area[1] &&
				setMinmax((prev) => ({ ...prev, area: [prev.area[0], area + area / 5] }));

			price < minmax.price[0] &&
				setMinmax((prev) => ({ ...prev, price: [price, prev.price[1]] }));

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

	const getOptions = (data, defaultValue) => {
		const options = Array.isArray(data)
			? data?.reduce(
					(prev, curr) => [
						...prev,
						{ label: get(curr, `name.${lngCode}`), value: get(curr, "id") },
					],
					[]
			  )
			: [];
		defaultValue && options.unshift(defaultValue);
		return options;
	};
	const options_complex = getOptions(complex);
	const options_section = getOptions(sections, { label: "Все секции", value: null });
	return (
		<form id="filters-box" className={filterBoxClass} onSubmit={handleSubmit}>
			<div className="filters">
				<div className="select">
					<FastField
						name="username"
						component={Fields.Select}
						defaultValue={get(
							options_complex,
							`[${findIndex(options_complex, { value: Number(id) })}]`
						)}
						className="crosstab__select"
						options={options_complex}
						isSearchable={false}
						classNamePrefix="select"
					/>
				</div>
				<div className="select">
					<FastField
						name="section"
						component={Fields.Select}
						defaultValue={get(options_section, "[0]")}
						className="crosstab__select"
						options={options_section}
						isSearchable={false}
					/>
				</div>
				<button
					className={cn("close", { hasFilter })}
					onClick={() => setHasFilter(false)}
					type="button"
				>
					<Xbtn />
				</button>
				<div className="rooms">
					<h3 className="rooms__title">{t("Number of rooms")}</h3>
					<div className="btns">
						{room_counts?.map((item, index) => (
							<Checkbox key={index} {...checkboxProps(item)} />
						))}
					</div>
				</div>
				<RangePicker {...rangePickerProps(1, t("Price"), minmax.price)} />
				<RangePicker {...rangePickerProps(2, t("Total area"), minmax.area)} />
				<RangePicker {...rangePickerProps(4, `${t("Price")} м²`, [100, 1410])} />
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
					<p>{t("Promotional")}</p>
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
					<p>{t("Only free")}</p>
				</div>
				<div className="select-box">
					<div className="form-select">
						<ReactSelect
							name="type"
							key={get(values, "type.value")}
							component={ReactSelect}
							options={translatedTypeOptions}
							placeholder={t("Type")}
							classNamePrefix="select"
							value={get(values, "type")}
							onChange={(option) => {
								setFieldValue("type", option);
								handleSubmit();
							}}
						/>
					</div>
					<div className="form-select">
						<ReactSelect
							name="class"
							key={get(values, "class.value")}
							component={ReactSelect}
							options={translatedClassOptions}
							placeholder={t("Class")}
							classNamePrefix="select"
							value={get(values, "class")}
							onChange={(option) => {
								setFieldValue("class", option);
								handleSubmit();
							}}
						/>
					</div>
				</div>
			</div>
			{!isEmpty(values) && (
				<button type="button" className="filter-clear" onClick={() => window.clearFilter()}>
					<Rotate />
					<p>{t("Reset filter")}</p>
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

	if (type === 1 || type === 4)
		label = (val) => <span>{`${functions.convertToReadable(val)} UZS`}</span>;
	if (type === 2)
		label = (val) => (
			<span>
				{`${functions.convertToReadable(val)} M`} <sup style={{ color: "#fff" }}>2</sup>
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
			{/* <div className="ticks">
				<span>
					<p>{minMax[1] / 5}</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>{(minMax[1] * 2) / 5}</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>{(minMax[1] * 3) / 5}</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>{(minMax[1] * 4) / 5}</p>
				</span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>
					<p>{minMax[1]}</p>
				</span>
			</div> */}
		</div>
	);
};
