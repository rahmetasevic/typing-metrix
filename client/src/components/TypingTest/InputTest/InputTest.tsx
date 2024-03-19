import React, { useEffect, useRef, useState } from 'react';

import { useTestStore } from '../../../stores/TestStore';
import { useCountdown } from '../../../hooks/useCountdown';

import './InputTest.scss';

type Accuracy = {
	correct: number,
	incorrect: number
}

export const InputTest = () => {
	// const [text, setText] = useState<string[]>(generateText(Number(props.value)));
	// const [currWord, setCurrWord] = useState<Content>({text: '', index: -1});
	// const [currChar, setCurrChar] = useState<Content>({text: '', index: -1});
	const [userInput, setUserInput] = useState<string>('');
	const [accuracy, setAccuracy] = useState<Accuracy>({correct: 0, incorrect: -1});
	const { startTimer } = useCountdown();

	const { testContent, setWord, setChar, currWord, currChar, isStarted, setIsStarted, setTime } = useTestStore();

	// useEffect(() => {
	// 	// setText(generateText(Number(props.value)));
	// 	// setCurrWord({text: text[0], index: 0});
	// }, [props]);
	
	useEffect(() => {
		// setCurrWord({text: text[0], index: 0});
		// setCurrChar({text: text[0][0], index: -1});
		// resetTest();
		document.querySelectorAll('.active-char').forEach(e => e.classList.remove('active-char'));
		setUserInput('');
	}, [testContent]);
	
	useEffect(() => {
		setUserInput('');
		checkMatch();
	}, [currChar]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setCountdown(countdown - 1);
	// 	}, 1000)

	// 	return () => {
	// 		clearInterval(interval)
	// 	}
	// });

	function detectKey({key}: {key: any}): void {
		if(!isStarted) { 
			setIsStarted(true);
			startTimer();
		}
		if(key === ' ') {
			// setCurrWord({text: text[currWord.index + 1], index: currWord.index + 1})
			// setCurrChar({text: key, index: -1});
			
			setWord(testContent[currWord.index + 1], currWord.index + 1);
			setChar(key, -1);
			setUserInput('');

			scrollContent();
		} else {
			// setCurrChar({text: key, index: currChar.index + 1});
			setChar(key, currChar.index + 1);
		}
	}

	function checkMatch(): void {
		document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('active-char');
		// if(currChar.text === currWord.text[currChar.index]) {
		// 	setScore({...score, positive: score.positive + 1});
		// 	// ====> needs to be set after creating user preferences
		// 	// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('correct-char');
		// } else {
		// 	setScore({...score, negative: score.negative + 1});
		// 	// ====> needs to be set after creating user preferences
		// 	// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('incorrect-char');
		// }
	}

	function resetTest(): void {
		document.querySelectorAll('.active-char').forEach(e => e.classList.remove('active-char'));
		// setCurrWord({text: text[0], index: 0});
		// setCurrChar({text: text[0][0], index: -1});
		
		setWord(testContent[0], 0);
		setChar(testContent[0][0], -1);
	}

	function getWordClass(x: number): string {
		return x === currWord.index ? 'current-word' : '';
	}

	function scrollContent() {
		setTimeout(() => {
			const el: HTMLDivElement = (document.querySelector('.text__content') as HTMLDivElement);
			const spn: HTMLSpanElement = (document.querySelector('.current-word') as HTMLSpanElement);
			if(el.getBoundingClientRect().top + 10 !== spn.getBoundingClientRect().top) {
				(document.querySelector('.text__content') as HTMLDivElement).scrollTop += (spn.getBoundingClientRect().top - el.getBoundingClientRect().top);
			}
		}, 50);
	}

	return (
		<div className="typing-test">
			<div className='text'>
				<div className='text__content'>
					{testContent.map((word, ix) => 
						<span className={getWordClass(ix)} key={ix}>
							{word.split('').map((char, iy) => 
								<span className={`word-${ix}-char-${iy}`} key={iy}>{char}</span>
							)}{' '}
						</span>
					)}
				</div>
			</div>
			<input className='input-box' type="text" spellCheck="false" onChange={e => setUserInput(e.target.value)} value={userInput} onKeyDown={detectKey}/>
		</div>
	)
};