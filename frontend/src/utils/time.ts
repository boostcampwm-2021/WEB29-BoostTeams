const TimeToSec = {
	MinuteToSec: 60,
	HourToSec: 3600,
	DayToSec: 86400,
	MonthToSec: 2678400,
};

export const timeSince = (date: Date): string => {
	const curr = new Date().getTime();
	const prev = date.getTime();
	const pastSec = (curr - prev) / 1000;

	if (pastSec < TimeToSec.DayToSec) {
		return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
	}
	return `${date.getMonth() + 1}. ${date.getDate()}.`;
};

export const timeToString = (date: Date): string => {
	return `${date.getMonth() + 1}. ${date.getDate()}. ${date.getHours()}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
};
