import React, { useEffect, useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoMdColorFill } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaRegFileLines } from "react-icons/fa6";
import { CgTerminal } from "react-icons/cg";

import { Button } from "@components/Shared/Button";
import { ThemeModal } from "@components/Header/ThemeModal";

import "./Header.scss";
import { QuickbarModal } from "./QuickbarModal";
import { useTestStore } from "@store/TestStore";
import { Link } from "react-router-dom";
import { useTestConfigStore } from "@store/TestConfigStore";

export const Header: React.FC = () => {
	const [showThemes, setShowThemes] = useState<boolean>(false);
	const [showQuickbar, setShowQuickbar] = useTestStore((state) => [
		state.showQuickbar,
		state.setShowQuickbar,
	]);
	const [config] = useTestConfigStore((state) => [state.config]);

	useEffect(() => {
		document
			.querySelector(".navigation__logo__title")
			?.classList.remove("colorless");
	}, []);

	return (
		<header id="header">
			<ThemeModal
				visible={showThemes}
				close={() => setShowThemes(false)}
			/>
			<QuickbarModal
				visible={showQuickbar}
				close={() => setShowQuickbar(false)}
			/>
			<nav className="navigation">
				<div className="navigation__pages">
					<Link to="/">
						<FaRegKeyboard className="icon" />
						home
					</Link>
					<Link to="/about">
						<FaRegFileLines className="icon" />
						about
					</Link>
					<Link to="/settings">
						<IoSettings className="icon" />
						settings
					</Link>
				</div>
				<a className="navigation__logo" href="/">
					<h1 className="navigation__logo__title colorless">
						Typing Metrix
					</h1>
				</a>
				<div className="navigation__settings">
					<Button
						className="navigation__quickbar"
						onClick={() => setShowQuickbar(!showThemes)}
					>
						<CgTerminal className="icon" />
						quickbar
					</Button>
					<Button
						className="navigation__themes"
						onClick={() => setShowThemes(!showThemes)}
					>
						<IoMdColorFill className="icon" />
						{config.theme}
					</Button>
				</div>
			</nav>
		</header>
	);
};
