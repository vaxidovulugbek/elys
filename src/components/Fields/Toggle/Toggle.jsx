import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Toggle.scss";

export const Toggle = ({ className = "", label = "", isOn = false, onValueChange, ...props }) => {
	const classNames = cn("switch", className);
	const [checked, setChecked] = useState(isOn);

	const handleChange = (event) => {
		const newVal = event.target.checked;
		setChecked(newVal);
		onValueChange && onValueChange(newVal);
	};

	useEffect(() => {
		setChecked(isOn);
	}, [isOn]);

	return (
		<div className={classNames}>
			<label className="switch__label">
				<input
					type="checkbox"
					hidden
					checked={checked}
					onChange={handleChange}
					{...props}
				/>
				<div className="switch__checkmark">
					<div className="switch__ticket"></div>
				</div>
			</label>
			{label && <span className="control__text">{label}</span>}
		</div>
	);
};

Toggle.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	field: PropTypes.object,
	form: PropTypes.object,
};
