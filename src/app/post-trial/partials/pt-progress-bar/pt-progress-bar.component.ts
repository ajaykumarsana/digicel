import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CmsService, PostTrialService } from 'services';

@Component({
  selector: 'app-pt-progress-bar',
  templateUrl: './pt-progress-bar.component.html',
  styleUrls: ['./pt-progress-bar.component.scss']
})
export class PtProgressBarComponent implements OnInit {

  public ptueSteps: Array<any>;
  public ptueSections: Array<any>;
  public currentSection: string;
  public currentSectionIndex: number;

  constructor(public cms: CmsService, private postTrialService: PostTrialService, private router: Router) { }

  ngOnInit() {
    this.updatePageData();
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        this.updatePageData();
      });
  }

  updatePageData() {
    this.ptueSections = this.postTrialService.ptueSections;
    this.ptueSteps = this.postTrialService.ptueSteps;
    this.currentSection = this.postTrialService.getCurrentPage().section;
    this.currentSectionIndex = this.postTrialService.getCurrentSectionIndex();

    this.ptueSections.forEach((page, i) => {
      page.sectionPassed = i <= this.currentSectionIndex;
    });

  }
}
