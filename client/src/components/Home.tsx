import React, { useEffect, useState } from 'react';
import { generate, count } from "random-words";

import '../styles/Home.scss';

type Content = {
	text: string,
	index: number
}

type Scores = {
	positive: number,
	negative: number
}

export const Home: React.FC = () => {
	const [words, setWords] = useState<string[]>([]);
	const [currChar, setCurrChar] = useState<Content>({text: '', index: -1});
	const [currWord, setCurrWord] = useState<Content>({text: '', index: -1});
	const [userInput, setUserInput] = useState<string>('');
	const [score, setScore] = useState<Scores>({positive: 0, negative: -1});
	const [wordsCount, setWordsCount] = useState<number>(25);
	const [showFilter, setShowFilter] = useState<boolean>(false);

	useEffect(() => {
		setWords(Array.from(generate(wordsCount)));
	}, [wordsCount]);

	useEffect(() => {
		setCurrWord({text: words[0], index: 0});
	}, [words]);

	useEffect(() => {
		checkMatch();
	}, [currChar])

	function detectKey({key}: {key: string}): void {
		if(key === ' ') {
			setCurrWord({text: words[currWord.index + 1], index: currWord.index + 1})
			setCurrChar({text: key, index: -1});
			setUserInput('');
		} else {
			setCurrChar({text: key, index: currChar.index + 1});
		}
	}

	function checkMatch(): void {
		if(currChar.text === currWord.text[currChar.index]) {
			setScore({...score, positive: score.positive + 1});
			document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add("correct-char")
		} else {
			setScore({...score, negative: score.negative + 1});
			document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add("incorrect-char")
		}
	}

	function getWordClass(x: number): string {
		return x === currWord.index ? 'active-word' : '';
	}

	function handleClick(e: React.MouseEvent<HTMLDivElement>): void {
		const el = e.target as HTMLDivElement;
		console.log(el.dataset.value);
		setWordsCount(Number(el.dataset.value));
	}

	function handleFilterClick(e: React.MouseEvent<HTMLDivElement>): void {
		setShowFilter(!showFilter);
	}

	return (
		<div className="home">
			<div className='filters'>
				<div className="words">
					<div className='filter' onClick={handleFilterClick}>Words</div>
					<div className='words-filter' onClick={handleClick} style={showFilter ? {} : { display: 'none' }}>
						<div data-value={25}>
							25
						</div>
						<div data-value={50}>
							50
						</div>
						<div data-value={100}>
							100
						</div>
					</div>
				</div>
				<div className="time">
					Time
				</div>
			</div>
			<div className="typing-test">
				<div className='content'>
					{words.map((word, ix) => 
						<span className={getWordClass(ix)} key={ix}>
							{word.split('').map((char, iy) => 
								<span className={`word-${ix}-char-${iy}`} key={iy}>{char}</span>
							)}
							<span> </span>
						</span>
					)}
				</div>
				<input type="text" onChange={e => setUserInput(e.target.value)} value={userInput} onKeyDown={detectKey}/>
			</div>
			{/* <span>Positive: {score.positive}</span>
			<br />
			<span>Negative: {score.negative}</span> */}
		</div>
	)
};