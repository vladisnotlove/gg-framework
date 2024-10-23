import classNames from "classnames";
import React from "react";
import "./Button.css";

export type ButtonProps = React.PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}>;

export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  disabled,
  fullWidth,
  children,
}) => {
  return (
    <button
      className={classNames(
        "gg-button",
        { disabled, ["full-width"]: fullWidth },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
