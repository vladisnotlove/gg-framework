import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../utils";

import "./Bet.css";
import { throttle } from "throttle-debounce";
import { adjustFont } from "src/utils/html";

const getSpeed = (passedTime: number) => {
	return Math.min(Math.pow(Math.ceil(passedTime / 1000), 3) * 15, 50000); // chips/second
};

type BetProps = {
	className?: string;
	min: number;
	max: number;
	value: number;
	onChange: (value: number) => void;
	disabled: boolean;
};

export const Bet: React.FC<BetProps> = ({
	className,
	min,
	max,
	value,
	onChange: _onChange,
	disabled,
}) => {
	const { translate } = useTranslation();

	const minRef = useRef(min);
	minRef.current = min;
	const maxRef = useRef(max);
	maxRef.current = max;

	const intervalRef = useRef(-1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const tempValueRef = useRef<number | null>(null);

	const [fixed, setFixed] = useState(false);

	const fixValue = (value: number) => {
		if (value > maxRef.current) return maxRef.current;
		if (value < minRef.current) return minRef.current;
		return value;
	};

	const onChange = (value: number) => {
		_onChange(fixValue(value));
	};

	const startHold = (direction: -1 | 1) => {
		window.clearInterval(intervalRef.current);
		const startTime = Date.now();
		const startValue = value;
		const adjustFontThrottled = throttle(500, adjustFont);
		const callback = () => {
			const passedTime = Date.now() - startTime;
			const speed = getSpeed(passedTime);
			const bet = fixValue(
				startValue + direction * Math.round((passedTime / 1000) * speed),
			);
			if (inputRef.current) {
				inputRef.current.value = "" + bet;
				adjustFontThrottled(inputRef.current);
			}
			tempValueRef.current = bet;
		};
		const bet = fixValue(startValue + direction);
		if (inputRef.current) {
			inputRef.current.value = "" + bet;
			adjustFontThrottled(inputRef.current);
		}
		tempValueRef.current = bet;
		intervalRef.current = window.setInterval(callback, 250);
	};

	const stopHold = () => {
		window.clearInterval(intervalRef.current);
		if (tempValueRef.current !== null) {
			onChange(tempValueRef.current);
			tempValueRef.current = null;
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			adjustFont(inputRef.current);
		}
	}, [value]);

	return (
		<div
			className={classNames(
				"gg-bet",
				{ "gg-bet_fixed": fixed, "gg-bet_disabled": disabled },
				className,
			)}
		>
			<button
				className="gg-bet__min"
				onClick={() => {
					onChange(min);
				}}
			>
				{translate("MIN")}
			</button>
			<button
				className="gg-bet__minus"
				onPointerDown={() => startHold(-1)}
				onPointerUp={stopHold}
				onPointerLeave={stopHold}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M20 11C20.2449 11 20.4813 11.09 20.6644 11.2527C20.8474 11.4155 20.9643 11.6397 20.993 11.883L21 12C21 12.2449 20.91 12.4813 20.7473 12.6644C20.5845 12.8474 20.3603 12.9643 20.117 12.993L20 13H4C3.75507 13 3.51866 12.91 3.33563 12.7473C3.15259 12.5845 3.03566 12.3603 3.007 12.117L3 12C3.00003 11.7551 3.08996 11.5187 3.25272 11.3356C3.41547 11.1526 3.63975 11.0357 3.883 11.007L4 11H20Z"
						fill="white"
						fill-opacity="0.96"
					/>
				</svg>
			</button>
			<div className="gg-bet__amount">
				<div className="gg-bet__amount-label">{translate("Amount")}</div>
				<input
					ref={inputRef}
					className="gg-bet__amount-value"
					id="betAmountValue"
					type="number"
					value={"" + value}
					onFocus={() => {
						setFixed(true);

						const onClickOutside = (e: PointerEvent) => {
							if (
								e.target instanceof HTMLElement &&
								!e.target.closest("#betAmountValue")
							) {
								inputRef.current?.blur();
								document.documentElement.removeEventListener(
									"pointerdown",
									onClickOutside,
								);
							}
						};
						document.documentElement.addEventListener(
							"pointerdown",
							onClickOutside,
						);
					}}
					onChange={(e) => {
						const value = e.target.value
							? parseFloat(e.target.value.replaceAll(/\D/g, ""))
							: min;
						onChange(value);
					}}
					onKeyDown={(e) => {
						if (e.key.toLocaleLowerCase() === "enter") {
							inputRef.current?.blur();
						}
					}}
					onBlur={() => {
						setFixed(false);
					}}
				/>
			</div>
			<button
				className="gg-bet__plus"
				onPointerDown={() => startHold(1)}
				onPointerUp={stopHold}
				onPointerLeave={stopHold}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M11.883 3.007L12 3C12.2449 3.00003 12.4813 3.08996 12.6644 3.25272C12.8474 3.41547 12.9643 3.63975 12.993 3.883L13 4V11H20C20.2449 11 20.4813 11.09 20.6644 11.2527C20.8474 11.4155 20.9643 11.6397 20.993 11.883L21 12C21 12.2449 20.91 12.4813 20.7473 12.6644C20.5845 12.8474 20.3603 12.9643 20.117 12.993L20 13H13V20C13 20.2449 12.91 20.4813 12.7473 20.6644C12.5845 20.8474 12.3603 20.9643 12.117 20.993L12 21C11.7551 21 11.5187 20.91 11.3356 20.7473C11.1526 20.5845 11.0357 20.3603 11.007 20.117L11 20V13H4C3.75507 13 3.51866 12.91 3.33563 12.7473C3.15259 12.5845 3.03566 12.3603 3.007 12.117L3 12C3.00003 11.7551 3.08996 11.5187 3.25272 11.3356C3.41547 11.1526 3.63975 11.0357 3.883 11.007L4 11H11V4C11 3.75507 11.09 3.51866 11.2527 3.33563C11.4155 3.15259 11.6397 3.03566 11.883 3.007Z"
						fill="white"
						fill-opacity="0.96"
					/>
				</svg>
			</button>
			<button
				className="gg-bet__max"
				onClick={() => {
					onChange(max);
				}}
			>
				{translate("MAX")}
			</button>
		</div>
	);
};
