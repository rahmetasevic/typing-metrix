import { Suggestions } from "@constants/index";
import { useGetThemes } from "@hooks/useGetThemes";

import "./Appearance.scss";
import { Select } from "@components/Shared/Select";
import { useEffect } from "react";
import { filterThemeTitle } from "@utils/index";
import { ConfigProperty, useTestConfigStore } from "@store/TestConfigStore";

export const Appearance = () => {
	const { themes } = useGetThemes();
	const [setConfig] = useTestConfigStore((state) => [state.setConfig]);

	// useEffect(() => {
	// 	console.log(filterThemeTitle(themes));
	// }, [themes]);

	// slop
	function handleChange(property: ConfigProperty, value: string): void {
		// console.log(configProperty, value);
		if (property === "theme") {
			document.documentElement.setAttribute("data-theme", value);
			localStorage.setItem("theme", value);
		}
		setConfig(property, value);
	}

	return (
		<div className="appearance">
			{Suggestions.appearance?.map((category) => {
				return (
					<div
						className={`appearance__settings appearance__${category.title}`}
						key={category.title}
					>
						<div
							className={`appearance__info appearance__${category.title}__info`}
						>
							<span className="appearance__title">
								{category.title}
							</span>
							<span className="appearance__description">
								{category.description}
							</span>
						</div>
						<div
							className={`appearance__handler appearance__${category.title}__handler`}
						>
							<Select
								options={filterThemeTitle(themes)}
								value={localStorage.getItem("theme") ?? "dark"}
								label={category.title}
								placeholder={
									localStorage.getItem("theme") ?? "dark"
								}
								onChange={handleChange}
								key={category.title}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};
