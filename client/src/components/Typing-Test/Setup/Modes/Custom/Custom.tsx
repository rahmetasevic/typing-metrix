import React, { useState } from "react";

import { Button } from "@components/Common/Button";

import "./Custom.scss";

export const Custom = () => {
	const [customText, setCustomText] = useState<string>("...");

	return (
		<div className="custom">
			<div className="custom__actions">
				<Button className="custom__btn__save" type="button">
					Save
				</Button>
				<Button className="custom__btn__import" type="button">
					Import File
				</Button>
				<Button className="custom__btn__clear" type="button">
					Clear
				</Button>
			</div>
			<div className="custom__text">
				<textarea
					className="custom__text__area"
					value={customText}
					onChange={(e) => setCustomText(e.target.value)}
				/>
			</div>
		</div>
	);
};
