export const adjustFont = (container: HTMLElement) => {
	container.style.removeProperty("font-size");

	if (Math.abs(container.clientWidth - container.scrollWidth) < 1) return null;

	let tries = 0;
	let fontSize = parseFloat(getComputedStyle(container).fontSize);

	while (
		Math.abs(container.clientWidth - container.scrollWidth) > 1 &&
		fontSize > 8 &&
		tries < 100
	) {
		fontSize--;
		container.style.fontSize = "" + fontSize + "px";
		tries++;
	}

	return fontSize;
};
