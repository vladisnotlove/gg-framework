import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

type ModalProps = React.PropsWithChildren<{
	className?: string;
	open?: boolean;
	disablePortal?: boolean;
}>;

export const Modal: React.FC<ModalProps> = ({
	className,
	open,
	children,
	disablePortal,
}) => {
	const jsx = (
		<div
			className={classNames(
				"gg-modal",
				{ "gg-modal_open": open },
				className,
			)}
		>
			<div className="gg-modal__content">{children}</div>
		</div>
	);
	if (disablePortal) {
		return jsx;
	}
	return createPortal(jsx, document.body);
};
