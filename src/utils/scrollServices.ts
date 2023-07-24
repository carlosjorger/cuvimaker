export const scrollSmoothToElement = (element: Element) => {
	setTimeout(() => {
		if (element instanceof Element) {
			element.scrollIntoView({
				block: 'end',
				behavior: 'smooth',
			});
		}
	}, 100);
};
