import React from "react";
import { Button } from "components/Button/Button";
import { FastField } from "formik";

import Containers from "containers";

export const AddObject = ({
	onClose,
	onSuccess,
	id = null,
	onError,
	title,
	fields,
	type,
	formFields = [],
	url = "",
	method = "post",
	modal,
	submitText = "Add",
	...props
}) => {
	return (
		<>
			<Containers.Form
				url={url}
				method={method}
				fields={formFields}
				className="row"
				onSuccess={(_, { resetForm }) => {
					onSuccess();
					resetForm();
				}}
				onError={() => {
					onError();
				}}
			>
				{({ errors, values, setFormikState, resetForm, isLoading }) => (
					<>
						<div className="modal__heading d-flex align-items-center justify-content-between">
							<h2 className="modal__title">{title}</h2>
							<button
								type="reset"
								className="close"
								onClick={() => {
									setFormikState({});
									onClose();
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
									resetForm();
								}}
								innerText="Close"
								className="btn btn_outlined"
								type="reset"
							/>
							<Button
								innerText={submitText}
								className="btn btn_green"
								type="submit"
								isDisabled={isLoading}
							/>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};
