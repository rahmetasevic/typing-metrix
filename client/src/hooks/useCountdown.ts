import React, { useEffect, useState } from 'react'
import { useTestStore } from '../stores/TestStore';

export const useCountdown = () => {

	const [start, setStart] = useState<boolean>(false);
	const { time, setTime } = useTestStore();

	const startTimer = () => {
		setStart(true);
	}

	useEffect(() => {
		if(time < 1)  {
			console.log('timer ended!');
			setTime(15);
			setStart(false);
		}
		if(!start) return;
		if (!time) return;
		
		const interval = setInterval(() => {
			setTime(time - 1);
		}, 1000);
		

		return () => {
			clearInterval(interval);
		}
	}, [time, start]);

	return { startTimer };
}
