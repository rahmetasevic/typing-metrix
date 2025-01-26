import { useRef } from "react";
import { useTestEngine } from "@hooks/useTestEngine";
import { TbHandClick } from "react-icons/tb";

import "./ParagraphInline.scss";

export const ParagraphInline = () => {
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
			// console.log("Focusing input element");
			inputRef.current.focus();
		}
	}

	return (
		<div className="parinline">
			<input
				className="parinline__input"
				type="text"
				ref={inputRef}
				onChange={(e) => setUserInput(e.target.value)}
				value={userInput}
				onKeyDown={detectKey}
				spellCheck="false"
			/>
			<div className="parinline__content" onClick={focusContent}>
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
							))}
							&nbsp;
						</span>
					))}
			</div>
			<div className="parinline__blurred">
				<TbHandClick /> click to focus on the test
			</div>
		</div>
	);
};
