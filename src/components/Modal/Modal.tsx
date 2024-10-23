import classNames from "classnames";
import React from "react";
import "./Modal.css";

type ModalProps = React.PropsWithChildren<{
  className?: string;
  open?: boolean;
}>;

export const Modal: React.FC<ModalProps> = ({ className, open, children }) => {
  return (
    <div className={classNames("gg-modal", { open }, className)}>
      {children}
    </div>
  );
};
