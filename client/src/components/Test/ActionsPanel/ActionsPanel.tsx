import { useEffect } from "react";
import { MdRestartAlt } from "react-icons/md";
import { TbArrowBarToLeft } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@components/Shared/Button";
import { useTestStore } from "@store/TestStore";
import { DisplayLayout, LayoutTypeName, TestStatus } from "@constants/index";
import { addTransition } from "@utils/index";

import "./ActionsPanel.scss";

export const ActionsPanel = () => {
	const [activity, displayLayout, setDisplayLayout, redoTest, resetTest] =
		useTestStore(
			useShallow((state) => [
				state.activity,
				state.displayLayout,
				state.setDisplayLayout,
				state.redoTest,
				state.resetTest,
			]),
		);

	// useEffect(() => {
	// 	const contentClass =
	// 		document.querySelector(".typing-test")?.firstElementChild
	// 			?.classList[0];
	// 	addTransition(`.${contentClass}`);
	// 	addTransition(`.${contentClass}__content`);
	// }, [displayLayout]);
	//
	function handleContentLayout(e: React.MouseEvent<HTMLButtonElement>): void {
		const layout = (e.currentTarget as HTMLButtonElement).dataset
			.value as LayoutTypeName;
		setDisplayLayout(layout);
	}

	return (
		<div className="actions">
			<div
				className={`actions__layouts ${activity === TestStatus.Finish || activity === TestStatus.Start ? "invisible" : ""}`}
			>
				{DisplayLayout.map((layout) => {
					const Icon = layout.icon;
					return (
						<Button
							className={`actions__layout ${displayLayout === layout.name ? "layout--highlighted" : ""}`}
							key={layout.name}
							onClick={handleContentLayout}
							dataValue={layout.name}
						>
							<Icon />
						</Button>
					);
				})}
			</div>
			<div className="actions__control">
				<Button
					className={`${activity !== TestStatus.Finish ? "invisible" : ""}`}
					onClick={redoTest}
				>
					<TbArrowBarToLeft />
				</Button>
				<Button
					className={`${activity === TestStatus.Start ? "invisible" : ""}`}
					onClick={resetTest}
				>
					<MdRestartAlt />
				</Button>
			</div>
		</div>
	);
};
