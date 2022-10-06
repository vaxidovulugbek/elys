import React from "react";
import { FastField } from "formik";

import { constants } from "services";

import Containers from "containers";
import { Button, ModalRoot, Fields } from "components";

export const TariffAdd = ({ isOpen, onClose, onSuccess, complexID }) => {
	return (
		<ModalRoot isOpen={isOpen}>
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<h2 className="modal__title">Add Tariff</h2>
				<Button type="reset" className="close" append={"×"} onClick={onClose} />
			</div>

			<Containers.Form
				url="/tariff"
				method="post"
				onSuccess={onSuccess}
				fields={[
					{
						name: "payment",
					},
					{
						name: "discount",
					},
					{
						name: "month_count",
					},
					{
						name: "type",
					},
					{
						name: "complex_id",
						value: complexID,
					},
				]}
				className="row g-3"
			>
				{(formik) => (
					<>
						<div className="col-12">
							<FastField
								name="payment"
								component={Fields.Input}
								label="Initial payment"
								placeholder="payment"
								onlyNumber={true}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="discount"
								component={Fields.Input}
								label="Discount"
								placeholder="discount"
								onlyNumber={true}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="month_count"
								component={Fields.Input}
								label="Duration in month"
								placeholder="duration"
								onlyNumber={true}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="type"
								component={Fields.Select}
								label="Type"
								options={constants.typeOptions}
							/>
						</div>

						<div className="modal__btns d-flex align-items-center justify-content-end">
							<Button
								innerText="Close"
								className="btn btn_outlined"
								type="reset"
								onClick={onClose}
							/>
							<Button innerText="Create" className="btn btn_green" type="submit" />
						</div>
					</>
				)}
			</Containers.Form>
		</ModalRoot>
	);
};
