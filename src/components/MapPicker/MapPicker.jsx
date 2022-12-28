import React from "react";

import { useOverlay } from "hooks";

import { Modals, ModalRoot } from "components";
import { ControlError, ControlLabel } from "components/common";
import { useTranslation } from "react-i18next";
import { useModalWithHook } from "hooks/useModalWithHook";

export const MapPicker = ({ label, placeholder, btnText, field, form }) => {
	const modal = useModalWithHook();
	const { t } = useTranslation();

	return (
		<>
			<div className="col-12">
				<div className="form-wrapper">
					<ControlLabel label={label} />

					<div className="d-flex">
						<label className="form-control cursor_text">
							<input
								type="text"
								placeholder={placeholder}
								className="form-control__input"
								{...field}
							/>
						</label>
						<button
							type="button"
							className="btn btn_form"
							onClick={modal.handleOverlayOpen}
						>
							{t(btnText)}
						</button>
					</div>

					<ControlError form={form} field={field} />
				</div>
			</div>

			<ModalRoot
				isOpen={modal.isOpen}
				style={{
					left: "50px",
					right: "50px",
					maxWidth: "none",
					width: "auto",
					margin: "0",
					transform: "translate(0, 40px)",
				}}
				activeClassName="modal_open_map"
			>
				<Modals.MapModal
					onClose={modal.handleOverlayClose}
					coordinates={field.value?.split(",  ")}
					onPlaceChange={(coordinates) => {
						form.setFieldValue(field.name, coordinates.join(",  "));
						form.setFieldValue("lat", coordinates[0]);
						form.setFieldValue("lon", coordinates[1]);
					}}
				/>
			</ModalRoot>
		</>
	);
};
