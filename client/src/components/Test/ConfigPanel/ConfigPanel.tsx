import React, { useEffect, useState } from "react";

import { FilterOption, TestStatus } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { useTestConfigStore } from "@store/TestConfigStore";
import { Button } from "@components/Shared/Button";

import "./ConfigPanel.scss";
import { addTransition } from "@utils/index";

export const ConfigPanel = () => {
	const [activeFilter, activity, setActiveFilter, setTime, setTestContent] =
		useTestStore((state) => [
			state.activeFilter,
			state.activity,
			state.setActiveFilter,
			state.setTime,
			state.setTestContent,
		]);
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);

	useEffect(() => {
		if (activeFilter.name === "time") {
			setTime(Number(activeFilter.value));
		} else {
			setTime(0);
		}

		// console.log("activeFilter", activeFilter);
		setTestContent();
	}, [activeFilter, config]);

	function handleFilterSelect(e: React.MouseEvent<HTMLButtonElement>): void {
		const contentClass =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];
		const filterName = e.currentTarget.textContent;

		addTransition(".panel__filters__values");
		addTransition(`.${contentClass}__content`);

		if (filterName) {
			document
				.querySelectorAll(".filter__title")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");

			setTimeout(() => {
				setActiveFilter({
					name: filterName,
					options: FilterOption[filterName]?.values ?? null,
					value: FilterOption[filterName]?.values?.[0] ?? null,
				});
			}, 100);
		}
	}

	function handleFilterValue(e: React.MouseEvent<HTMLButtonElement>): void {
		const contentClass =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];
		const filterValue = e.currentTarget.textContent;

		addTransition(`.${contentClass}__content`);

		if (filterValue) {
			document
				.querySelectorAll(".filter__value")
				.forEach((x) =>
					x.classList.remove("filter__value--highlighted"),
				);
			e.currentTarget.classList.add("filter__value--highlighted");

			setActiveFilter({ ...activeFilter, value: filterValue });
		}
	}

	function handlePanelRules(e: React.MouseEvent<HTMLButtonElement>): void {
		const contentClass =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];

		addTransition(`.${contentClass}__content`);

		const rule = (e.target as HTMLButtonElement).textContent;
		const isHighlighted = e.target.classList.contains(
			"filter__value--highlighted",
		);
		// console.log("rule", rule);

		if (!isHighlighted) {
			e.target.classList.add("filter__value--highlighted");
		} else {
			e.target.classList.remove("filter__value--highlighted");
		}

		if (rule === "punctuation") {
			// setPunctuation(!config.punctuation);
			setConfig("punctuation", !config.punctuation);
		} else {
			// setNumbers(!config.numbers);
			setConfig("numbers", !config.numbers);
		}
	}

	// function addTransitionVisibility(className: string): void {
	// 	const isHidden = document
	// 		.querySelector(className)
	// 		?.classList.contains("hidden");
	// 	if (!isHidden) {
	// 		document.querySelector(className)?.classList.add("hidden");
	// 		setTimeout(() => {
	// 			document.querySelector(className)?.classList.remove("hidden");
	// 		}, 200);
	// 	}
	// }
	//
	return (
		<div
			className={`panel ${activity !== TestStatus.Pending ? "hidden" : ""}`}
		>
			<div className="panel__filters">
				<div className="panel__filters__titles">
					{Object.keys(FilterOption).map((filterName, i) => {
						return (
							<Button
								className={`filter__title filter__${filterName} ${activeFilter.name === filterName ? "filter--highlighted" : ""}`}
								type="button"
								key={i}
								onClick={handleFilterSelect}
							>
								{filterName}
							</Button>
						);
					})}
				</div>
				<hr
					className={`splitter ${activeFilter.name === "quotes" ? "invisible" : ""}`}
				/>
				<div
					className={`panel__filters__values ${activeFilter.name === "quotes" ? "invisible" : ""}`}
				>
					{FilterOption[activeFilter.name]?.values?.map(
						(filterValue, i) => (
							<Button
								className={`filter__value ${activeFilter.value === filterValue ? "filter__value--highlighted" : ""}`}
								type="button"
								key={i}
								onClick={handleFilterValue}
							>
								{filterValue}
							</Button>
						),
					)}
				</div>
			</div>
			<div
				className={`panel__rules ${activeFilter.name === "quotes" ? "invisible" : ""}`}
				onClick={handlePanelRules}
			>
				<Button
					className={`panel__rule ${config.punctuation ? "filter__value--highlighted" : ""}`}
					type="button"
				>
					punctuation
				</Button>
				<Button
					className={`panel__rule ${config.numbers ? "filter__value--highlighted" : ""}`}
					type="button"
				>
					numbers
				</Button>
			</div>
		</div>
	);
};
