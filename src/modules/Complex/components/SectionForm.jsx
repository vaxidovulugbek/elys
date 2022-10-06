import React from "react";
import { get } from "lodash";

import { useFetchList } from "hooks";
import { notifications } from "services";

import { Fields, ModalRoot, Modals } from "components";

const SectionForm = ({ modal, section = {}, complexID, type }) => {
	const sectionList = useFetchList({
		url: "section",
		queryOptions: { enabled: false },
		urlSearchParams: { filter: { complex_id: complexID } },
	});
	const id = get(section, "data.id", "");

	const onSuccess = () => {
		notifications.success(`Section ${id ? "update" : "create"} success`);
		modal.handleOverlayClose();
		sectionList.refetch();
	};

	const onError = () => {
		notifications.error("Something went wrong");
	};

	const onClose = () => {
		modal.handleOverlayClose();
	};

	return (
		<ModalRoot isOpen={modal.isOpen} style={{ maxWidth: "500px" }}>
			<Modals.AddObject
				url={`section${id && `/${id}`}`}
				method={id ? "put" : "post"}
				isFormData={id ? false : true}
				onClose={onClose}
				onAdd={() => {}}
				title={`${type} a Section`}
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
					{
						name: "background_id",
						component: Fields.Upload,
						label: "Background",
						placeholder: "Select image",
					},
					{
						name: "svg",
						component: Fields.SvgUpload,
						label: "Svg",
						placeholder: "Select svg image",
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
					{
						name: "background_id",
						validationType: "number",
						value: get(section, "data.background_id"),
					},
					{
						name: "svg",
						value: get(section, "data.svg"),
					},
				]}
			/>
		</ModalRoot>
	);
};

export default SectionForm;
