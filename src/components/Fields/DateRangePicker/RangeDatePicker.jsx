import { Button } from "components/Button/Button";
import { ControlLabel } from "components/common";
import DatePicker from "react-multi-date-picker";
import "./DatePicker.scss";

export const RangeDatePicker = ({ values, onChange, label }) => {
	const onClear = () => {
		onChange(null);
	};
	return (
		<>
			<div className="range-picker">
				<ControlLabel label={label} />
				<div className="d-flex align-items-center">
					<DatePicker
						value={values}
						onChange={onChange}
						range
						placeholder="2022/11/17 ~ 2022/11/25"
					/>
					<Button innerText={"x"} onClick={onClear} className="btn btn_green" />
				</div>
			</div>
		</>
	);
};
