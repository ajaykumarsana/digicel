import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group, CmsService, GroupService, UserService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  group: Group;
  editMode = false;
  showDeleteModal = false;
  newName = '';

  constructor(
    private router: Router,
    public cms: CmsService,
    private groupService: GroupService,
    private userService: UserService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('myCompany'));
  }

  ngOnInit() {
    this.group = this.groupService.group;
  }

  clearForm() {
    this.newName = '';
  }

  save() {
    if (this.newName) {
      this.groupService.updateGroup({groupName: this.newName}).subscribe(() => {
        this.group.groupName = this.newName;
        this.clearForm();
      });
    }
    this.editMode = false;
  }

  cancel() {
    this.clearForm();
    this.editMode = false;
  }

  launchDeleteModal() {
    this.showDeleteModal = true;
  }

  killDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteGroup() {
    this.groupService.deleteGroup().subscribe(() => {
      console.log('group deleted');
      this.userService.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    },
    err => {
      console.log('group NOT deleted ', err);
    }
  );
  }

}
