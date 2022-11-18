import React from "react";
import cn from "classnames";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { findIndex, get, isArray } from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Fields } from "components";
import Containers from "containers";

import obj from "assets/images/obj.jpg";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as Back } from "assets/images/back.svg";
import { ReactComponent as Search } from "assets/images/search.svg";

export const CrosstabHeader = ({
	activeApartment,
	setActiveApartment,
	setHasFilter,
	hasFilter,
	setParams,
	params,
	sections,
	complex,
}) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const lngCode = useSelector((state) => get(state, "system.lngCode"));
	const getOptions = (data, defaultValue) => {
		const options = isArray(data)
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
	const options_section = getOptions(sections, { label: t("All sections"), value: null });

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
									placeholder={t("Premises search")}
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
				<Link to="/" className={cn("close", { invisiable: activeApartment || hasFilter })}>
					<Xbtn />
					<p className="text">{t("Close")}</p>
				</Link>
				<button
					className={cn("back", { hide: !activeApartment && !hasFilter })}
					onClick={() => {
						setHasFilter(false);
						setActiveApartment(false);
					}}
				>
					<Back />
					<p className="text">{t("Back")}</p>
				</button>
			</div>
		</header>
	);
};
