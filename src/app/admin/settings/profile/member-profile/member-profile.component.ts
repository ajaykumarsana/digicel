import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TeamMember, CmsService, UserService, Device, GroupService, FormValidationService, ToastService } from 'services';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  @Input() teamMember: TeamMember = new TeamMember({});
  @Input() type: 'self' | 'other' | 'newUser' | 'newAdmin' ;
  @Output() changedUserType = new EventEmitter();
  primaryDevice: Device;
  editMode = false;
  showDeleteModal = false;
  userEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public cms: CmsService,
    private userService: UserService,
    private groupService: GroupService,
    private formValidationService: FormValidationService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    if (this.teamMember.IMPId) {
      this.userService.getDevices(this.teamMember.IMPId).subscribe(devices => {
        if (devices && devices[0]) {
          this.primaryDevice = devices[0];
        }
      });
    }

    let isAdmin = this.teamMember.isAdmin();
    if (this.isNewUser()) {
      isAdmin = this.type === 'newAdmin';
    }

    this.userEditForm = this.fb.group({
      'firstName': [this.teamMember.firstName],
      'lastName': [this.teamMember.lastName],
      'email': [this.teamMember.emailAddress, this.formValidationService.emailValidator],
      'isAdmin': [isAdmin]
    });
  }

  closeForm() {
    this.editMode = false;
  }

  save() {
    if (this.isNewUser()) {
      const patchBody = {};
      const users = [];
      const userObj = {};
      let changingUserType = false;
      for (let [key, control] of Object.entries(this.userEditForm.controls)) {
        if (key === 'isAdmin') {
          userObj['mainUser'] = !!control.value;
          if (this.teamMember.isAdmin !== userObj['mainUser']) {
            changingUserType = true;
          }
        } else if (control.value) {
          userObj[key] = control.value;
        }
      }
      users.push(userObj);
      patchBody['users'] = users;
      this.groupService.addMember(patchBody as {users: [{firstName: string, lastName: string, email: string}]}).subscribe(newMember => {
        this.type = 'other';
        this.teamMember = newMember;
      }, err => {
        this.toastService.toast(err, 'danger', 8000, true);
      });
    } else {
      const patchBody = {};
      let changingUserType = false;
      for (let [key, control] of Object.entries(this.userEditForm.controls)) {
        if (key === 'isAdmin') {
          patchBody['mainUser'] = !!control.value;
          if (this.teamMember.isAdmin !== patchBody['mainUser']) {
            changingUserType = true;
          }
        } else if (control.value) {
          patchBody[key] = control.value;
        }
      }
      this.groupService.updateMember(this.teamMember, patchBody).subscribe(updatedTeamMember => {
        this.teamMember = updatedTeamMember;
        if (changingUserType) {
          this.changedUserType.emit();
        }
      });
    }
    this.closeForm();
  }

  isNewUser(): boolean {
    return ['newAdmin', 'newUser'].includes(this.type);
  }

  launchDeleteModal() {
    this.showDeleteModal = true;
  }

  killDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteMember() {
    this.groupService.deleteMember(this.teamMember).subscribe(() => {
      console.log('member deleted');
      this.changedUserType.emit();
    },
    err => {
      console.log('member NOT deleted ', err);
    }
  );
  }

}
