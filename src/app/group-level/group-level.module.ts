import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'pipes';
import { SharedComponentsModule, TeamComponent } from 'components';

// Page Components
import { GroupLevelComponent } from './group-level.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GlueBillingSummaryComponent } from './glue-billing-summary/glue-billing-summary.component';

// Services
import { CmsService, ApiService, ApiErrors, PostTrialService, PhoneNumbersService, PortingService } from 'services';
import { ActionBarComponent } from './partials/action-bar/action-bar.component';

const glueRoutes: Routes = [
  { path: 'group-level', component: GroupLevelComponent,
  resolve: { userData: PostTrialService },  // temp solution until we know where data comes from
  children: [
    { path: 'team', component: TeamComponent, data: { GLUE: true} },
    { path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout'} },
    { path: '', redirectTo: 'team', pathMatch: 'full'}
  ] }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    RouterModule.forChild(glueRoutes),
    PipesModule

  ],
  declarations: [
    GroupLevelComponent,
    CheckoutComponent,
    ActionBarComponent,
    GlueBillingSummaryComponent
  ],
  providers: [PhoneNumbersService, PortingService]
})
export class GroupLevelModule { }
