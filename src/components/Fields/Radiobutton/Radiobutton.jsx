import React from "react";
import PropTypes from "prop-types";

import "./Radiobutton.scss";

export const Radiobutton = ({ label, value, field, form }) => {
	return (
		<label className="radio cursor_pointer">
			<div className="radio__label">
				<input className="radio__input" {...field} type="radio" value={value} />
				<span className="radio__checkmark">
					<span className="radio__checkmark-inner"></span>
				</span>
			</div>

			<span className="form-label">{label}</span>
		</label>
	);
};

Radiobutton.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	field: PropTypes.object,
	form: PropTypes.object,
};
