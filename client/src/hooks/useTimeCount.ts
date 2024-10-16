import React, { useEffect, useState } from "react";

import { useTestStore } from "@store/TestStore";

type TimeProps = {
	type?: "COUNTDOWN" | "TIMER";
	start: boolean;
};

export const useTimeCount = () => {
	const [timeConfig, setTimeConfig] = useState<TimeProps>({ start: false });
	const [activity, time, activeFilter, setActivity, setTime] = useTestStore(
		(state) => [
			state.activity,
			state.time,
			state.activeFilter,
			state.setActivity,
			state.setTime,
		],
	);

	const startCountdown = () => {
		setTimeConfig({ type: "COUNTDOWN", start: true });
	};

	const startTimer = () => {
		setTimeConfig({ type: "TIMER", start: true });
	};

	useEffect(() => {
		stopTime();
	}, [activity]);

	useEffect(() => {
		if (!timeConfig.type || !timeConfig.start || activity === "COMPLETED")
			return;
		if (timeConfig.type === "COUNTDOWN" && time < 1) {
			setActivity("COMPLETED");
			return;
		}

		const interval = setInterval(() => {
			if (activity !== "STOPPED") {
				setTime(timeConfig?.type === "COUNTDOWN" ? time - 1 : time + 1);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timeConfig, time]);

	function stopTime(): void {
		console.log("timer ended!");

		if (activity === "PENDING") {
			setTimeConfig({ start: false });
		}

		if (activity === "COMPLETED") {
			setTime(
				timeConfig?.type === "COUNTDOWN"
					? Number(activeFilter.value)
					: 0,
			);
		}
	}

	return [startCountdown, startTimer];
};
