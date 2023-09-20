export type ResumePathsType = {
	params: {
		id: string;
	};
};
export const getResumePaths = () => {
	return [
		{ params: { id: '1' } },
		{ params: { id: '2' } },
		{ params: { id: '3' } },
		{ params: { id: '4' } },
		{ params: { id: '5' } },
	];
};
