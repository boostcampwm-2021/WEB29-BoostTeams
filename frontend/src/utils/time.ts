export const timeSince = (timestamp: Date) => {
	const curr = new Date().getTime();
	const prev = timestamp.getTime();
	const pastSec = (curr - prev) / 1000;

	if (pastSec < 60) {
		return `${pastSec.toFixed(0)}초 전`;
	}
	if (pastSec < 3600) {
		return `${(pastSec / 60).toFixed(0)}분 전`;
	}
	if (pastSec < 86400) {
		return `${(pastSec / 3600).toFixed(0)}시간 전`;
	}
	if (pastSec < 2678400) {
		return `${(pastSec / 86400).toFixed(0)}일 전`;
	}
	return `${timestamp.getMonth() + 1}. ${timestamp.getDate()}.`;
};
