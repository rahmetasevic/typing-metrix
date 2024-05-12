import React, { Suspense, lazy, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import { Button } from "@components/Common/Button";
import { useTestStore } from "@store/TestStore";
import { ModalProps } from "types/index";

import "./SetupModal.scss";

const Standard = lazy(() =>
	import("./Modes/Standard/Standard").then(({ Standard }) => ({
		default: Standard,
	}))
);
const Custom = lazy(() =>
	import("./Modes/Custom/Custom").then(({ Custom }) => ({
		default: Custom,
	}))
);

export const SetupModal = (props: ModalProps) => {
	const { visible, close } = props;
	const [setupMode, setSetupMode] = useState<string>("standard");
	const [activeFilter, selectedFilter, setActiveFilter] = useTestStore(
		(state) => [
			state.activeFilter,
			state.selectedFilter,
			state.setActiveFilter,
		]
	);

	useEffect(() => {
		setSetupMode("standard");
	}, [visible]);

	function handleSetupModes(e: React.MouseEvent<HTMLDivElement>): void {
		const val = (e.target as HTMLDivElement).dataset.value;

		if (val) {
			document
				.querySelectorAll(".setup__modal__mode")
				.forEach((x) => x.classList.remove("setup__mode--highlighted"));
			(e.target as HTMLDivElement).classList.add(
				"setup__mode--highlighted"
			);
			setSetupMode(val.toLowerCase());
		}
	}

	function applyChanges(e: React.MouseEvent<HTMLButtonElement>): void {
		setActiveFilter({
			...activeFilter,
			name: selectedFilter.name,
			value: selectedFilter.value,
		});
		close();
	}

	return visible ? (
		<div className={`setup ${visible ? "setup__show" : ""}`}>
			<div className="setup__modal">
				<div className="setup__modal__header">
					<h2 className="setup__modal__title">Setup Test</h2>
					<Button className="setup__modal__close" onClick={close}>
						<IoCloseSharp />
					</Button>
				</div>
				<div className="setup__modal__modes" onClick={handleSetupModes}>
					<div
						className="setup__modal__mode setup__mode--highlighted"
						data-value={"standard"}
					>
						Standard
					</div>
					<div className="setup__modal__mode" data-value={"custom"}>
						Custom
					</div>
					{/* <div
                            className="setup__modal__mode"
                            data-value={"configuration"}
                        >
                            Configuration
                        </div> */}
				</div>
				<div className="setup__modal__content">
					<Suspense fallback={<div>Loading....</div>}>
						{setupMode === "standard" && <Standard />}
						{setupMode === "custom" && <Custom />}
					</Suspense>
				</div>
				<div className="setup__modal__footer">
					<Button
						className="setup__modal__footer__btn apply-button"
						type="submit"
						onClick={applyChanges}
					>
						Apply
					</Button>
					<Button
						className="setup__modal__footer__btn cancel-button"
						type="button"
						onClick={close}
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	) : null;
};
