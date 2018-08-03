import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CallTypes, CmsService, Analytics } from 'services';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-call-type',
  templateUrl: './call-type.component.html',
  styleUrls: ['./call-type.component.scss']
})

export class CallTypeComponent implements OnInit, OnChanges {
  @Input() language: string = this.cms.getLanguage();
  @Input() provider: string = this.cms.getFromProvider('defaultTheme');
  @Input() analytics: Analytics;
  callTypes: CallTypes;
  isChartDataAvailable = false;
  public callTypeChartLabels: string[] = this.getCallTypeChartLabels();
  public callTypeChartData: number[] = [];
  public callTypeChartType = 'pie';
  public callTypeChartColors: Array<Color> = this.getCallTypeChartColors();
  public callTypeChartHeight: string = this.cms.getFromProvider('callTypesHeight');
  public callTypeChartWidth: string = this.cms.getFromProvider('callTypesWidth');
  public callTypeChartOptions: any = {
    legend: {position: 'right' }
  };

  constructor(public cms: CmsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.setCallTypeChartLabels();
    }
    if (changes.provider) {
      this.setCallTypeChartColors();
    }
    if (changes.analytics) {
      this.getCallTypeData();
    }
  }

  getCallTypeData() {
    if ( this.analytics.callTypes
      && ((this.analytics.callTypes.missed !== 0) || (this.analytics.callTypes.placed !== 0) || (this.analytics.callTypes.recieved !== 0))
    ) {
      this.isChartDataAvailable = true;
    }
    this.callTypes = this.analytics.callTypes;
    this.updateCallTypeData(this.callTypes);
  }

  getCallTypeChartLabels() {
    let callTypeChartLabels = [
      this.cms.get('callTypesRecievedLabel'),
      this.cms.get('callTypesMissedLabel'),
      this.cms.get('callTypesPlacedLabel')
    ];
    return callTypeChartLabels;
  }

  setCallTypeChartLabels() {
    this.callTypeChartLabels.length = 0;
    this.callTypeChartLabels = this.getCallTypeChartLabels();
  }

  getCallTypeChartColors() {
    let callDirectionChartColors = [
      { backgroundColor: [
        this.cms.getFromProvider('chartDataColor1'),
        this.cms.getFromProvider('chartDataColor2'),
        this.cms.getFromProvider('chartDataColor3')
        ]
      }
    ];
    return callDirectionChartColors;
  }

  setCallTypeChartColors() {
    this.callTypeChartColors.length = 0;
    this.callTypeChartColors = this.getCallTypeChartColors();
  }

  updateCallTypeData(callTypes) {
    this.callTypeChartData = Object.values(callTypes);
  }

  // events
  public callTypeChartClicked(e: any): void {
    console.log(e);
  }

  public callTypeChartHovered(e: any): void {
    console.log(e);
  }

}
