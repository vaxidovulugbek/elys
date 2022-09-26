import React from "react";
import cn from "classnames";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
import { FastField } from "formik";

import { Fields } from "components";
import Containers from "containers";

import obj from "assets/images/obj.jpg";
import { ReactComponent as Search } from "assets/images/search.svg";
import { ReactComponent as Xbtn } from "assets/images/x.svg";
import { ReactComponent as Back } from "assets/images/back.svg";

const usernames = [{ value: "1", label: "Abdulaziz Abdurashidov" }];

const sections = [
	{ value: 1, label: "Секция 1" },
	{ value: 2, label: "Секция 2" },
	{ value: 3, label: "Секция 3" },
	{ value: 4, label: "Все секции" },
];

const CrosstabHeader = ({ hasApartment, setHasApartment, setHasFilter, hasFilter }) => {
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
									component={Fields.AsyncSelect}
									defaultValue={usernames[0]}
									className="crosstab__select"
									options={usernames}
									isSearchable={false}
								/>
							</div>
							<div className="select section-select">
								<ReactSelect
									defaultValue={sections[3]}
									className="crosstab__select"
									options={sections}
									isSearchable={false}
								/>
							</div>
							<div className="search">
								<input type="text" placeholder="Поиск помещения" />
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

export default CrosstabHeader;
