export class TimeInterval {
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    constructor(dateFrom?: Date, dateTo?: Date) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
    copy(): TimeInterval {
        return new TimeInterval(this.dateFrom, this.dateTo);
    }
    // TODO: remove setRange
    setRange(dateFrom: Date | undefined, dateTo: Date | undefined) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
