import React from "react";
import cn from "classnames";
import ReactSelect from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { FastField } from "formik";

import { Fields } from "components";
import Containers from "containers";

import obj from "assets/images/obj.jpg";
import { ReactComponent as Search } from "assets/images/search.svg";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as Back } from "assets/images/back.svg";
import { get } from "lodash";
import { useFetchOne } from "hooks";

const sections = [
	{ value: 1, label: "Секция 1" },
	{ value: 2, label: "Секция 2" },
	{ value: 3, label: "Секция 3" },
	{ value: 4, label: "Все секции" },
];

export const CrosstabHeader = ({
	hasApartment,
	setHasApartment,
	setHasFilter,
	hasFilter,
	setParams,
	params,
	sections,
}) => {
	const navigate = useNavigate();
	const lng = "ru";
	const { data } = useFetchOne({
		url: "complex",
	});
	const options_complex = data?.reduce(
		(prev, curr) => [...prev, { label: get(curr, `name.${lng}`), value: get(curr, "id") }],
		[]
	);
	const options_section =
		Array.isArray(sections) &&
		sections.reduce(
			(prev, curr) => [...prev, { label: get(curr, `name.${lng}`), value: get(curr, "id") }],
			[]
		);
	options_section.unshift({ label: "Все секции", value: null });
	const handleComplexChange = (option) => navigate(`/crosstab/${get(option, "value")}`);

	return (
		<header className="crosstab-header" id="crosstab-header">
			<div className="left">
				<div className="header-img">
					<img src={obj} alt="" />
				</div>
				<Containers.Form>
					{() => (
						<>
							<div className="select">
								<FastField
									name="complex"
									component={Fields.Select}
									key={Math.random()}
									defaultValue={get(options_complex, "[0]")}
									className="crosstab__select"
									options={options_complex}
									isSearchable={false}
									onValueChange={handleComplexChange}
								/>
							</div>
							<div className="select section-select">
								<FastField
									name="section"
									component={Fields.Select}
									key={Math.random()}
									defaultValue={get(options_section, "[0]")}
									className="crosstab__select"
									options={options_section}
									isSearchable={false}
									onValueChange={(option) =>
										setParams((prev) => ({
											...prev,
											section_id: get(option, "value"),
										}))
									}
								/>
							</div>
							<div className="search">
								<input
									type="text"
									placeholder="Поиск помещения"
									value={get(params, "search", "")}
									onChange={(e) =>
										setParams((prev) => ({ ...prev, search: e.target.value }))
									}
								/>
								<Search />
							</div>
						</>
					)}
				</Containers.Form>
			</div>
			<div className="right">
				<Link to="/" className={cn("close", { invisiable: hasApartment || hasFilter })}>
					<Xbtn />
					<p className="text">Закрыть</p>
				</Link>
				<button
					className={cn("back", { hide: !hasApartment && !hasFilter })}
					onClick={() => {
						setHasFilter(false);
						setHasApartment(false);
					}}
				>
					<Back />
					<p className="text">назад</p>
				</button>
			</div>
		</header>
	);
};
