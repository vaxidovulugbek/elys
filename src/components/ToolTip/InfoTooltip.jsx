import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import "./InfoTooltip.scss";

export const InfoTooltip = ({ children, id, effect = "solid" }) => {
	return (
		<>
			<ReactTooltip id={id} effect={effect}>
				{children}
			</ReactTooltip>
		</>
	);
};

InfoTooltip.propTypes = {
	effect: PropTypes.string,
	id: PropTypes.string,
};
