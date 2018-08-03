import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HuntGroup, HuntGroupService, HuntGroupMember } from 'services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from 'services';

@Component ({
  selector: 'app-hunt-group',
  templateUrl: './hunt-group.component.html',
  styleUrls: ['./hunt-group.component.scss']
})
export class HuntGroupComponent implements OnInit {
  @Input() huntGroupData: any;
  @Input() index: number;
  @Output() formBodyState: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteHuntGroup = new EventEmitter<{huntGroup: HuntGroup, index: number}>();
  @Output() errorMessage = new EventEmitter<{huntGroup: HuntGroup, error: any}>();

  public huntGroup: HuntGroup;
  public setup: FormGroup;
  public huntGroupMembers: HuntGroupMember[];
  public isDeleted = false;

  constructor(fb: FormBuilder, public cms: CmsService, private huntGroupService: HuntGroupService) {
    this.setup = fb.group({
      huntGroupName: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.huntGroup = this.huntGroupData.huntGroup;
    this.huntGroupMembers = this.createHuntGroupMembers(this.huntGroupData.teamMembers || []);
  }

  toggleActiveMember(id: string) {
    let index = this.checkedIndex(id);
    if (index === -1) {
      let huntGroupMember = this.getHunGroupMember(id);
      this.huntGroup.members.push(huntGroupMember);
    } else {
      this.huntGroup.members.splice(index, 1);
    }
  }

  checkedIndex(id: string): number {
    return this.arrayObjectIndexOf(this.huntGroup.members, id, 'userId');
  }

  isChecked(id: string): boolean {
    return this.checkedIndex(id) !== -1;
  }

  isValid(): boolean {
    return this.huntGroup.members.length && !this.setup.controls['huntGroupName'].invalid;
  }

  openBody() {
    this.huntGroupData.open = true;
    this.formBodyState.emit({
      'openState': true,
      'groupIndex': this.index
    });
  }

  closeHGUI() {
    this.huntGroupData.open = false;
    this.formBodyState.emit({
      'openState': true,
      'groupIndex': this.index
    });
  }

  // Creates a hunt group on the server
  saveHuntGroup() {
    if (this.huntGroup.huntGroupId) {
      this.huntGroupService.removeFromTrack(this.huntGroup);
      // return this.huntGroupService.editHuntGroup(this.huntGroup);
      this.huntGroupService.editHuntGroup(this.huntGroup).subscribe(
        (response) => {
          this.closeHGUI();
          let currHG = this.mapResponse(response);
          this.huntGroupService.trackHuntGroup(currHG);
        },
        err => {
          console.log('Err in the edit huntgroup');
        }
      );



    } else {
      this.huntGroupService.createHuntGroup(this.huntGroup).subscribe(
        (response) => {
        this.closeHGUI();
        let currHG = this.mapResponse(response);
        this.huntGroupService.trackHuntGroup(currHG);
      }, err => {
        this.errorMessage.emit({
          'huntGroup': this.huntGroup,
          'error': err
        });
      });
    }
  }

  delete(event) {
    this.removeHuntGroup().subscribe(() => {
      this.closeHGUI();
    });
  }

  // Deletes a hunt group on the server
  removeHuntGroup() {
    return this.huntGroupService.deleteHuntGroup(this.huntGroup).map(response => {
      this.deleteHuntGroup.emit({
          'huntGroup': this.huntGroup,
          'index': this.index
      });
      this.isDeleted = true;
    });
  }

  createHuntGroupMembers(members): HuntGroupMember[] {
    let hgMemberArray = [];
    members.forEach(member => {
      let hgm = {
        extension: member.extension,
        firstName: member.firstName,
        lastName: member.lastName,
        phoneNumber: member.number,
        userId: member.userId,
      };
      let hgMember = new HuntGroupMember(hgm);
      hgMemberArray.push(hgMember);
    });
    return hgMemberArray;
  }

  getHunGroupMember(memberId) {
    let wantedMember;
    this.huntGroupMembers.forEach((member, index) => {
      if (this.huntGroupMembers[index].userId === memberId) {
        wantedMember = this.huntGroupMembers[index];
      }
    });
    return wantedMember;
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) {
        return i;
      }
    }
    return -1;
  }

  memberInGroup(userId) {
    let check = this.arrayObjectIndexOf(this.huntGroup.members, userId, 'userId');
    return check !== -1;
  }
  mapResponse(response): HuntGroup  {
    let res = this.huntGroup;
    res.huntGroupId = response['huntGroupId'];
    res.phoneNumber = response['phoneNumber'];
    res.timezone = response['timezone'];
    res.language = response['language'];
    res.huntGroupName = response['huntGroupName'] || this.huntGroup.huntGroupName;
    res.extension = response['extension'];
    res.policy = response['policy'];

    return res;
  }

}
