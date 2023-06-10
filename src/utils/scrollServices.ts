export const scrollSmoothToElement = (element: Element) => {
    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
};
