import React, { useEffect, useState } from "react";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { MdOutlineNumbers } from "react-icons/md";
import { MdRestartAlt } from "react-icons/md";

import {
	DisplayLayout,
	FilterOption,
	LayoutTypeName,
	TestStatus,
} from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { useTestConfigStore } from "@store/TestConfigStore";
import { Button } from "@components/Shared/Button";
import { addTransition } from "@utils/index";

import "./ConfigPanel.scss";

export const ConfigPanel = () => {
	const [
		activeFilter,
		activity,
		displayLayout,
		setDisplayLayout,
		setTimeCount,
		setActiveFilter,
		setTestContent,
		resetTest,
	] = useTestStore((state) => [
		state.activeFilter,
		state.activity,
		state.displayLayout,
		state.setDisplayLayout,
		state.setTimeCount,
		state.setActiveFilter,
		state.setTestContent,
		state.resetTest,
	]);
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);

	useEffect(() => {
		if (activeFilter.name === "time") {
			setTimeCount(Number(activeFilter.value));
		} else {
			setTimeCount(0);
		}

		// console.log("activeFilter", activeFilter);
		setTestContent();
	}, [activeFilter, config]);

	function handleFilterSelect(e: React.MouseEvent<HTMLButtonElement>): void {
		const contentClass =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];
		const filterName = e.currentTarget.textContent?.trim();
		console.log("filterName", filterName);

		addTransition(".panel__filters__values");
		addTransition(`.${contentClass}__content`);

		if (filterName) {
			document
				.querySelectorAll(".panel__filters__title")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");
			document
				.querySelectorAll(".panel__filters__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");

			setTimeout(() => {
				setActiveFilter({
					name: filterName,
					options: FilterOption[filterName]?.values ?? null,
					value: FilterOption[filterName]?.values?.[0] ?? null,
				});
			}, 100);

			if (filterName === "quotes") {
				document
					.querySelector(".panel__splitter")
					?.classList.add("invisible");
			} else {
				document
					.querySelector(".panel__splitter")
					?.classList.remove("invisible");
			}
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

	function handlePanelRules(e: React.MouseEvent<HTMLDivElement>): void {
		const contentClass =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];

		addTransition(`.${contentClass}__content`);

		const rule = (e.target as HTMLButtonElement).textContent?.trim();
		const isHighlighted = (e.target as HTMLDivElement).classList.contains(
			"filter__value--highlighted",
		);
		// console.log("rule", rule);

		if (!isHighlighted) {
			(e.target as HTMLDivElement).classList.add(
				"filter__value--highlighted",
			);
		} else {
			(e.target as HTMLDivElement).classList.remove(
				"filter__value--highlighted",
			);
		}

		if (rule === "symbols") {
			setConfig("symbols", !config.symbols);
		} else {
			setConfig("numbers", !config.numbers);
		}
	}

	function handleContentLayout(e: React.MouseEvent<HTMLButtonElement>): void {
		const layout = (e.currentTarget as HTMLButtonElement).dataset
			.value as LayoutTypeName;
		console.log(layout);
		setDisplayLayout(layout);
	}

	return (
		<div
			className={`panel ${activity !== TestStatus.Pending ? "hidden" : ""}`}
		>
			<div className="panel__container">
				<div
					className={`panel__rules ${activeFilter.name === "quotes" ? "invisible" : ""}`}
					onClick={handlePanelRules}
				>
					<Button
						className={`panel__rule ${config.symbols ? "filter__value--highlighted" : ""}`}
						type="button"
					>
						<HiOutlineAtSymbol size="1.25em" /> symbols
					</Button>
					<Button
						className={`panel__rule ${config.numbers ? "filter__value--highlighted" : ""}`}
						type="button"
					>
						<MdOutlineNumbers size="1.25em" /> numbers
					</Button>
				</div>
				<div className="panel__filters">
					<div className="panel__filters__titles">
						{Object.keys(FilterOption).map((filterName, i) => {
							const Icon = FilterOption[filterName].icon;
							return (
								<Button
									className={`panel__filters__title filter__${filterName} ${activeFilter.name === filterName ? "filter--highlighted" : ""}`}
									type="button"
									key={i}
									onClick={handleFilterSelect}
								>
									<Icon size="1.25em" /> {filterName}
								</Button>
							);
						})}
					</div>
					<span className="panel__splitter">*</span>
					<div
						className={`panel__filters__values ${activeFilter.name === "quotes" ? "invisible" : ""}`}
					>
						{FilterOption[activeFilter.name]?.values?.map(
							(filterValue, i) => (
								<Button
									className={`panel__filters__value ${activeFilter.value === filterValue ? "filter__value--highlighted" : ""}`}
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
				<div className="panel__layouts">
					{DisplayLayout.map((layout) => {
						const Icon = layout.icon;
						return (
							<Button
								className={`panel__layout ${displayLayout === layout.name ? "layout--highlighted" : ""}`}
								key={layout.name}
								onClick={handleContentLayout}
								dataValue={layout.name}
							>
								<Icon size="1.25em" />
							</Button>
						);
					})}
				</div>
				<div className="panel__actions">
					<Button className="panel__action" onClick={resetTest}>
						<MdRestartAlt size="1.25em" />
					</Button>
				</div>
			</div>
		</div>
	);
};
