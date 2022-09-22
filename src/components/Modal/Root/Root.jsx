import React from "react";

import { Portal } from "components";
import { ModalWrapper } from "./ModalWrapper";

import "./Root.scss";

export const Root = ({ children, isOpen, className, style }) => {
	return (
		<Portal targetId="modal-root">
			<ModalWrapper isOpen={isOpen} className={className} style={style}>
				{children}
			</ModalWrapper>
		</Portal>
	);
};
