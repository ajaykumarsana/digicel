import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'pipes';
import { SharedComponentsModule, TeamComponent } from 'components';

import { SignUpComponent, AccountComponent, PhoneNumberComponent, CheckoutComponent,
         SummaryComponent, SignUpNavComponent, GoogleSsoButtonComponent, FooterComponent,
         TeamMemberDisplayComponent, CompanyDisplayComponent, TeamDisplayComponent, PaymentFormComponent,
         BillingSummaryComponent, BuyerPortingComponent, PostCheckoutComponent
        } from '../shared-components';


// App Specific Components
import { ProvisioningComponent } from './provisioning.component';
import { ApiErrors, ProvisioningFlowService, OrderService } from 'services';
import { ProspectCustomerService, TeamService} from 'services';

const provisioningRoutes: Routes = [
  { path: 'provisioning', component: ProvisioningComponent, children: [
    { path: 'sign-up', component: SignUpComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: 'full'},
      { path: 'account', component: AccountComponent, data: {state: 'account'} },
      { path: 'phone-number', component: PhoneNumberComponent, data: {state: 'phone-number', GLUE: false, noPort: true} },
      { path: 'team', component: TeamComponent, data: {state: 'team', GLUE: false, noPort: true, buyer: false} },
      { path: 'summary', component: SummaryComponent, data: {state: 'summary'} },
      { path: 'checkout', component: CheckoutComponent, data: {state: 'checkout'} },
      { path: 'post-checkout', component: PostCheckoutComponent, data: {state: 'post-checkout'} }
    ] },
    { path: 'porting', component: BuyerPortingComponent, children: [
      { path: 'phone-number', component: PhoneNumberComponent, data: {state: 'phone-number', GLUE: false, noPort: false} },
      { path: 'team', component: TeamComponent, data: {state: 'team', GLUE: false, noPort: false,  buyer: false} }
    ]},
    { path: '', redirectTo: 'sign-up', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    RouterModule.forChild(provisioningRoutes),
    BrowserAnimationsModule,
    PipesModule
  ],
  declarations: [
    ProvisioningComponent
  ],
  exports: [],
  providers: [ProspectCustomerService, TeamService, ApiErrors, ProvisioningFlowService, OrderService]
})
export class ProvisioningModule { }
