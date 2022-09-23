/* eslint-disable no-eval */
import React, { useState } from "react";
import { get } from "lodash";
import cn from "classnames";

import Tree from "./Tree";

import { ReactComponent as Building } from "assets/images/building-icon.svg";

const TreeNode = ({ data = {}, state, setState, index, cb, parentIndex }) => {
	const [branchData, setBranchData] = useState(data);

	const children = get(data, "children", false);
	const name = cn({ branch: children, leaf: !children });

	const toggleExpend = (e) => {
		e.stopPropagation();
		if (children) {
			e.target.classList.toggle("close");
			const li = e.target.parentNode;
			const ul = li.parentNode;
			ul.classList.toggle("tree-closed");
		}
	};

	// const checkAllChildren = (data) => {
	//     const newData = get(data, 'children', []).map(item=>{
	//         item.checked = true
	//         const hasChildren = get(item)

	//     })
	// }

	const handleCheck = (e) => {
		let newState = state;
		let indexTree = [...parentIndex, index];

		const evalString = setChecked(`[${indexTree.shift()}]`, indexTree);
		const isChecked = get(data, "checked", false);

		eval(`newState${evalString}`).checked = !isChecked;
		setBranchData({ ...branchData, checked: !isChecked });
		cb(newState);

		// if (children) checkAllChildren(data)
	};

	return (
		<div className={name}>
			<div className={name + "-data"}>
				<i className={cn({ arrow: children })} onClick={(e) => toggleExpend(e)}></i>
				<div className="title">
					<i
						className={cn("checkbox", { checked: get(data, "checked") })}
						onClick={(e) => handleCheck(e)}
					></i>
					<Building />
					<p>{get(data, "title")}</p>
				</div>
			</div>
			{children && (
				<Tree
					{...{
						data: children,
						state,
						setState,
						cb,
						parentIndex: [...parentIndex, index],
					}}
				/>
			)}
		</div>
	);
};

const setChecked = (str, indexList) => {
	if (indexList.length > 0) {
		return setChecked(str + `.children[${indexList.shift()}]`, indexList);
	}
	return str;
};

export default TreeNode;
