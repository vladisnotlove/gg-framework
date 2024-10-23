import classNames from "classnames";
import React from "react";
import coinImg from "./coin.png";
import "./Chips.css";

type ChipsProps = {
  className?: string;
  value?: number;
  size?: "medium" | "big";
};

export const Chips: React.FC<ChipsProps> = ({ className, value, size }) => {
  return (
    <div className={classNames("gg-chips", size, className)}>
      <img className="gg-chips__icon" src={coinImg} alt="" />
      {value}
    </div>
  );
};
