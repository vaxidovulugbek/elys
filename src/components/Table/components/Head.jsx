import React from "react";
import { get, isFunction } from "lodash";
import { useTranslation } from "react-i18next";

export const Head = ({
	columns,
	deleteAction,
	editAction,
	viewAction,
	checkAction,
	renderButtons,
}) => {
	const { t } = useTranslation();
	return (
		<thead>
			<tr>
				{columns.map((col, index) => (
					<th
						key={index}
						className={`table__th ${get(col, "className")}`}
						onClick={isFunction(col.onHeadClick) ? () => col.onHeadClick(col) : null}
					>
						{t(get(col, "title"))}
					</th>
				))}
				{(editAction || deleteAction || renderButtons) && <th className="table__th"></th>}
			</tr>
		</thead>
	);
};
