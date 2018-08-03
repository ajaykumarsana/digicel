import { Component, OnInit, Input } from '@angular/core';
import { User, CmsService, UserService } from 'services';
import { DialogService } from 'ng2-bootstrap-modal';
import { WebcamModalComponent } from '../../shared-components';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    public cms: CmsService,
    private userService: UserService,
    private dialogService: DialogService
  ) { }

  ngOnInit() { }

  callWebCamModal() {
    // will get error if we don't use setTimeout
    setTimeout(() => {
      this.promptModals();
    }, 1);
  }

  promptModals() {
      this.dialogService.addDialog(WebcamModalComponent).subscribe(() => {
        this.handleModalFinish();
      });
    }

  handleModalFinish() {
    this.dialogService.removeAll();
  }

}
