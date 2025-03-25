import React, { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";

import { useTestConfigStore } from "@store/TestConfigStore";
import { ModalProps } from "types";
import { useGetThemes } from "@hooks/useGetThemes";

import "./ThemeModal.scss";

export const ThemeModal = (props: ModalProps) => {
	const { themes } = useGetThemes();
	const { visible, close } = props;
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);
	const [selectedTheme, setSelectedTheme] = useState<string>(
		config.theme ?? "dark",
	);

	function handleSelectTheme(e: React.MouseEvent<HTMLDivElement>): void {
		const theme = (e.currentTarget as HTMLDivElement).dataset.value;

		if (theme) {
			// document.documentElement.setAttribute("data-theme", theme);
			// localStorage.setItem("theme", theme);
			// setSelectedTheme(theme);
			setConfig("theme", theme);
			close();
		}
	}

	if (!visible) return null;

	return (
		<div
			className={`themes ${visible ? "themes__show" : ""}`}
			onClick={close}
		>
			<div
				className="themes__modal"
				onClick={(e) => {
					e.stopPropagation();
					handleSelectTheme(e);
				}}
			>
				{themes.map((theme, i) => (
					<div
						className={`themes__modal__theme theme-${theme.name} ${
							config.theme === theme.name
								? "themes--highlighted"
								: "none"
						}`}
						onClick={handleSelectTheme}
						data-value={theme.name}
						key={theme.name}
					>
						<div className="themes__modal__display">
							<div className="themes__info">
								<span>{theme.name}</span>
								{selectedTheme === theme.name && (
									<MdCheck
										style={{
											color: `${theme.textPrimary}`,
										}}
									/>
								)}
							</div>
							<div
								className="themes__colors"
								style={{
									backgroundColor: `${theme.backgroundPrimary}`,
									color: `${theme.textPrimary}`,
								}}
							>
								<div
									className="themes__colors__paint"
									style={{
										backgroundColor: `${theme.primary}`,
									}}
								></div>
								<div
									className="themes__colors__paint"
									style={{
										backgroundColor: `${theme.secondary}`,
									}}
								></div>
								<div
									className="themes__colors__paint"
									style={{
										backgroundColor: `${theme.textPrimary}`,
									}}
								></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
