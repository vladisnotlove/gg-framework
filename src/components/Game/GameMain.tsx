import classNames from "classnames";
import React from "react";
import { GameScreen } from "./GameScreen";

type GameMainProps = React.PropsWithChildren<{
  className?: string;
  active?: boolean;
}>;

export const GameMain: React.FC<GameMainProps> = ({
  className,
  active,
  children,
}) => {
  return (
    <GameScreen
      className={classNames("gg-game-main", className)}
      active={active}
    >
      {children}
    </GameScreen>
  );
};
