import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { CmsService, ProspectTeamMember, TeamService} from 'services';

@Component({
  selector: 'app-team-display',
  templateUrl: './team-display.component.html',
  styleUrls: ['./team-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamDisplayComponent implements OnInit {
  @Input() title: string;
  @Input() deletableMembers: boolean;
  @Input() displayMode: 'price' | 'device';
  @Input() includeDevices: boolean;
  @Input() addingTeamMember = false;
  @Input() editable = false;
  @Input() showPrice = true;
  @Output() onSelectDevice: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMemberRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectServicePack: EventEmitter<any> = new EventEmitter<any>();

  public team: ProspectTeamMember[];

  constructor(
    public cms: CmsService,
    private teamService: TeamService
  ) {
  }

  ngOnInit() {
    this.team = this.teamService.team;
  }

  memberRemoved(teamMember) {
    this.onMemberRemoved.emit(teamMember);
  }

  selectDevice(teamMember: ProspectTeamMember) {
    this.onSelectDevice.emit(teamMember);
  }

  selectServicePack(teamMember: ProspectTeamMember) {
    this.onSelectServicePack.emit(teamMember);
  }
}
