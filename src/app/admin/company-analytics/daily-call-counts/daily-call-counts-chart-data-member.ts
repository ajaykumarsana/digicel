export class DailyCallCountsChartDataMember {
    data: number[];
    label: string;

    constructor(obj: {label: string, data?: number[]}) {
        this.label = obj.label;
        this.data = obj.data;
      }
}
