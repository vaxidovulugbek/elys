import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Breadcrumb, Dropdown } from "components";

export const PageHeading = ({
	title,
	links,
	hasButton = false,
	hasSettings = false,
	complexID,
	renderButtons,
}) => {
	return (
		<div className="page-heading">
			<div className="page-control">
				<h1 className="page-title">{title}</h1>
				<Breadcrumb links={links} />
			</div>
			{hasButton && (
				<Link to={`/crosstab/${complexID}`} className="btn__crosstab bg_purple">
					<span>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
						</svg>
					</span>
					<span>Crosstab</span>
				</Link>
			)}
			{hasSettings && <Dropdown />}

			{renderButtons && renderButtons()}
		</div>
	);
};

PageHeading.propTypes = {
	title: PropTypes.string,
	hasButton: PropTypes.bool,
	hasSettings: PropTypes.bool,
	renderButtons: PropTypes.func,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string,
			name: PropTypes.string,
		})
	),
};
