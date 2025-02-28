import { useEffect, useRef } from "react";
import { useTestStore } from "@store/TestStore";
import { useTestEngine } from "@hooks/useTestEngine";
import { TbHandClick } from "react-icons/tb";

import "./ParagraphFlow.scss";
import { TestStatus } from "@constants/index";

export const ParagraphFlow = () => {
	const {
		testContent,
		activity,
		userInput,
		getWordClass,
		detectKey,
		setUserInput,
	} = useTestEngine();
	const inputRef = useRef<HTMLInputElement>(null);

	function focusContent(): void {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	return (
		<div className="parflow">
			<input
				className="parflow__input"
				type="text"
				ref={inputRef}
				onChange={(e) => setUserInput(e.target.value)}
				value={userInput}
				onKeyDown={detectKey}
				spellCheck="false"
			/>
			<div
				className="parflow__content"
				onClick={focusContent}
				tabIndex={0}
			>
				{testContent!.length > 0 &&
					testContent?.map((word, ix) => (
						<span className={getWordClass(ix)} key={ix}>
							{word.split("").map((char, iy) => (
								<span
									className={`word-${ix}-char-${iy}`}
									key={iy}
								>
									{char}
								</span>
							))}{" "}
						</span>
					))}
			</div>
			<div className="parflow__blurred">
				<TbHandClick /> click to focus on the test
			</div>
		</div>
	);
};
