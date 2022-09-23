import React from "react";

import { toast } from "react-toastify";
import { get } from "lodash";

import { Fields, ModalRoot, Modals } from "components";

const SectionForm = ({ modal, section = {}, complexID, type }) => {
	const id = get(section, "data.id", "");
	const onSuccess = () => {
		toast.success(`Section ${id ? "update" : "create"} success`);
		modal.handleOverlayClose();
	};
	const onError = () => {
		toast.error("Something went wrong");
	};

	const onClose = () => {
		modal.handleOverlayClose();
	};

	return (
		<ModalRoot isOpen={modal.isOpen} style={{ maxWidth: "500px" }}>
			<Modals.AddObject
				url={`section${id && `/${id}`}`}
				method={id ? "put" : "post"}
				onClose={onClose}
				onAdd={() => {}}
				title={`${type} a Section`}
				type={type}
				onSuccess={onSuccess}
				onError={onError}
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Section Name EN", <span>*</span>],
						placeholder: "Name",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Section Name RU", <span>*</span>],
						placeholder: "Name",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Section Name UZ", <span>*</span>],
						placeholder: "Name",
					},
				]}
				formFields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
						value: get(section, "data.name"),
					},
					{
						name: "complex_id",
						validationType: "number",
						value: Number(complexID),
					},
				]}
			/>
		</ModalRoot>
	);
};

export default SectionForm;
