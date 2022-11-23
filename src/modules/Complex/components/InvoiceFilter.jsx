import { Fields } from "components";
import React from "react";
import { constants } from "services";

export const InvoiceFilter = ({
	apartments,
	clients,
	setApartmentOption,
	setClientOption,
	setPaymentTypeOption,
	setStatusOption,
	apartmentOption,
	clientOption,
	statusOption,
	paymentTypeOption,
	rangeDate,
	setRangeDate,
}) => {
	return (
		<div className="filters d-flex gap mb-3">
			<Fields.RangeDatePicker
				values={rangeDate}
				onChange={setRangeDate}
				label="Date (From ~ To)"
			/>
			<Fields.StaticSelect
				options={apartments}
				placeholder="Select"
				value={apartmentOption}
				onChange={setApartmentOption}
				label="Apartments"
			/>
			<Fields.StaticSelect
				options={clients}
				placeholder="Select"
				value={clientOption}
				onChange={setClientOption}
				label="Clients"
			/>
			<Fields.StaticSelect
				options={[{ value: null, label: "All" }, ...constants.payedStatusOptions]}
				placeholder="Select"
				value={statusOption}
				onChange={setStatusOption}
				label="Statuses"
			/>
			<Fields.StaticSelect
				options={[{ value: null, label: "All" }, ...constants.paymentTypeOptions]}
				placeholder="Select"
				value={paymentTypeOption}
				onChange={setPaymentTypeOption}
				label="Payment types"
			/>
		</div>
	);
};
