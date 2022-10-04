import React from "react";

import PropTypes from "prop-types";
import { get } from "lodash";

export const ControlError = ({ form, field }) => {
	return (
		<>
			{form && get(form.touched, field.name) && get(form.errors, field.name) && (
				<span className="form-error">{get(form.errors, field.name)}</span>
			)}
		</>
	);
};

ControlError.propTypes = {
	form: PropTypes.object,
	field: PropTypes.object,
};
