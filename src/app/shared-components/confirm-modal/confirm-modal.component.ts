import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() text: string;
  @Input() cancelButtonText: string;
  @Input() confirmButtonText: string;
  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();

  constructor(public cms: CmsService) { }

  ngOnInit() {
    if (!this.cancelButtonText) {
      this.cancelButtonText = this.cms.get('cancel');
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }

}
