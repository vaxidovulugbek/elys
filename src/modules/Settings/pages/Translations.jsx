import React from "react";
import { Button, PageHeading, Table } from "components";
import { useNavigate } from "react-router-dom";

const Translations = () => {
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title="Translations"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Translations" },
				]}
			/>

			<Table
				columns={[
					{
						title: "ID",
						dataKey: "id",
						render: (value) => value,
					},
					{
						title: "Source",
						dataKey: "source",
						render: (value) => value,
					},
					{
						title: "Uz",
						dataKey: "uz",
						render: (value) => <input type="text" defaultValue={value} />,
					},
					{
						title: "Ru",
						dataKey: "ru",
						render: (value) => <input type="text" defaultValue={value} />,
					},
					{
						title: "En",
						dataKey: "en",
						render: (value) => <input type="text" defaultValue={value} />,
					},
				]}
				deleteAction={() => {}}
				items={[
					{
						id: 1,
						source: "Test1",
						uz: "Test1",
						ru: "Test1",
						en: "Test1",
					},
					{
						id: 2,
						source: "Test2",
						uz: "Test2",
						ru: "Test2",
						en: "Test2",
					},
					{
						id: 3,
						source: "Test3",
						uz: "Test3",
						ru: "Test3",
						en: "Test3",
					},
					{
						id: 4,
						source: "Test4",
						uz: "Test4",
						ru: "Test4",
						en: "Test4",
					},
				]}
			/>

			<div className="bottom-buttons">
				<hr />
				<div className="d-flex align-items-center justify-content-center">
					<Button
						className="btn btn_outlined"
						type="reset"
						innerText="Cancel"
						onClick={() => navigate("/", { replace: true })}
					/>
					<Button className="btn btn_green" type="submit" innerText="Save" />
				</div>
			</div>
		</>
	);
};

export default Translations;
