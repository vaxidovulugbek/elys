import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { isArray, isString } from "lodash";

export const ControlLabel = ({ label }) => {
	const { t } = useTranslation();

	return (
		<>
			{label && (
				<span className="form-label">
					{isArray(label)
						? label.map((item, index) => (
								<React.Fragment key={index}>
									{isString(item) ? t(item) : item}
								</React.Fragment>
						  ))
						: t(label)}
				</span>
			)}
		</>
	);
};

ControlLabel.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
