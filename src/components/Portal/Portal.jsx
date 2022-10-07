import { createPortal } from "react-dom";

export const Portal = ({ targetId, children }) => {
	const targetNode = document.getElementById(targetId);
	if (!targetNode) return null;

	return createPortal(children, targetNode);
};
