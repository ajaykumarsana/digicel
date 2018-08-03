import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CallDirections, CmsService, Analytics } from 'services';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-call-direction',
  templateUrl: './call-direction.component.html',
  styleUrls: ['./call-direction.component.scss']
})

export class CallDirectionComponent implements OnInit,  OnChanges {
  @Input() language: string = this.cms.getLanguage();
  @Input() provider: string = this.cms.getFromProvider('defaultTheme');
  @Input() analytics: Analytics;
  callDirections: CallDirections;
  isChartDataAvailable = false;
  public callDirectionChartLabels: string[] = this.getCallDirectionChartLabels();
  public callDirectionChartData: number[] = [];
  public callDirectionChartType = 'pie';
  public callDirectionChartColors: Array<Color> = this.getCallDirectionChartColors();
  public callDirectionChartHeight: string = this.cms.getFromProvider('internalExternalCallsHeight');
  public callDirectionChartWidth: string = this.cms.getFromProvider('internalExternalCallsWidth');
  public callDirectionChartOptions: any = {
    legend: {position: 'right' }
  };


  constructor(public cms: CmsService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.setCallDirectionChartLabels();
    }
    if (changes.provider) {
      this.setCallDirectionChartColors();
    }
    if (changes.analytics) {
      this.getCallDirectionData();
    }
  }

  getCallDirectionData() {
    if (this.analytics.callDirections
      && ((this.analytics.callDirections.internal !== 0) || (this.analytics.callDirections.external !== 0))
     ) {
      this.isChartDataAvailable = true;
    }
    this.callDirections = this.analytics.callDirections;
    this.updateCallDirectionData(this.callDirections);
  }

  getCallDirectionChartLabels() {
    let callDirectionChartLabels = [
      this.cms.get('internalCallLabel'),
      this.cms.get('externalCallLabel')
    ];
    return callDirectionChartLabels;
  }

  setCallDirectionChartLabels() {
    this.callDirectionChartLabels.length = 0;
    this.callDirectionChartLabels = this.getCallDirectionChartLabels();
  }

  getCallDirectionChartColors() {
    let callDirectionChartColors = [
      { backgroundColor: [
          this.cms.getFromProvider('chartDataColor1'),
          this.cms.getFromProvider('chartDataColor2')
        ]
      }
    ];
    return callDirectionChartColors;
  }

  setCallDirectionChartColors() {
    this.callDirectionChartColors.length = 0;
    this.callDirectionChartColors = this.getCallDirectionChartColors();
  }

  updateCallDirectionData(callDirections) {
    this.callDirectionChartData = Object.values(callDirections);
  }

  // events
  public callDirectionChartClicked(e: any): void {
    console.log(e);
  }

  public callDirectionChartHovered(e: any): void {
    console.log(e);
  }

}
