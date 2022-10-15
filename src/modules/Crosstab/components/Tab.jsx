import React from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import { ReactComponent as Grid } from "assets/images/grid.svg";
import { ReactComponent as Plan } from "assets/images/plan.svg";
import { ReactComponent as Click } from "assets/images/click.svg";
import { ReactComponent as Justify } from "assets/images/justify.svg";
import { ReactComponent as Search } from "assets/images/search.svg";
import { ReactComponent as Rotate } from "assets/images/rotate.svg";

export const Tab = ({ setCurrentTab, currentTab, setHasFilter, hasFilter, params }) => {
	const { t } = useTranslation();
	const changeTab = (id) => {
		setCurrentTab(id);
	};

	return (
		<div className="tab" id="tab">
			<div className="left">
				<button
					className="filter-btn open-filter"
					onClick={() => setHasFilter(true)}
					style={{ display: hasFilter ? "none" : "flex" }}
				>
					<Search />
					<p>{t("Apartment filter")}</p>
				</button>
				{!isEmpty(params) && (
					<button
						className="filter-btn clear-filter"
						onClick={() => window.clearFilter()}
					>
						<Rotate />
						<p>{t("Сбросить фильтр")}</p>
					</button>
				)}
			</div>
			<div className="right">
				<button
					className={currentTab === 1 ? "active-tab" : ""}
					href="crosstab-chess.html"
					onClick={() => changeTab(1)}
				>
					<Grid />
					<p>{t("Crosstab")}</p>
				</button>
				<button
					className={currentTab === 2 ? "active-tab" : ""}
					href="crosstab-rooms.html"
					onClick={() => changeTab(2)}
				>
					<Plan />
					<p>{t("Plans")}</p>
				</button>
				<button
					className={currentTab === 3 ? "active-tab" : ""}
					href="crosstab-interactive.html"
					onClick={() => changeTab(3)}
				>
					<Click />
					<p>{t("Interactive")}</p>
				</button>
				<button
					className={currentTab === 4 ? "active-tab" : ""}
					href="crosstab-list.html"
					onClick={() => changeTab(4)}
				>
					<Justify />
					<p>{t("List")}</p>
				</button>
				<button onClick={() => setHasFilter((prev) => !prev)}>
					<Search />
					<p>{t("Фильтр")}</p>
				</button>
			</div>
		</div>
	);
};
