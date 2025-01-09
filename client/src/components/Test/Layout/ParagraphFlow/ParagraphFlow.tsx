import { useEffect, useRef } from "react";
import { useTestEngine } from "@hooks/useTestEngine";

import "./ParagraphFlow.scss";

export const ParagraphFlow = () => {
	const [
		testContent,
		activity,
		userInput,
		getWordClass,
		detectKey,
		setUserInput,
	] = useTestEngine();
	const inputRef = useRef<HTMLInputElement>(null);

	function focusContent(): void {
		if (inputRef.current) {
			// console.log("Focusing input element", inputRef);
			inputRef.current.focus();
		}
	}

	return (
		<div className="parflow">
			<input
				className="input-box"
				type="text"
				ref={inputRef}
				onChange={(e) => setUserInput(e.target.value)}
				value={userInput}
				onKeyDown={detectKey}
				spellCheck="false"
			/>
			<div className="parflow__content" onClick={focusContent}>
				{testContent.length > 0 &&
					testContent.map((word, ix) => (
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
		</div>
	);
};
