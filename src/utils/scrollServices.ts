export const scrollSmoothToElement = (element: Element) => {
	setTimeout(() => {
		element.scrollIntoView({
			block: 'end',
			behavior: 'smooth',
		});
	}, 100);
};
