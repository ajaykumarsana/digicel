import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'pipes';
import { AdminService, HuntGroupService, AutoAttendantService } from 'services';
import { SharedComponentsModule } from '../shared-components';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingFlowComponent } from './onboarding-flow';

const onboardingRoutes: Routes = [
  { path: 'onboarding', component: OnboardingComponent,
    resolve: { adminData: AdminService }
  }

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    RouterModule.forChild(onboardingRoutes),
    PipesModule

  ],
  declarations: [
    OnboardingComponent,
    OnboardingFlowComponent
  ],
  entryComponents: [
    OnboardingFlowComponent
  ],
  providers: [
    HuntGroupService,
    AutoAttendantService
  ]
})
export class OnboardingModule { }
