import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import { Button } from "components";

import { ReactComponent as LeftArrow } from "assets/images/arrow-left.svg";
import { ReactComponent as RightArrow } from "assets/images/arrow-right.svg";

import "./ListPagination.scss";

export const ListPagination = ({
	pageCount = 10,
	currentPage,
	className = "list__pagination",
	onPageChange,
}) => {
	const handlePageChange = (page) => {
		onPageChange && onPageChange(page);
	};
	return (
		<div className={className}>
			<ReactPaginate
				pageCount={pageCount}
				initialPage={currentPage}
				disableInitialCallback={true}
				previousLabel={
					<Button
						className="pagination__control"
						prepend={<LeftArrow />}
						innerText="Prev"
					/>
				}
				nextLabel={
					<Button
						className="pagination__control"
						append={<RightArrow />}
						innerText="Next"
					/>
				}
				containerClassName="pagination"
				pageLinkClassName="pagination__link"
				activeLinkClassName="pagination__link_active"
				breakLinkClassName="pagination__link"
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={(data) => handlePageChange(data.selected)}
			/>
		</div>
	);
};

ListPagination.propTypes = {
	limit: PropTypes.number,
	pageCount: PropTypes.number,
	perPage: PropTypes.number,
	currentPage: PropTypes.number,
	className: PropTypes.string,
	handlePageClick: PropTypes.func,
};
