import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DailyCallCounts, GroupService, CmsService, Analytics } from 'services';
import { DailyCallCountsChartDataMember } from './daily-call-counts-chart-data-member';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-daily-call-counts',
  templateUrl: './daily-call-counts.component.html',
  styleUrls: ['./daily-call-counts.component.scss']
})
export class DailyCallCountsComponent implements OnInit, OnChanges {
  @Input() language: string = this.cms.getLanguage();
  @Input() provider: string = this.cms.getFromProvider('defaultTheme');
  @Input() analytics: Analytics;
  dailyCallCounts: any[];
  buckets: any[];
  isChartDataAvailable = false;
  stackedActive = false;

  private stackedConfig = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {position : 'right'},
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };
  private barConfig = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {position : 'right'}
  };
  public dailyCallCountsChartOptions: any = this.getChartOptions();
  public dailyCallCountsChartLabels: string[] = this.getLabelsForPastWeek();
  public dailyCallCountsChartType = 'bar';
  public dailyCallCountsChartLegend = true;
  public dailyCallCountsChartData: any[] = [];
  private colorArray = this.getDailyCallCountsChartColors();
  public dailyCallCountsChartHeight: string = this.cms.getFromProvider('dailyCallCountsHeight');
  public dailyCallCountsChartWidth: string = this.cms.getFromProvider('dailyCallCountsWidth');
  public dailyCallCountsChartColors: Array<Color> = this.getColorArray();

  constructor(private groupService: GroupService, public cms: CmsService) {
  }

  ngOnInit() {
    this.getColorArray();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
    }
    if (changes.provider) {
      this.setColorArray();
    }
    if (changes.analytics) {
      this.getDailyCallCountsData();
    }
  }

  getDailyCallCountsChartColors() {
    let dailyCallCountsChartColors = [
      this.cms.getFromProvider('chartDataColor1'),
      this.cms.getFromProvider('chartDataColor2'),
      this.cms.getFromProvider('chartDataColor3'),
      this.cms.getFromProvider('chartDataColor4'),
      this.cms.getFromProvider('chartDataColor5')
    ];
    return dailyCallCountsChartColors;
  }

  getColorArray() {
    let colorObjArray = [];
    this.colorArray.forEach(color => {
      let colorObj = this.createColorsObj(color);
      colorObjArray.push(colorObj);
    });
    return colorObjArray;
  }

  setColorArray() {
    this.colorArray.length = 0;
    this.colorArray = this.getDailyCallCountsChartColors();
    this.dailyCallCountsChartColors.length = 0;
    this.dailyCallCountsChartColors = this.getColorArray();
  }

  getDailyCallCountsData() {
    this.dailyCallCounts = this.analytics.dailyCallCounts;
    this.updateDailyCallCountsData();
  }

  createColorsObj(color) {
    let colorArray = [];
    for (let i = 0; i < this.buckets.length; i++ ) {
      colorArray.push(color);
    }
    let colorsObj = {backgroundColor: colorArray};
    return colorsObj;
  }

  updateDailyCallCountsData() {
    let uniqueUserArray = this.getUniqueUserArray();
    let uniqueUserStats = this.getUniqueUserStats(uniqueUserArray);
    let uniqueLabels = this.getUserIDLabelsforUniqueUsers(uniqueUserArray);
    let dailyCallCountsChartData = this.createBarChartData(uniqueLabels, uniqueUserStats);
  }

  getUniqueUserStats(uniqueUserArray) {
    let masterArray = [];
    let filteredArray = [];
    for (let i = 0, l = uniqueUserArray.length; i < l; i++) {
      filteredArray = this.dailyCallCounts.filter(function(item) {
        return item.userId === uniqueUserArray[i];
      });
      masterArray.push(filteredArray);
    }
    return masterArray;
  }

  createBarChartData(uniqueUserArray, uniqueUserStats) {
    let dailyCallCountsChartData = [];
    uniqueUserArray.forEach((item, index) => {
      let dailyCallCountsMember = new DailyCallCountsChartDataMember({ label: item, data: null });
      dailyCallCountsMember.label = item;
      dailyCallCountsMember.data = this.getChartDataForUser(item, index, uniqueUserStats);
      dailyCallCountsChartData.push(dailyCallCountsMember);
    });
    this.dailyCallCountsChartData = dailyCallCountsChartData;
    if (this.dailyCallCountsChartData.length !== 0) {
      this.isChartDataAvailable = true;
    }
  }

  getChartDataForUser(userId, index , uniqueUserStats) {
    let dataArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let data = this.searchStatsForTimeStampValue( this.buckets[i], uniqueUserStats[index]);
      if (data === undefined) {
        data = 0;
      }
      dataArray.push(data);
    }
    return dataArray;
  }

  searchStatsForTimeStampValue(timestampKey, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].timestamp === timestampKey) {
        return arr[i].count;
      }
    }
  }

  getUserIDLabelsforUniqueUsers(uniqueUserArray) {
    let teamLabels = [];
    uniqueUserArray.forEach(element => {
      let label = this.groupService.getMemberById(element);
      if (label) {
        teamLabels.push(label.fullName);
      }
    });
    return teamLabels;
  }

  getUniqueUserArray() {
    this.dailyCallCounts = Object.values(this.dailyCallCounts);
    let userIDArray = [];
    let filteredUserIDArray = [];
    this.dailyCallCounts.forEach(element => {
      userIDArray.push(element.userId);
    });
    filteredUserIDArray = userIDArray.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    return filteredUserIDArray;
  }

  getLabelForUserID(userid) {
    let userLabels = [];
    return userLabels;
  }

  formatDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if ( dd < 10) {
      dd = '0' + dd;
    }

    if ( mm < 10) {
      mm = '0' + mm;
    }

    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  getLabelsForPastWeek(): string[] {
    let result = [];
    let buckets = [];
    for (let i = 0; i < 7; i++) {
      let d = new Date();
      let offSet = d.getTimezoneOffset() / 60;
      let startOfDay = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), - offSet);
      let newD = startOfDay.getTime() / 1000;
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      startOfDay.setDate(startOfDay.getDate() - i);
      newD = startOfDay.getTime() / 1000;
      let date = this.formatDate(d);
      result.push(date);
      buckets.push(newD);
    }
    result.reverse();
    this.buckets = buckets.reverse();
    return(result);
  }

  // events
  public dailyCallCountsChartClicked(e: any): void {
    console.log(e);
  }

  public dailyCallCountsChartHovered(e: any): void {
    console.log(e);
  }
  toggleChart() {
    this.stackedActive = !this.stackedActive;
    this.setChartOptions(this.stackedActive);
  }

  getChartOptions() {
    if (this.stackedActive) {
      return this.stackedConfig;
    } else {
       return this.barConfig;
    }
  }

  setChartOptions(stackedActive) {
    if (stackedActive) {
      this.dailyCallCountsChartOptions = this.stackedConfig;
    } else {
       this.dailyCallCountsChartOptions = this.barConfig;
    }
  }

}
