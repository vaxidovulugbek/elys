import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { isFunction } from "lodash";
import { serialize } from "object-to-formdata";

import { httpCLient, utils } from "services";

export const FormContainer = ({
	url,
	method,
	children,
	isFormData = false,
	fields = [],
	axiosConfig = {},
	normalizeFormData,
	onSuccess = () => {},
	onError = () => {},
	onFinal = () => {},
	...formProps
}) => {
	const { initialValues, validationSchema } = utils.formHelpers.createFormSchema(fields);

	const handleSubmit = (values, formHelpers) => {
		const formValues = isFormData
			? serialize(utils.formHelpers.mapFormValues(values, fields))
			: utils.formHelpers.mapFormValues(values, fields);

		const requestUrl = isFunction(url) ? url(formValues) : url;

		httpCLient[method](
			requestUrl,
			isFunction(normalizeFormData) ? normalizeFormData(values) : formValues,
			axiosConfig
		)
			.then(({ data }) => onSuccess(data, formHelpers))
			.catch((error) => onError(error, formHelpers))
			.finally(onFinal);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			enableReinitialize={true}
		>
			{(formik) => <Form {...formProps}>{children(formik)}</Form>}
		</Formik>
	);
};

FormContainer.propTypes = {
	url: PropTypes.string,
	method: PropTypes.oneOf(["post", "put"]),
	children: PropTypes.any,
	isFormData: PropTypes.bool,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.any,
			validationType: PropTypes.string,
			validations: PropTypes.array,
			submitKey: PropTypes.string,
			onSubmitValue: PropTypes.func,
		})
	),
	axiosConfig: PropTypes.object,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	onFinal: PropTypes.func,
	normalizeFormData: PropTypes.func,
};

/*

    yupValidation = string | number | boolean | date | object | array

    Field Object Structure
        name: String,
        value: Any,
        validationType: yupValidation,
        validations: [{type: yupValidation, params: Any}]
        onSubmitKey: String
        onSubmitValue: Function

*/
