export type FilterProps = {
	name: string;
	options: string[] | null;
	value: string | null;
};

export type ModalProps = {
	visible: boolean;
	close: () => void;
};
