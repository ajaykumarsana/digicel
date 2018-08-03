import { Component, OnInit, Input } from '@angular/core';
import { PostTrialService, CmsService } from 'services';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  currentPageName: string;
  currentSection: string;
  currentPageIcon: string;
  headerStyle: 'standard' | 'image';

  constructor(public ptueService: PostTrialService, public cms: CmsService) { }

  ngOnInit() {
    this.headerStyle = this.ptueService.getCurrentPage().headerStyle;
    this.currentPageName = this.ptueService.getCurrentPage().name;
    this.currentSection = this.ptueService.getCurrentPage().section;
    this.currentPageIcon = this.ptueService.getCurrentPage().iconClass;

  }

}

