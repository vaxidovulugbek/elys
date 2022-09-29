import React from "react";

import { Button, Typography } from "components/index";

export const NoData = () => {
	return (
		<div className="table-no-data">
			<div className="d-flex align-items-center table-no-data__inner">
				<div className="table-no-data__left">
					<Typography
						Type="h3"
						className="table-no-data__title"
						text="No records found."
					/>
					<Typography
						Type="p"
						className="color_transparent"
						text="Create a report to find our more about this project."
					/>
				</div>
				<div className="table-no-data__right">
					<Button className="btn_bg-blue btn_form " text="Create" />
				</div>
			</div>
		</div>
	);
};
