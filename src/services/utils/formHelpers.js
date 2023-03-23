import { isArray, isFunction, isString } from "lodash";
import * as yup from "yup";

const createYupSchema = (field) => {
	const { validationType = "string", validations = [] } = field;

	let validator = yup[validationType]();

	validations.forEach(({ type, params }, index) => {
		switch (type) {
			case "typeError":
				validator = validator.typeError(params ? params : `Invalid ${validationType}`);
				break;
			case "required":
				validator = validator.required(params ? params : "Required");
				break;
			case "email":
				validator = validator.email(params ? params : "Invalid email");
				break;

			case "phone":
				validator = validator.matches(
					/(\+9{2}8 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2})/g,
					"Phone number is not valid"
				);
				break;

			case "lng":
				validator = validator.shape({
					uz: yup.string().required(),
					ru: yup.string().required(),
					en: yup.string().required(),
				});
				break;
			case "option":
				validator = validator.shape({
					value: yup.number().required(),
				});
				break;
			case "file":
				validator = validator.shape({
					File: yup.mixed().required("file is requared"),
				});
				break;
			default:
				if (isArray(params)) validator = validator[type](...params);
				else validator = validator[type](params);
				break;
		}
	});

	return validator;
};

const createFormSchema = (fields) => {
	const initialValues = {};
	const validationSchema = {};

	fields.forEach((item, index) => {
		initialValues[item.name] = item.value ? item.value : "";
		validationSchema[item.name] = createYupSchema(item);
	});

	return { initialValues, validationSchema: yup.object().shape(validationSchema) };
};

const mapFormValues = (values, fields) => {
	const formValues = {};

	fields.forEach((field, index) => {
		if (isFunction(field.onSubmitValue)) {
			if (isString(field.onSubmitKey))
				formValues[field.onSubmitKey] = field.onSubmitValue(values[field.name], values);
			else formValues[field.name] = field.onSubmitValue(values[field.name], values);
		} else formValues[field.name] = values[field.name];

		if (field.disabled) delete formValues[field.name];
	});

	return formValues;
};

export const formHelpers = {
	createFormSchema,
	mapFormValues,
};
