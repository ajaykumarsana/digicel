import { Component, HostListener } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { CmsService } from 'services';

@Component({
  selector: 'app-webcam-modal',
  templateUrl: './webcam-modal.component.html',
  styleUrls: ['./webcam-modal.component.scss']
})
export class WebcamModalComponent extends DialogComponent<{}, string> {

  constructor(
    public cms: CmsService,
    public dialogService: DialogService
  ) {
    super(dialogService);
   }

  finish() {
    this.result = 'success';
    this.close();
  }

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    if (event.keyCode === 27) {
        this.finish();
    }
  }

}
