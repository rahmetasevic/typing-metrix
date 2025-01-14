export function shuffleArray(arr: string[]): string[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function convertToBoolean(x: string): boolean {
	return x === "on" ? true : false;
}

export function addTransition(className: string): void {
	const isHidden = document
		.querySelector(className)
		?.classList.contains("hidden");
	if (!isHidden) {
		document.querySelector(className)?.classList.add("hidden");
		setTimeout(() => {
			document.querySelector(className)?.classList.remove("hidden");
		}, 200);
	}
}
