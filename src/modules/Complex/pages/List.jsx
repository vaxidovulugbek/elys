import React from "react";
import { useNavigate } from "react-router-dom";

import { AddObject, ObjectCard, PageHeading } from "components";
import { SearchForm } from "./../components/SearchForm";
import Containers from "containers";

const List = () => {
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title="My complex"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My Complex" },
				]}
			/>
			<SearchForm onClick={() => navigate("/complex/create")} />
			<div className="row">
				<Containers.List url="/complex">
					{({ data }) => {
						return (
							<>
								{Array.isArray(data) &&
									data.map((item, index) => {
										return (
											<div
												className="col-4"
												style={{ marginBottom: "20px" }}
												key={index}
											>
												<ObjectCard data={item} key={index} />
											</div>
										);
									})}
							</>
						);
					}}
				</Containers.List>

				<div className="col-4">
					<AddObject
						onClick={() => navigate("/complex/create")}
						src={require("assets/images/object-add.png")}
					/>
				</div>
			</div>
		</>
	);
};

export default List;
