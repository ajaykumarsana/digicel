import { Component, OnInit } from '@angular/core';
import { PresenceService, Status, CmsService } from 'services';

@Component({
  selector: 'app-presence-selector',
  templateUrl: './presence-selector.component.html',
  styleUrls: ['./presence-selector.component.scss']
})
export class PresenceSelectorComponent implements OnInit {
  statuses: Status[] = ['available', 'busy', 'away', 'offline'];
  dropdownOpen = false;

  constructor(
    public presenceService: PresenceService,
    public cms: CmsService
  ) { }

  ngOnInit() {
  }

  setPresence(status: Status) {
    this.dropdownOpen = false;
    this.presenceService.setPresence(status, -20).subscribe();
  }

  closeDropdown() {
    setTimeout(() => this.dropdownOpen = false, 200);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
