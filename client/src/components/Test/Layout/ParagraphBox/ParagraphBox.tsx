import { useTestEngine } from "@hooks/useTestEngine";
import { TestStatus } from "@constants/index";

import "./ParagraphBox.scss";

export const ParagraphBox = () => {
	const [
		testContent,
		activity,
		userInput,
		getWordClass,
		detectKey,
		setUserInput,
	] = useTestEngine();

	return (
		<div
			className={`typing-test ${activity === TestStatus.Finish ? "invisible" : ""}`}
			style={{
				opacity: activity !== TestStatus.Finish ? 1 : 0,
			}}
		>
			<div className="text">
				<div className="text__content">
					{testContent!.length > 0 &&
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
				<input
					className="input-box"
					type="text"
					spellCheck="false"
					onChange={(e) => setUserInput(e.target.value)}
					value={userInput}
					onKeyDown={detectKey}
				/>
			</div>
		</div>
	);
};
