import React, { Suspense, lazy, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { Button } from "@components/Shared/Button";
import { useTestStore } from "@store/TestStore";
import { ModalProps } from "types";

import "./Setup.scss";

import { SetupMode } from "@constants/index";

const Standard = lazy(() =>
	import("./Modes/Standard/Standard").then(({ Standard }) => ({
		default: Standard,
	})),
);
const Custom = lazy(() =>
	import("./Modes/Custom/Custom").then(({ Custom }) => ({
		default: Custom,
	})),
);

export const Setup = (props: ModalProps) => {
	const methods = useForm();
	const { visible, close } = props;
	const [setupMode, setSetupMode] = useState<string>("standard");
	const [
		activeFilter,
		selectedFilter,
		setActiveFilter,
		setSelectedFilter,
		setMode,
		setTestContent,
	] = useTestStore((state) => [
		state.activeFilter,
		state.selectedFilter,
		state.setActiveFilter,
		state.setSelectedFilter,
		state.setMode,
		state.setTestContent,
	]);

	useEffect(() => {
		setSetupMode("standard");
		setMode("STANDARD");
	}, [visible]);

	function handleSetupModes(e: React.MouseEvent<HTMLDivElement>): void {
		const val = (e.target as HTMLDivElement).dataset.value;

		if (val) {
			document
				.querySelectorAll(".setup__modal__mode")
				.forEach((x) => x.classList.remove("setup__mode--highlighted"));
			(e.target as HTMLDivElement).classList.add(
				"setup__mode--highlighted",
			);

			setSetupMode(val);
			// setMode();
			methods.reset();
		}
	}

	function onSubmit(data): void {
		if (setupMode === "custom") {
			setTestContent(0, data.filter.custom.split(" "));
		} else {
			setActiveFilter({
				...activeFilter,
				name: data.filter.name,
				value: data.filter.value,
			});
		}
		close();
		methods.reset();
	}

	return visible ? (
		<div className={`setup ${visible ? "setup__show" : ""}`}>
			<FormProvider {...methods}>
				<form id="setup-form" onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="setup__modal">
						<div className="setup__modal__header">
							<h2 className="setup__modal__title">Setup Test</h2>
							<Button
								className="setup__modal__close"
								type="button"
								onClick={close}
							>
								<IoCloseSharp />
							</Button>
						</div>
						<div
							className="setup__modal__modes"
							onClick={handleSetupModes}
						>
							<div
								className="setup__modal__mode setup__mode--highlighted"
								data-value={"standard"}
							>
								Standard
							</div>
							<div
								className="setup__modal__mode"
								data-value={"custom"}
							>
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
								// onClick={applyChanges}
								// onClick={methods.handleSubmit(onSubmit)}
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
				</form>
			</FormProvider>
		</div>
	) : null;
};
