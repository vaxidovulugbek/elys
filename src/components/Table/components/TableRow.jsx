import React from "react";
import { get, isFunction } from "lodash";
import cn from "classnames";

import { Button } from "components/index";

import { ReactComponent as DeleteIcon } from "assets/images/delete-icon.svg";
import { ReactComponent as EditIcon } from "assets/images/edit-icon.svg";
import { ReactComponent as ViewIcon } from "assets/images/eye.svg";
import { ReactComponent as CheckIcon } from "assets/images/check.svg";

export const TableRow = ({
	row,
	columns,
	deleteAction,
	editAction,
	viewAction,
	checkAction,
	onRowClick,
	renderButtons,
	index,
}) => {
	return (
		<tr
			className={cn("main-table-tr", { cursor_pointer: onRowClick })}
			onClick={() => {
				onRowClick && onRowClick(row);
			}}
		>
			{columns.map((col, innerIndex) => {
				return (
					<td key={innerIndex} className={`table__td ${get(col, "className")}`}>
						{col.render(get(row, col.dataKey), row, index)}
					</td>
				);
			})}

			{(editAction || deleteAction || viewAction || checkAction || renderButtons) && (
				<td className="table__td">
					<div className="d-flex align-items-center justify-content-center">
						{isFunction(renderButtons) && renderButtons(row)}

						{isFunction(editAction) && (
							<Button
								className="table__action border_radius"
								onClick={() => editAction(row)}
								append={<EditIcon />}
							/>
						)}

						{isFunction(deleteAction) && (
							<Button
								className="table__action border_radius"
								onClick={(event) => deleteAction(event, row)}
								append={<DeleteIcon />}
							/>
						)}
						{isFunction(viewAction) && (
							<Button
								className="table__action border_radius"
								onClick={(event) => viewAction(event, row)}
								append={<ViewIcon fill="#5fbeaa" stroke="#5fbeaa" />}
							/>
						)}
						{isFunction(checkAction) && (
							<Button
								className="table__action border_radius"
								onClick={(event) => checkAction(event, row)}
								append={<CheckIcon fill="#5fbeaa" stroke="#5fbeaa" />}
							/>
						)}
					</div>
				</td>
			)}
		</tr>
	);
};
