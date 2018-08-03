import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'pipes';
import { SharedComponentsModule, TeamComponent } from 'components';

import { SignUpComponent, AccountComponent, PhoneNumberComponent, CheckoutComponent, SummaryComponent, SignUpNavComponent,
         GoogleSsoButtonComponent, FooterComponent, TeamMemberDisplayComponent, CompanyDisplayComponent, PaymentFormComponent,
         BillingSummaryComponent, BuyerPortingComponent, PostCheckoutComponent, TeamDisplayComponent
} from '../shared-components';

// App Specific Components
import { BuyerComponent } from './buyer.component';
import { ApiErrors, SignUpFlowService, OrderService } from 'services';
import { ProspectCustomerService, TeamService} from 'services';


const buyerRoutes: Routes = [
  { path: 'buyer', component: BuyerComponent, children: [
    { path: 'sign-up', component: SignUpComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: 'full'},
      { path: 'account', component: AccountComponent, data: {state: 'account'} },
      { path: 'phone-number', component: PhoneNumberComponent, data: {state: 'phone-number', GLUE: false, noPort: true} },
      { path: 'team', component: TeamComponent, data: {state: 'team', GLUE: false, noPort: true, buyer: true} },
      { path: 'summary', component: SummaryComponent, data: {state: 'summary'} },
      { path: 'checkout', component: CheckoutComponent, data: {state: 'checkout'} },
      { path: 'post-checkout', component: PostCheckoutComponent, data: {state: 'post-checkout'} }
    ] },
    { path: 'porting', component: BuyerPortingComponent, children: [
      { path: 'phone-number', component: PhoneNumberComponent, data: {state: 'phone-number', GLUE: false, noPort: false} },
      { path: 'team', component: TeamComponent, data: {state: 'team', GLUE: false, noPort: false, buyer: true} }
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
    RouterModule.forChild(buyerRoutes),
    BrowserAnimationsModule,
    PipesModule
  ],
  declarations: [
    BuyerComponent
  ],
  exports: [],
  providers: [ProspectCustomerService, TeamService, ApiErrors, SignUpFlowService, OrderService]
})
export class BuyerModule { }
