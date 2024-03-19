import React, { useEffect, useState } from 'react'

import { useTestStore } from '../../../stores/TestStore';

import '../TestResults/TestResults.scss';

export const TestResults = () => {
	const time = useTestStore((state) => state.time);
	const activeFilter = useTestStore((state) => state.activeFilter);
	

	return (
		<div className='results'>
			<div className='results__time'>
				{time}
				<span>{activeFilter.name + ' left'}</span>
			</div>
			<div className='results__wpm'>
				17
				<span>WPM</span>
			</div>
			<div className='results__acc'>
				92%
				<span>Accuracy</span>
			</div>
			<div className='results__errors'>
				5
				<span>Errors</span>
			</div>
		</div>
	)
}
