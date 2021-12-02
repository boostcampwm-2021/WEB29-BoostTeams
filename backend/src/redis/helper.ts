const findTargetData = (storedDataList, targetId) => {
	let head = 0;
	let tail = storedDataList.length - 1;
	let mid = Math.floor((head + tail) / 2);

	while (head <= tail) {
		if (Number(storedDataList[mid].id) < Number(targetId)) head = mid + 1;
		else if (Number(storedDataList[mid].id) > Number(targetId)) tail = mid - 1;
		else return { targetData: storedDataList[mid], targetDataIndex: mid };
		mid = Math.floor((head + tail) / 2);
	}
	return { targetData: undefined, targetDataIndex: -1 };
};

export { findTargetData };
