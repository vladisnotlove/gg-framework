import classNames from "classnames";
import React from "react";

type GameScreenProps = React.PropsWithChildren<{
  className?: string;
  active?: boolean;
}>;

export const GameScreen: React.FC<GameScreenProps> = ({
  className,
  active,
  children,
}) => {
  return (
    <div className={classNames("gg-game__screen", { active }, className)}>
      {children}
    </div>
  );
};
