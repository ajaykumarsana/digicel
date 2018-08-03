import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { GroupService, UserService, FormValidationService, CmsService } from 'services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ControlMessagesComponent } from 'components';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  loading = false;
  error: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private fb: FormBuilder,
    public cms: CmsService,
    private formValidationService: FormValidationService,
    private titleService: Title
  ) {
      this.titleService.setTitle(this.cms.get('loginTitle'));
      this.adminLoginForm = this.fb.group({
        'email': [null, Validators.compose([Validators.required, this.formValidationService.emailValidator])],
        'password': [null, Validators.compose([Validators.required])]
      });
   }

  ngOnInit() {
  }

  login() {
    this.error = undefined;
    this.loading = true;
    this.userService.login(this.adminLoginForm.value.email, this.adminLoginForm.value.password).subscribe((res) => {
      this.router.navigate(['/admin']);
    }, err => {
      this.loading = false;
      this.error = err.error.statusMsg;
    });
  }

  forgotPassword() {
    console.log('Need to add \'forgot passsword\' functionality.');
  }

}
