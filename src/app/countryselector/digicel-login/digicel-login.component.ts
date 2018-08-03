import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { GroupService, UserService, FormValidationService, CmsService, STATES, EXPYEARS} from 'services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ControlMessagesComponent } from 'components';

@Component({
  selector: 'app-digicel-login',
  templateUrl: './digicel-login.component.html',
  styleUrls: ['./digicel-login.component.scss']
})
export class DigicelLoginComponent implements OnInit {

  digicelLoginForm: FormGroup;
  loading = false;
  error: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private fb: FormBuilder,
    public cms: CmsService,
    private formValidationService: FormValidationService
  ) {
      this.digicelLoginForm = this.fb.group({
        'email': [null, Validators.compose([Validators.required, this.formValidationService.emailValidator])],
        'password': [null, Validators.compose([Validators.required])],
        'loginPath': [null, Validators.required]
      });
   }

  ngOnInit() {
  }

  login() {
    this.error = undefined;
    this.loading = true;
      this.userService.login(this.digicelLoginForm.value.email, this.digicelLoginForm.value.password).subscribe((res) => {
        this.router.navigate(['/' + this.digicelLoginForm.value.loginPath]);
      }, err => {
        console.log('in login err =', err);
        this.loading = false;
        this.error = err.error.statusMsg;
      });
  }

  forgotPassword() {
    console.log('Need to add \'forgot passsword\' functionality.');
  }

}
