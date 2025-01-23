import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TfiHelpAlt } from "react-icons/tfi";

import { Button } from "@components/Shared/Button";
import { HelpModal } from "./HelpModal";

import "./Footer.scss";

export const Footer = () => {
	const [showHelp, setShowHelp] = useState<boolean>(false);

	return (
		<footer className="footer">
			<HelpModal visible={showHelp} close={() => setShowHelp(false)} />
			<div className="footer__section">
				<Button
					className="footer__section__help"
					type="button"
					onClick={() => setShowHelp(!showHelp)}
				>
					<TfiHelpAlt />
					<span>help</span>
				</Button>
				<a
					className="footer__section__git"
					href="https://github.com/rahmetasevic/typing-metrix"
					target="_blank"
				>
					<FaGithub />
					<span>github</span>
				</a>
			</div>
		</footer>
	);
};
