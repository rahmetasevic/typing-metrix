import { FaGithub } from "react-icons/fa";

import "./Footer.scss";

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__left">
				<div className="footer__copyright">
					<span style={{ verticalAlign: "middle" }}>© </span>
					typing metrix • all rights reserved
				</div>
			</div>
			<div className="footer__right">
				<a
					className="github-link"
					href="https://github.com/rahmetasevic/typing-metrix"
					target="_blank"
				>
					<FaGithub />
				</a>
			</div>
		</footer>
	);
};
