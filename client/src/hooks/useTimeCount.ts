import React, { useEffect, useState } from "react";

import { useTestStore } from "@store/TestStore";
import { TestStatus } from "@constants/index";

type TimeProps = {
	type?: "COUNTDOWN" | "TIMER";
	start: boolean;
};

export const useTimeCount = () => {
	const [timeConfig, setTimeConfig] = useState<TimeProps>({
		type: "COUNTDOWN",
		start: false,
	});
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
		console.log(timeConfig);
		if (
			!timeConfig.type ||
			!timeConfig.start ||
			activity === TestStatus.Finish
		) {
			return;
		}

		if (timeConfig.type === "COUNTDOWN" && time < 1) {
			setActivity(TestStatus.Finish);
			return;
		}

		const interval = setInterval(() => {
			if (activity !== TestStatus.Stop) {
				setTime(timeConfig?.type === "COUNTDOWN" ? time - 1 : time + 1);
			}
			console.log("curr", time);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timeConfig, time]);

	function stopTime(): void {
		if (activity === TestStatus.Pending) {
			setTimeConfig({ start: false });
		}

		if (activity === TestStatus.Finish) {
			console.log("timer ended!");
			setTime(
				timeConfig?.type === "COUNTDOWN"
					? Number(activeFilter.value)
					: 0,
			);
		}
	}

	return [startCountdown, startTimer];
};
