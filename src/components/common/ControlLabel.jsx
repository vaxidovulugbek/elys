import React from "react";
import { isArray } from "lodash";
import PropTypes from "prop-types";

export const ControlLabel = ({ label }) => {
	return (
		<>
			{label && (
				<span className="form-label">
					{isArray(label)
						? label.map((item, index) => (
								<React.Fragment key={index}>{item}</React.Fragment>
						  ))
						: label}
				</span>
			)}
		</>
	);
};

ControlLabel.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
