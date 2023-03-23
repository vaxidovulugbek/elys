import React from "react";
import { Button, Spinner } from "components";
import { get, isFunction } from "lodash";
import cn from "classnames";
import { ReactComponent as EditIcon } from "assets/images/edit-icon.svg";
import { ReactComponent as ViewIcon } from "assets/images/eye.svg";
import { ReactComponent as CheckIcon } from "assets/images/check.svg";
import { ReactComponent as CancelIcon } from "assets/images/close-icon.svg";
import { useSelector } from "react-redux";
import { constants } from "services";

export const InvoiceTable = ({
	items,
	columns,
	editAction,
	rowKey = "id",
	viewAction,
	checkAction,
	cancelAction,
	onRowClick,
	isLoading = false,
}) => {
	const userRole = useSelector((state) => state.auth.role);

	return (
		<>
			<table className="table">
				<Head
					columns={columns}
					editAction={editAction}
					viewAction={viewAction}
					checkAction={checkAction}
					cancelAction={cancelAction}
				/>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan="100%">
								<Spinner className="table-spinner" />
							</td>
						</tr>
					) : !items.length ? (
						<tr>
							<td colSpan="100%">{/*<NoData />*/}</td>
						</tr>
					) : (
						items.map((row, index) => (
							<TableRow
								key={row[rowKey]}
								row={row}
								columns={columns}
								viewAction={viewAction}
								checkAction={userRole === constants.ROLE_ACCOUNTANT && checkAction}
								editAction={userRole === constants.ROLE_ACCOUNTANT && editAction}
								cancelAction={
									userRole === constants.ROLE_ACCOUNTANT && cancelAction
								}
								onRowClick={onRowClick}
								index={index}
							/>
						))
					)}
				</tbody>
			</table>
		</>
	);
};

const TableRow = ({
	editAction,
	viewAction,
	checkAction,
	cancelAction,
	row,
	columns,
	onRowClick,
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

			{(editAction || viewAction || checkAction || cancelAction) && (
				<td className="table__td">
					<div className="d-flex align-items-center justify-content-center">
						{isFunction(editAction) && (
							<Button
								className="table__action border_radius"
								onClick={() => editAction(row)}
								append={<EditIcon />}
							/>
						)}

						{isFunction(checkAction) && (
							<Button
								className="table__action border_radius"
								onClick={(event) => checkAction(row.id, row.payment_type)}
								append={<CheckIcon fill="#5fbeaa" />}
							/>
						)}
						{isFunction(cancelAction) && (
							<Button
								className="table__action border_radius"
								onClick={(event) => cancelAction(row.id)}
								append={<CancelIcon width={20} height={20} fill="#dc3545" />}
							/>
						)}
						{isFunction(viewAction) && (
							<Button
								className="table__action border_radius"
								onClick={(event) => viewAction(row)}
								append={<ViewIcon fill="#5fbeaa" stroke="#5fbeaa" />}
							/>
						)}
					</div>
				</td>
			)}
		</tr>
	);
};

const Head = ({ columns, editAction, viewAction, checkAction }) => {
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
				{(editAction || viewAction || checkAction) && <th className="table__th"></th>}
			</tr>
		</thead>
	);
};
