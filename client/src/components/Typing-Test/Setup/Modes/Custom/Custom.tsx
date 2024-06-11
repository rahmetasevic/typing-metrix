import React, { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { RiUploadLine } from "react-icons/ri";
import { CgRemove } from "react-icons/cg";

import { Button } from "@components/Common/Button";

import "./Custom.scss";
import { useFormContext } from "react-hook-form";

export const Custom = () => {
	const { register } = useFormContext();

	return (
		<div className="custom">
			<div className="custom__actions">
				<Button className="custom__btn__save" type="button">
					<CiBookmark />
					<span className="custom__btn__text">Save</span>
				</Button>
				<Button className="custom__btn__import" type="button">
					<RiUploadLine />
					<span className="custom__btn__text">Import File</span>
				</Button>
				<Button className="custom__btn__clear" type="button">
					<CgRemove />
					<span className="custom__btn__text">Clear</span>
				</Button>
			</div>
			<div className="custom__text">
				<textarea
					className="custom__text__area"
					spellCheck={false}
					defaultValue="Brown jars prevented the mixture from freezing too quickly"
					{...register("filter.custom")}
				/>
			</div>
			<div className="custom__recents">
				<span>Recents:</span>
			</div>
		</div>
	);
};
