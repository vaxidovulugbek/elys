import React from "react";
import cn from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FastField } from "formik";

import { Fields } from "components";
import Containers from "containers";

import obj from "assets/images/obj.jpg";
import { ReactComponent as Search } from "assets/images/search.svg";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as Back } from "assets/images/back.svg";
import { findIndex, get } from "lodash";

export const CrosstabHeader = ({
	hasApartment,
	setHasApartment,
	setHasFilter,
	hasFilter,
	setParams,
	params,
	sections,
	complex,
}) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const lng = "ru";
	const getOptions = (data, defaultValue) => {
		const options = Array.isArray(data)
			? data?.reduce(
					(prev, curr) => [
						...prev,
						{ label: get(curr, "name.uz"), value: get(curr, "id") },
					],
					[]
			  )
			: [];
		defaultValue && options.unshift(defaultValue);
		return options;
	};
	const options_complex = getOptions(complex);
	const options_section = getOptions(sections, { label: "Все секции", value: null });

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
									key={complex}
									defaultValue={get(
										options_complex,
										`[${findIndex(options_complex, { value: Number(id) })}]`
									)}
									options={options_complex}
									isSearchable={false}
									onValueChange={(option) => handleComplexChange(option)}
								/>
							</div>
							<div className="select section-select">
								<FastField
									name="section"
									component={Fields.Select}
									key={sections}
									defaultValue={get(options_section, "[0]")}
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
