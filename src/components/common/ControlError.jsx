import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { get } from "lodash";

export const ControlError = ({ form, field }) => {
	const { t } = useTranslation();

	return (
		<>
			{form && get(form.touched, field.name) && get(form.errors, field.name) && (
				<span className="form-error">{t(get(form.errors, field.name))}</span>
			)}
		</>
	);
};

ControlError.propTypes = {
	form: PropTypes.object,
	field: PropTypes.object,
};
