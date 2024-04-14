import React from "react";
import { GiKeyboard } from "react-icons/gi";

import "./Header.scss";

export const Header: React.FC = () => {
	// implement sign in button similar on Stripe website

	return (
		<header id="header">
			<nav>
				<a className="icon" href="/">
					<GiKeyboard />
				</a>
				<a className="logo" href="/">
					Typing Metrix
				</a>
				<button type="button">Sign in</button>
			</nav>
		</header>
	);
};
