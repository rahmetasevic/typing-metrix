import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TfiHelpAlt } from "react-icons/tfi";
import { IoLanguageSharp } from "react-icons/io5";

import { Button } from "@components/Shared/Button";
import { HelpModal } from "./HelpModal";
import { LanguageModal } from "./LanguageModal";

import "./Footer.scss";

export const Footer = () => {
	const [showHelp, setShowHelp] = useState<boolean>(false);
	const [showLanguage, setShowLanguage] = useState<boolean>(false);

	return (
		<footer className="footer">
			<LanguageModal
				visible={showLanguage}
				close={() => setShowLanguage(false)}
			/>
			<HelpModal visible={showHelp} close={() => setShowHelp(false)} />
			<div className="footer__section">
				<Button
					className="footer__section__lang"
					type="button"
					onClick={() => setShowLanguage(!showLanguage)}
				>
					<IoLanguageSharp />
					<span>language</span>
				</Button>
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
