export type FilterProps = {
	name: string,
	options: string[],
	value: string
};

export type ModalProps = {
	visible: boolean,
	close: () => void
};