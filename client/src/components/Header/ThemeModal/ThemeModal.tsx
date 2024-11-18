import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { MdCheck } from "react-icons/md";

import { Button } from "@components/Shared/Button";
import { ModalProps } from "types/index";

import "./ThemeModal.scss";

export const ThemeModal = (props: ModalProps) => {
	const { visible, close } = props;
	const [selectedTheme, setSelectedTheme] = useState<string>("dark");
	const [themes, setThemes] = useState<any[]>([]);

	useEffect(() => {
		getThemes();
	}, []);

	async function getThemes(): Promise<void> {
		try {
			const res = await fetch("/public/themes/themes.json").then((r) =>
				r.json(),
			);

			setThemes(res);
		} catch (error) {
			console.log("error in getting themes data");
		}
	}

	function handleSelectTheme(e: React.MouseEvent<HTMLDivElement>): void {
		const val = (e.currentTarget as HTMLDivElement).dataset.value;

		if (val) {
			document.body.setAttribute("data-theme", val);
			setSelectedTheme(val);
		}
	}

	if (!visible) return null;

	return (
		<div
			className={`themes ${visible ? "themes__show" : ""}`}
			onClick={(e) => {
				e.stopPropagation();
				close();
			}}
		>
			<div className="themes__modal" onClick={handleSelectTheme}>
				{themes.map((theme, i) => (
					<div
						className={`themes__modal__theme theme-${theme.name} ${
							selectedTheme === theme.name
								? "themes--highlighted"
								: "none"
						}`}
						style={{
							backgroundColor: `${theme.backgroundPrimary}`,
							color: `${theme.textPrimary}`,
						}}
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
							<div className="themes__colors">
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
