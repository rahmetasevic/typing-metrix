import { useEffect } from "react";

import { useTestStore } from "@store/TestStore";
import { ParagraphBox } from "./ParagraphBox";
import { ParagraphFlow } from "./ParagraphFlow";
import { ParagraphInline } from "./ParagraphInline";
import { LayoutType, TestStatus } from "@constants/index";
import { addTransition } from "@utils/index";

export const Layout = () => {
	const [displayLayout, activity] = useTestStore((state) => [
		state.displayLayout,
		state.activity,
	]);

	useEffect(() => {
		const contentClass =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];
		addTransition(`.${contentClass}`);
		addTransition(`.${contentClass}__content`);
	}, [displayLayout]);

	return (
		<div
			className={`typing-test`}
			// figure out to reset scroll before display is set to none
			// className={`typing-test ${activity === TestStatus.Finish ? "invisible" : ""}`}
			style={{
				opacity: activity !== TestStatus.Finish ? 1 : 0,
			}}
		>
			{displayLayout === LayoutType.FLOW && <ParagraphFlow />}
			{displayLayout === LayoutType.BOX && <ParagraphBox />}
			{displayLayout === LayoutType.INLINE && <ParagraphInline />}
		</div>
	);
};
