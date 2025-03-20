import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import { useAppData } from "src/utils";
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
	const { safeTop, safeBottom } = useAppData();
	const jsx = (
		<div
			className={classNames(
				"gg-modal",
				{ "gg-modal_open": open },
				className,
			)}
		>
			<div
				className="gg-modal__content"
				style={{ top: safeTop, bottom: safeBottom }}
			>
				{children}
			</div>
		</div>
	);
	if (disablePortal) {
		return jsx;
	}
	return createPortal(jsx, document.body);
};
