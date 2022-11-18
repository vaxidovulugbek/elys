import React from "react";
import { FastField } from "formik";

import { Button } from "components/Button/Button";
import Containers from "containers";
import { useTranslation } from "react-i18next";

export const AddObject = ({
	onClose,
	onSuccess,
	id = null,
	onError,
	title,
	fields,
	formFields = [],
	url = "",
	method = "post",
	modal,
	submitText = "Add",
	isFormData,
	...props
}) => {
	const { t } = useTranslation();
	return (
		<>
			<Containers.Form
				url={url}
				method={method}
				fields={formFields}
				isFormData={isFormData}
				className="row g-3"
				onSuccess={() => {
					onSuccess();
				}}
				onError={() => {
					onError();
				}}
			>
				{({ errors, values, isLoading, resetForm, isSubmitting }) => (
					<>
						<div className="modal__heading d-flex align-items-center justify-content-between">
							<h2 className="modal__title">{t(title)}</h2>
							<button
								type="reset"
								className="close"
								onClick={() => {
									onClose();
									resetForm();
								}}
							>
								×
							</button>
						</div>
						{fields.map((field, idx) => (
							<div className="col-12" key={idx}>
								<FastField {...field} key={idx} />
							</div>
						))}

						<div className="modal__btns d-flex align-items-center justify-content-end">
							<Button
								onClick={() => {
									onClose();
								}}
								innerText="Close"
								className="btn btn_outlined"
								type="reset"
							/>
							<Button
								innerText={submitText}
								className="btn btn_green"
								type="submit"
								isLoading={isSubmitting}
								isDisabled={isLoading}
							/>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};
