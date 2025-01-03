import { useTestEngine } from "@hooks/useTestEngine";
import { TestStatus } from "@constants/index";

import "./ParagraphFlow.scss";
import { useEffect, useRef } from "react";

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
		// console.log("ref", inputRef);
		if (inputRef.current) {
			console.log("Focusing input element");
			inputRef.current.focus();
		}
	}

	return (
		<div
			className={`typing-test ${activity === TestStatus.Finish ? "invisible" : ""}`}
			style={{
				opacity: activity !== TestStatus.Finish ? 1 : 0,
			}}
		>
			<div className="text">
				<input
					className="input-box"
					type="text"
					ref={inputRef}
					onChange={(e) => setUserInput(e.target.value)}
					value={userInput}
					onKeyDown={detectKey}
					spellCheck="false"
				/>
				<div className="text__content" onClick={focusContent}>
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
		</div>
	);
};
