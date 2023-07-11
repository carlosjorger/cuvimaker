export class TimeInterval {
	dateFrom: Date | undefined;
	dateTo: Date | undefined;
	constructor(dateFrom?: Date, dateTo?: Date) {
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
	}
}
