import React, { useState } from "react";

import Tree from "./components/Tree";

import "./TreeCheckbox.scss";

const treeData = [
	{
		title: "Object 1",
		children: [
			{
				title: "Building 1",
				children: [
					{
						title: "Section 1",
					},
					{
						title: "Section 2",
					},
					{
						title: "Section 3",
					},
				],
			},
		],
	},
	{
		title: "Object 2",
		children: [
			{
				title: "Building 1",
				children: [
					{
						title: "Section 1",
					},
					{
						title: "Section 2",
					},
					{
						title: "Section 3",
					},
				],
			},
			{
				title: "Building 2",
				children: [
					{
						title: "Section 1",
					},
					{
						title: "Section 2",
					},
					{
						title: "Section 3",
					},
				],
			},
		],
	},
];

export const TreeCheckbox = () => {
	const [state, setState] = useState(treeData);

	const cb = (newData) => {
		setState(newData);
	};

	return (
		<div className="tree-checkbox">
			<Tree {...{ data: treeData, state, setState, cb, parentIndex: [] }} />
		</div>
	);
};

TreeCheckbox.propTypes = {};
