import React from "react";

import TreeNode from "./TreeNode";

const Tree = ({ data = [], state, setState, cb, parentIndex }) => {
	return (
		<div className="tree">
			{data.map((item, index) => {
				return (
					<TreeNode
						{...{ data: item, cb, state, setState }}
						key={index}
						index={index}
						parentIndex={parentIndex}
					/>
				);
			})}
		</div>
	);
};

export default Tree;
