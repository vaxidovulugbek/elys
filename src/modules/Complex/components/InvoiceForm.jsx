import { Fields, ModalRoot, Modals } from "components";
import { useFetchOne } from "hooks";
import { get } from "lodash";
import React, { useEffect } from "react";

export const InvoiceForm = ({ modal, data }) => {
	console.log(data, "data");
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
				onClose={() => {}}
				onSuccess={() => {}}
				title={"Update Transaction"}
			/>
		</ModalRoot>
	);
};
