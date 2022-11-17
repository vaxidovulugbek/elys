import React from "react";
import { Fields, ModalRoot, Modals } from "components";
import { useFetchList, useOverlay } from "hooks";
import { get } from "lodash";
import { useState } from "react";
import { constants } from "services";
import { InvoiceTable } from "../components/InvoiceTable";
import { uniq } from "lodash";
import { uniqBy } from "lodash";
import { InvoiceForm } from "../components/InvoiceForm";

const Invoice = () => {
	const invoiceModal = useOverlay("invoice-modal");
	const [apartmentId, setApartmentId] = useState();
	const [clientId, setClientId] = useState();
	const [statusOption, setStatusOption] = useState();
	const typeOptions = [{ value: "", label: "All" }, ...constants.typeOptions];
	const [type, setType] = useState(typeOptions);

	const invoices = useFetchList({
		url: "/transaction",
		urlSearchParams: { include: "contract,client,apartment" },
	});

	const getOptions = (optionLabel, optionValue) =>
		get(invoices, "data", []).map((item) => ({
			label: get(item, optionLabel, ""),
			value: get(item, optionValue, ""),
		}));

	const apartments = uniqBy(getOptions("apartment.name.uz", "apartment.id"), "value");
	const clients = uniqBy(getOptions("client.first_name", "client.id"), "value");

	const onEdit = (row) => {
		invoiceModal.handleOverlayOpen();
	};

	return (
		<>
			<div className="filters d-flex">
				<Fields.StaticSelect
					options={apartments}
					placeholder="Select"
					value={apartments[0]}
					onChange={setApartmentId}
				/>
				<Fields.StaticSelect
					options={clients}
					placeholder="Select"
					value={clients[0]}
					onChange={setClientId}
				/>
				<Fields.StaticSelect
					options={constants.payedStatusOptions}
					placeholder="Select"
					value={constants.payedStatusOptions[0]}
					onChange={setStatusOption}
				/>
				<Fields.StaticSelect
					options={typeOptions}
					placeholder="Select"
					value={type[0]}
					onChange={setType}
				/>
			</div>
			<InvoiceTable items={invoices.data} modal={invoiceModal} onEdit={onEdit} />
			<InvoiceForm modal={invoiceModal} data={[]} />
		</>
	);
};

export default Invoice;
