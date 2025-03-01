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
	const [activity, timeCount, setActivity, setTimeCount] = useTestStore(
		(state) => [
			state.activity,
			state.timeCount,
			state.setActivity,
			state.setTimeCount,
			state.activeFilter,
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
		// console.log("timeConfig", timeConfig);
		// console.log("curr", timeCount);
		if (
			!timeConfig.type ||
			!timeConfig.start ||
			activity === TestStatus.Finish
		) {
			return;
		}

		if (timeConfig.type === "COUNTDOWN" && timeCount === 0) {
			setActivity(TestStatus.Finish);
			return;
		}

		const interval = setInterval(() => {
			if (activity !== TestStatus.Stop) {
				setTimeCount(
					timeConfig?.type === "COUNTDOWN"
						? timeCount - 1
						: timeCount + 1,
				);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timeConfig, timeCount]);

	function stopTime(): void {
		if (activity === TestStatus.Pending) {
			setTimeConfig({ start: false });
		}

		if (activity === TestStatus.Finish) {
			// console.log("timer ended!", timeCount, timeConfig);
			setTimeConfig({ start: false });
			// setTimeCount(
			// 	timeConfig?.type === "COUNTDOWN"
			// 		? Number(activeFilter.value)
			// 		: timeCount,
			// );
		}
	}

	return [startCountdown, startTimer];
};
