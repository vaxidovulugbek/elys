import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Breadcrumb.scss";

export const Breadcrumb = ({ links = [], className = "" }) => {
	const classNames = cn("breadcrumb", className);
	return (
		<div className={classNames}>
			{links.map((link, index) => {
				if (index !== links.length - 1)
					return (
						<React.Fragment key={index}>
							<Link to={link.url} className="breadcrumb__link">
								{link.name}
							</Link>
							<img
								src={require("assets/images/angle-right.svg").default}
								alt="breadcrumb-separator"
								className="breadcrumb__separator"
							/>
						</React.Fragment>
					);

				return (
					<span key={index} className="breadcrumb__link">
						{link.name}
					</span>
				);
			})}
		</div>
	);
};

Breadcrumb.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string,
			name: PropTypes.string,
		})
	),
	className: PropTypes.string,
};
