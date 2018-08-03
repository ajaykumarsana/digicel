import { Component, OnInit, Input } from '@angular/core';
import { IsValidNumberPipe } from 'pipes';
import { CallLogEntry, CmsService, CallingService, GroupService } from 'services';

@Component({
  selector: 'app-call-log-entry',
  templateUrl: './call-log-entry.component.html',
  styleUrls: ['./call-log-entry.component.scss']
})
export class CallLogEntryComponent implements OnInit {
  @Input() call: CallLogEntry;

  constructor(
    public cms: CmsService,
    private callingService: CallingService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    // If phone number is invalid, it's probably an extension
    // Try looking it up in the team directory
    const validNumberPipe = new IsValidNumberPipe(this.cms);
    if (!validNumberPipe.transform(this.call.phoneNumber)) {
      this.call.phoneNumber = this.groupService.lookupNumberByExt(this.call.phoneNumber);
    }
  }

  dial() {
    if (this.call.phoneNumber) {
      this.callingService.initiateSoftphoneCall(this.call.phoneNumber);
    }
  }

}
