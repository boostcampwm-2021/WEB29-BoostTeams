export const parseId = (path: string) => {
	const regex = /\/(?<userId>[\d]*)(\/teams\/)?(?<teamId>[\d]*)?/;
	const userId = regex.exec(path).groups;
	return Object.values(userId).map((value) => Number(value));
};
