import React, { useEffect, useState } from 'react'
import { useTestStore } from '@stores/TestStore';

type TimeProps = {
	type?: 'COUNTDOWN' | 'TIMER',
	start: boolean
};

export const useTimeCount = () => {

	// const [start, setStart] = useState<boolean>(false);
	// const [time, setTime] = useState<number>(0);
	const [timeConfig, setTimeConfig] = useState<TimeProps>({ start: false });
	// const [hasTestStarted, setHasTestStarted] = useState<boolean>(false);

	const [activity, setActivity, resetTest, results, setResults, activeFilter, time, setTime] = useTestStore((state) => [state.activity, state.setActivity, state.resetTest, state.results, state.setResults, state.activeFilter, state.time, state.setTime]);

	const startCountdown = () => {
		// setStart(true);
		setTimeConfig({ type: 'COUNTDOWN', start: true });
	}

	const startTimer = () => {
		// setStart(true);
		setTimeConfig({ type: 'TIMER', start: true });
	}

	// useEffect(() => {
	// 	// if (time < 1) {
	// 	// 	console.log('timer ended!');
	// 	// 	setTime(15);
	// 	// 	setStart(false);
	// 	// }
	// 	// if (!start) return;
	// 	// if (!time) return;

	// 	if (time < 1) {
	// 		console.log('timer ended!');
	// 		setTime(15);
	// 		setStart(false);
	// 	}
	// 	if (!start) return;
	// 	if (!time) return;

	// 	const interval = setInterval(() => {
	// 		setTime(time - 1);
	// 	}, 1000);


	// 	return () => {
	// 		clearInterval(interval);
	// 	}
	// }, [time, start]);

	useEffect(() => {
		// console.log(activity);
		// console.log(timeConfig);
		// configTimeStatus(activity.status);
		stopTime();
		console.log('useTimeCount', activity);

	}, [activity.status]);

	useEffect(() => {
		// console.log(time);
		// console.log(activity);
		// set time for global store

		// const newTime = handleTime();
		if (!timeConfig.type || !timeConfig.start || activity.status === 'COMPLETED') return;
		if (timeConfig.type === 'COUNTDOWN' && time < 1) {
			setActivity({ status: 'COMPLETED' });
			return;
		}

		const interval = setInterval(() => {
			if (activity.status !== 'STOPPED') {
				setTime(timeConfig?.type === 'COUNTDOWN' ? time - 1 : time + 1);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		}
	}, [timeConfig, time]);

	// function handleTime(): number {
	// 	let tempTime = time;

	// 	if (testTimeConfig?.type === 'COUNTDOWN') {
	// 		if (time < 1) {
	// 			stopTime();
	// 		}
	// 		tempTime -= 1;
	// 	} else {
	// 		tempTime += 1;
	// 	}

	// 	return tempTime;
	// }

	// function configTimeStatus(status: string): void {
	// 	switch (status) {
	// 		case 'PENDING':
	// 			setTimeConfig({ start: false })
	// 			setTime(timeConfig?.type === 'COUNTDOWN' ? Number(activeFilter.value) : 0);
	// 			break;
	// 		case 'STARTED':
	// 			// check if it was previous stopped or pending

	// 			break;
	// 		case 'STOPPED':

	// 			break;
	// 		case 'COMPLETED':
	// 			break;
	// 	}
	// }

	function stopTime(): void {
		console.log('timer ended!');

		// setActivity(false);
		// resetTest();
		// setStart(false);
		if (activity.status === 'PENDING') {
			setTimeConfig({ start: false })
			// setTime(timeConfig?.type === 'COUNTDOWN' ? Number(activeFilter.value) : 0);
		}

		if (activity.status === 'COMPLETED') {
			// resetTest();
			console.log(time);
			console.log(activeFilter);


			setTime(timeConfig?.type === 'COUNTDOWN' ? Number(activeFilter.value) : 0);
		}
	}

	return [startCountdown, startTimer];
}
