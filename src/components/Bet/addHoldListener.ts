export const addHoldListener = (
  element: HTMLElement,
  listener: (data: {
    timePast: number;
    status: "start" | "finish" | "holding";
  }) => void
) => {
  const callback = (e: PointerEvent) => {
    e.preventDefault();
    const start = Date.now();

    listener({
      timePast: 0,
      status: "start",
    });
    let intervalId = window.setInterval(() => {
      listener({
        timePast: Date.now() - start,
        status: "holding",
      });
    }, 150);

    const handlePointerUp = () => {
      listener({
        timePast: Date.now() - start,
        status: "start",
      });
      window.clearInterval(intervalId);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointerup", handlePointerUp);
  };

  element.addEventListener("pointerdown", callback);

  return () => {
    element.removeEventListener("pointerdown", callback);
  };
};
