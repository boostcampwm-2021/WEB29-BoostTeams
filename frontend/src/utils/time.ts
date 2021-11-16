const TimeToSec = {
	MinuteToSec: 60,
	HourToSec: 3600,
	DayToSec: 86400,
	MonthToSec: 2678400,
};

export const timeSince = (timestamp: Date) => {
	const curr = new Date().getTime();
	const prev = timestamp.getTime();
	const pastSec = (curr - prev) / 1000;

	if (pastSec < TimeToSec.MinuteToSec) {
		return `${pastSec.toFixed(0)}초 전`;
	}
	if (pastSec < TimeToSec.HourToSec) {
		return `${(pastSec / TimeToSec.MinuteToSec).toFixed(0)}분 전`;
	}
	if (pastSec < TimeToSec.DayToSec) {
		return `${(pastSec / TimeToSec.HourToSec).toFixed(0)}시간 전`;
	}
	if (pastSec < TimeToSec.MonthToSec) {
		return `${(pastSec / TimeToSec.DayToSec).toFixed(0)}일 전`;
	}
	return `${timestamp.getMonth() + 1}. ${timestamp.getDate()}.`;
};

export const timeToString = (timestamp: Date) => {
	return `${timestamp.getMonth() + 1}. ${timestamp.getDate()}. ${timestamp.getHours()}:${timestamp
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
};
