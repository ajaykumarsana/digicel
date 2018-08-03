import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Input() hasBackButton = true;
  @Input() disabled = false;

  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onBack: EventEmitter<any> = new EventEmitter();

  constructor(public cms: CmsService) { }

  ngOnInit() {
    this.disabled = false;
  }

  continues() {
    this.onContinue.emit();
  }

  backs() {
    this.onBack.emit();
  }

}
