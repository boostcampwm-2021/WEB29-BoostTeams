const findTargetData = (storedDataList, targetId) => {
	let head = 0;
	let tail = storedDataList.length - 1;
	let mid = Math.floor((head + tail) / 2);
	while (head <= tail) {
		if (Number(storedDataList[mid].id) < Number(targetId)) head = mid + 1;
		else if (Number(storedDataList[mid].id) > Number(targetId)) tail = mid - 1;
		else return [storedDataList[mid], mid];
		mid = Math.floor((head + tail) / 2);
	}
	return [undefined, -1];
};

const isEmpty = (array) => (array.length === 0 ? true : false);

export { findTargetData, isEmpty };
