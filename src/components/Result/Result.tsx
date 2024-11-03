import classNames from "classnames";
import React from "react";
import { Modal } from "../Modal";
import { useTranslation } from "../../utils";
import { Button, ButtonProps } from "../Button";
import "./Result.css";
import coinImg from "../../assets/big-coin.png";

type ResultProps = {
	className?: string;
	open: boolean;
	onClose?: () => void;
	title?: string;
	count?: number;
	coefficient?: string;
	highScore?: boolean;
	buttonText?: string;
	buttonProps?: ButtonProps;
	backgroundImgSrc: string;
};

export const Result: React.FC<ResultProps> = ({
	className,
	open,
	onClose,
	title,
	count,
	coefficient,
	highScore,
	buttonText,
	buttonProps,
	backgroundImgSrc,
}) => {
	const { translate } = useTranslation();
	return (
		<Modal
			className={classNames("gg-result", className)}
			open={open}
			disablePortal
		>
			<div className="gg-result__window">
				<img className="gg-result__background" src={backgroundImgSrc} />
				<div
					className="gg-result__close-btn icon-btn text"
					onClick={() => {
						if (onClose) onClose();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M4.39716 4.55394L4.47016 4.46994C4.59715 4.34292 4.7655 4.2657 4.94461 4.2523C5.12372 4.2389 5.30169 4.29023 5.44616 4.39694L5.53016 4.46994L12.0002 10.9389L18.4702 4.46894C18.5394 4.39734 18.6222 4.34025 18.7137 4.30098C18.8052 4.26172 18.9036 4.24108 19.0032 4.24026C19.1028 4.23944 19.2015 4.25846 19.2937 4.29622C19.3859 4.33397 19.4696 4.3897 19.54 4.46015C19.6103 4.53061 19.666 4.61437 19.7037 4.70656C19.7413 4.79875 19.7603 4.89752 19.7593 4.9971C19.7584 5.09669 19.7377 5.19509 19.6983 5.28658C19.659 5.37806 19.6018 5.46079 19.5302 5.52994L13.0612 11.9999L19.5312 18.4699C19.658 18.5971 19.7351 18.7655 19.7483 18.9446C19.7615 19.1237 19.71 19.3016 19.6032 19.4459L19.5302 19.5299C19.4032 19.657 19.2348 19.7342 19.0557 19.7476C18.8766 19.761 18.6986 19.7097 18.5542 19.6029L18.4702 19.5299L12.0002 13.0609L5.53016 19.5309C5.38864 19.6675 5.19915 19.743 5.00251 19.7412C4.80586 19.7394 4.61779 19.6604 4.47879 19.5213C4.3398 19.3822 4.26102 19.194 4.2594 18.9974C4.25778 18.8007 4.33347 18.6113 4.47016 18.4699L10.9392 11.9999L4.46916 5.52994C4.34229 5.40283 4.26525 5.23441 4.25203 5.0553C4.23882 4.8762 4.29032 4.6983 4.39716 4.55394Z"
							fill="white"
						/>
					</svg>
				</div>
				<div className="gg-result__header">
					{title ?? translate("YOU WIN!")}
				</div>
				<div className="gg-result__body">
					<div className="gg-result__prize">
						<img className="gg-result__prize-coin" src={coinImg} />
						<div className="gg-result__prize-count">{count ?? 0}</div>
					</div>
					{coefficient && (
						<div className="gg-result__coefficient">{coefficient}</div>
					)}
					{highScore && (
						<div className="gg-result__high-score">
							{translate("New high score")}
						</div>
					)}
				</div>
				<Button
					className={classNames(
						"gg-result__button",
						buttonProps?.className,
					)}
					onClick={() => {
						if (buttonProps?.onClick) buttonProps.onClick();
						if (onClose) onClose();
					}}
				>
					{buttonText ?? translate("AWESOME")}
				</Button>
			</div>
		</Modal>
	);
};
