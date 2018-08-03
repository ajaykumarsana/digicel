import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostTrialService, CmsService } from 'services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Input() continueButtonText;
  @Input() backButtonText;
  @Input() cancelButtonText;
  @Input() hasBackButton = true;
  @Input() hasCancelButton = true;
  @Input() disabled = false;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  // @Output() onContinue: EventEmitter<any> = new EventEmitter<any>();

  currentPage;
  currentPageIndex: number;
  steps: Array<any>;

// @todo: allow continue/back/cancel to be customizable
  constructor(public ptueService: PostTrialService, public cms: CmsService, private router: Router) { }

  ngOnInit() {
    this.steps = this.ptueService.ptueSteps;
    this.currentPage = this.ptueService.getCurrentPage();
    this.currentPageIndex = this.ptueService.getCurrentPageIndex();

    this.continueButtonText = this.cms.get('actionBarContinueButton');
    this.backButtonText = this.cms.get('actionBarBackButton');
    this.cancelButtonText = this.cms.get('actionBarCancelButton');
  }

  goNextStep() {
    this.onSubmit.emit();
    this.router.navigate([this.ptueService.getNextStepUrl()]);

  }

  goPreviousStep() {
    this.router.navigate([this.ptueService.getPreviousStepUrl()]);
  }

  goFirstStep(e) {
    e.preventDefault();
    this.router.navigate([this.ptueService.getFirstStepUrl()]);
  }

}
