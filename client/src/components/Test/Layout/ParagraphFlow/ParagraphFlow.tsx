import { useRef } from "react";
import { TbHandClick } from "react-icons/tb";

import { useTestStore } from "@store/TestStore";
import { useTestEngine } from "@hooks/useTestEngine";

import "./ParagraphFlow.scss";

export const ParagraphFlow = () => {
	const {
		testContent,
		activity,
		caretRef,
		hideCaret,
		showCaret,
		userInput,
		getWordClass,
		addCurrentCharClass,
		detectKey,
		setUserInput,
	} = useTestEngine();
	const [isContentFocused, setIsContentFocused] = useTestStore((state) => [
		state.isContentFocused,
		state.setIsContentFocused,
	]);
	const contentRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	function handleDivFocus(e: React.FocusEvent<HTMLDivElement>): void {
		e.stopPropagation();
		if (!isContentFocused) {
			setIsContentFocused(true);
			if (inputRef.current) {
				// console.log("focus");
				inputRef.current.focus(); // Focus input only if not already focused
				showCaret();
			}
		}
	}

	function handleDivBlur(e: React.FocusEvent<HTMLDivElement>): void {
		const relatedTarget = e.relatedTarget as Node;
		const container = contentRef.current;

		if (container && !container.contains(relatedTarget)) {
			// console.log("blur");
			setIsContentFocused(false);
			hideCaret();
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
				onBlur={handleDivBlur}
			/>
			<div
				className="parflow__content"
				ref={contentRef}
				onFocus={handleDivFocus}
				onBlur={handleDivBlur}
				tabIndex={0}
			>
				{testContent!.length > 0 &&
					testContent?.map((word, ix) => (
						<span
							className={`word-${ix} ${getWordClass(ix)}`}
							key={ix}
						>
							{word.split("").map((char, iy) => (
								<span
									className={`word-${ix}-char-${iy}${addCurrentCharClass(ix, iy)}`}
									key={iy}
								>
									{char}
								</span>
							))}
						</span>
					))}
			</div>
			<div ref={caretRef} className="parflow__caret"></div>
			<div className="parflow__blurred">
				<TbHandClick /> click to focus on the test
			</div>
		</div>
	);
};
