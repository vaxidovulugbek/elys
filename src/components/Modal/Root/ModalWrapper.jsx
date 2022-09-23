import React, { useRef } from "react";

import cn from "classnames";

import { constants } from "services";

export const ModalWrapper = ({ children, isOpen, className, style }) => {
	const modalWrapper = useRef();
	if (modalWrapper.current && isOpen) modalWrapper.current.scrollTo(0, 0);

	const handleFocus = (event) => {
		const focusableElements = modalWrapper.current.querySelectorAll(
			"a[href], button, textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select"
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.keyCode === constants.KEYCODE_TAB) {
			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					event.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus();
					event.preventDefault();
				}
			}
		}
	};

	return (
		<div
			className={cn("modal__wrapper", className, {
				modal_open: isOpen,
			})}
			style={style}
			ref={modalWrapper}
			onKeyDown={handleFocus}
		>
			{isOpen && children}
		</div>
	);
};
