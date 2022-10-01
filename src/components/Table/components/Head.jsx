import React from "react";
import { get, isFunction } from "lodash";

export const Head = ({ columns, deleteAction, editAction, renderButtons }) => {
	return (
		<thead>
			<tr>
				{columns.map((col, index) => (
					<th
						key={index}
						className={`table__th ${get(col, "className")}`}
						onClick={isFunction(col.onHeadClick) ? () => col.onHeadClick(col) : null}
					>
						{get(col, "title")}
					</th>
				))}
				{(editAction || deleteAction || renderButtons) && <th className="table__th"></th>}
			</tr>
		</thead>
	);
};