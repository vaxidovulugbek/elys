import { Fields, ModalRoot, Modals } from "components";
import { get } from "lodash";
import React from "react";
import { notifications } from "services";

export const InvoiceForm = ({ modal, data, invoices }) => {
	return (
		<ModalRoot isOpen={modal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "amount",
						component: Fields.Input,
						label: "Amount",
						placeholder: "amount",
					},
				]}
				formFields={[
					{
						name: "amount",
						validationType: "number",
						value: get(data, "amount"),
					},
				]}
				url={`/transaction/${get(data, "id")}`}
				submitText={"Save"}
				method={"put"}
				onClose={modal.handleOverlayClose}
				onSuccess={() => {
					notifications.success("transaction is updated");
					invoices.refetch();
					modal.handleOverlayClose();
				}}
				title={"Update Transaction"}
			/>
		</ModalRoot>
	);
};
