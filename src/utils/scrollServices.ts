export const scrollSmoothToElement = (element: Element) => {
	setTimeout(() => {
		if (element instanceof Element) {
			element.scrollIntoView({
				block: 'center',
				behavior: 'smooth',
			});
		}
	}, 100);
};
