import { ModalProps } from "types";

import "./HelpModal.scss";

export const HelpModal = (props: ModalProps) => {
	const { visible, close } = props;

	if (!visible) return null;

	return (
		<div className={`help ${visible ? "help__show" : ""}`} onClick={close}>
			<div className="help__modal">
				<h3 className="help__modal__title">keyboard shortcuts:</h3>
				<ul className="help__shortcuts">
					<li className="help__shortcut">
						<kbd>tab</kbd>
						<span> - pause test</span>
					</li>
					<li className="help__shortcut">
						<kbd>ctrl+shift+q</kbd>
						<span> - open quickbar</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
