import React, { useState } from "react";
import { GiKeyboard } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import { IoMdColorFill } from "react-icons/io";

import { Button } from "@components/Common/Button";
import { ThemeModal } from "@components/Header/ThemeModal/ThemeModal";

import "./Header.scss";

// implement sign in button similar on Stripe website

export const Header: React.FC = () => {
	const [showThemes, setShowThemes] = useState<boolean>(false);

	return (
		<header id="header">
			<ThemeModal
				visible={showThemes}
				close={() => setShowThemes(false)}
			/>
			<nav className="navigation">
				<div className="navigation__pages">
					<a className="navigation__home" href="/">
						<GiKeyboard />
					</a>
				</div>
				<a className="navigation__logo" href="/">
					Typing Metrix
				</a>
				<div className="navigation__settings">
					<Button
						className="navigation__themes"
						onClick={() => setShowThemes(!showThemes)}
					>
						<IoMdColorFill />
					</Button>
					<Button className="navigation__login">
						<IoIosLogIn />
					</Button>
				</div>
			</nav>
		</header>
	);
};
