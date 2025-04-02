import {
	isConfigStateChanged,
	useTestConfigStore,
} from "@store/TestConfigStore";

import { Button } from "../Button";

import "./ResetConfigButton.scss";

export type ResetProps = {
	config: {
		values: string;
	};
};

export const ResetConfigButton = (props: ResetProps) => {
	const { values: title } = props.config;
	const [resetConfig, currentState] = useTestConfigStore((state) => [
		state.resetConfig,
		state.config,
	]);
	const hasChanges = isConfigStateChanged(currentState);

	return (
		<Button
			className="reset__button"
			onClick={resetConfig}
			disabled={!hasChanges}
		>
			{title}
		</Button>
	);
};
