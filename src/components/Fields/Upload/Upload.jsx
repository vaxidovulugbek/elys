import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import cn from "classnames";
import { get } from "lodash";

import { ControlLabel } from "components/common";
import { httpCLient } from "services";
import { useTranslation } from "react-i18next";

export const Upload = ({
	label,
	hasDelete = false,
	imgLabel,
	btnText,
	placeholder,
	hasBtnIcon = true,
	imgSrc,
	field,
	form,
	className,
	imgClick = null,
	accept = "image/*",
	imageTitle,
}) => {
	const classNames = cn("form-wrapper form_disabled", className);
	const imgBlock = cn("form-wrapper", { max__content: hasDelete });

	const { t } = useTranslation();

	const [image, setImage] = useState(imgSrc);
	const [loading, setLoading] = useState(false);

	const handleFileUpload = async (event) => {
		// form.setFieldValue(field.name, event.target.files[0]);
		setImage(event.target.files[0]);
	};

	useEffect(() => {
		return () => {
			if (image !== imgSrc) URL.revokeObjectURL(image);
			setImage("");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (image) {
			const uploadFile = async () => {
				const formData = new FormData();
				formData.append("files", image);
				setLoading(true);
				const res = await httpCLient.post("file", formData);
				form.setFieldValue(field.name, res?.data[0]?.data.id);
				setLoading(false);
			};
			uploadFile();
		}
	}, [image]);

	return (
		<>
			<div className={classNames}>
				<ControlLabel label={label} />

				<div className="d-flex">
					<label className="form-control cursor_text">
						<input
							disabled={true}
							className="form-control__input"
							type="text"
							value={get(image, "name") || imageTitle}
							placeholder={t(placeholder)}
						/>
					</label>
					<label className="btn btn_form cursor_pointer">
						{hasBtnIcon && (
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
							</svg>
						)}
						<input
							type="file"
							hidden={true}
							onChange={handleFileUpload}
							accept={accept}
						/>
						{loading ? t("Loading...") : t(btnText)}
					</label>
				</div>
			</div>

			<div
				onClick={
					imgClick &&
					(() => imgClick(image !== imgSrc ? image && URL.createObjectURL(image) : image))
				}
				className={imgBlock}
			>
				{imgLabel && <ControlLabel label={imgLabel} />}

				{imgSrc && (
					<img
						src={image !== imgSrc ? image && URL.createObjectURL(image) : image}
						style={{
							width: "100%",
							maxWidth: "200px",
							maxHeight: "200px",
							objectFit: "cover",
						}}
						alt="uploadedImage"
					/>
				)}

				{hasDelete && (
					<div className="d-flex align-items-center object__btns">
						<button className="object__action bg_red">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xlink="http://www.w3.org/1999/xlink"
								version="1.1"
								id="Capa_1"
								x="0px"
								y="0px"
								viewBox="0 0 32.526 32.526"
								space="preserve"
								crosspilot=""
							>
								<polygon
									className="st0"
									points="32.526,2.828 29.698,0 16.263,13.435 2.828,0 0,2.828 13.435,16.263 0,29.698 2.828,32.526 16.263,19.091   29.698,32.526 32.526,29.698 19.091,16.263 "
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
		</>
	);
};

Upload.propTypes = {
	label: PropTypes.string,
	imgLabel: PropTypes.string,
	btnText: PropTypes.string,
	placeholder: PropTypes.string,
	hasBtnIcon: PropTypes.bool,
	imgSrc: PropTypes.string,
};
