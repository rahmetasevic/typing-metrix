import React, { useState } from "react";
import { CgKeyboard } from "react-icons/cg";
import { IoIosLogIn } from "react-icons/io";
import { IoMdColorFill } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaRegFileLines } from "react-icons/fa6";

import { Button } from "@components/Shared/Button";
import { ThemeModal } from "@components/Header/ThemeModal";

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
						<CgKeyboard
							className="icon"
							style={{ transform: "scale(1.15)" }}
						/>
					</a>
					<Button>
						<FaRegFileLines className="icon" />
					</Button>
					<Button>
						<IoSettings className="icon" />
					</Button>
				</div>
				<a className="navigation__logo" href="/">
					Typing Metrix
				</a>
				<div className="navigation__settings">
					<Button
						className="navigation__themes"
						onClick={() => setShowThemes(!showThemes)}
					>
						<IoMdColorFill className="icon" />
					</Button>
					<Button className="navigation__login">
						<IoIosLogIn className="icon" />
					</Button>
				</div>
			</nav>
		</header>
	);
};
