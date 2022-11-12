import React from "react";
import { Button } from "components/Button/Button";
import Fields from "components/Fields";
import Containers from "containers";
import { FastField } from "formik";
import { get } from "lodash";

export const BuildingsPicker = ({ link, filter, close, setPathId }) => {
	const handleSubmit = (id) => {
		setPathId(id);
		close();
	};
	return (
		<Containers.Form fields={[{ name: "path_id" }]}>
			{({ values }) => (
				<>
					{console.log(values, "values")}
					<FastField
						name="path_id"
						component={Fields.AsyncSelect}
						urlSearchParams={() => ({
							filter,
						})}
						defaultOptions={{ label: "Nothing", value: " " }}
						url={link}
						label="Select"
						optionLabel="name.uz"
					/>
					<div className="bottom-buttons d-flex align-items-center justify-content-center">
						<Button
							className="btn btn_outlined"
							innerText="Cancel"
							type="reset"
							onClick={close}
						/>
						<Button
							className="btn btn_green"
							innerText="Save"
							type="button"
							onClick={() => handleSubmit(get(values, "path_id.value"))}
						/>
					</div>
				</>
			)}
		</Containers.Form>
	);
};
