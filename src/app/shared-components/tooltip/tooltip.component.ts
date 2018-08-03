import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() title: string;
  @Input() desc: string;
  @Input() isShowing: boolean;
  public hasTitle: boolean;

  constructor(public cms: CmsService) {
    if (this.title) {
      this.hasTitle = true;
    }
  }

  ngOnInit() {
    this.isShowing = false;
  }

  toggleTooltip(event) {
    if (this.isShowing) {
      this.isShowing = false;
      event.target.parentElement.nextElementSibling.classList.add('hide');
    } else {
      this.isShowing = true;
      event.target.parentElement.nextElementSibling.classList.remove('hide');
    }
  }

}
