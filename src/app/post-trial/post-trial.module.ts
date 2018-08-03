import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { PipesModule } from 'pipes';


// App Specific Components
import { PostTrialComponent } from './post-trial.component';
import { PortingComponent } from './porting/porting.component';
import { ShippingComponent } from './shipping/shipping.component';
import { BillingComponent } from './billing/billing.component';
import { AccountComponent } from './porting/account/account.component';
import { NumbersComponent } from './porting/numbers/numbers.component';
import { LOAComponent } from './porting/loa/loa.component';
import { BillPreviewComponent } from './billing/bill-preview/bill-preview.component';
import { TermsAndConditionsComponent } from './billing/terms-and-conditions/terms-and-conditions.component';
import { PaymentComponent } from './billing/payment/payment.component';
import { DevicesComponent } from './shipping/devices/devices.component';
import { ShippingFormComponent } from './shipping/shipping-form/shipping-form.component';
import { PostTrialService } from '../services/post-trial/post-trial.service';
import { GetStartedComponent } from './get-started/get-started.component';
import { FinishComponent } from './finish/finish.component';


// Building Block Components
import { PtProgressBarComponent } from './partials//pt-progress-bar/pt-progress-bar.component';
import { ActionBarComponent } from './partials/action-bar/action-bar.component';
import { HeaderBarComponent } from './partials/header-bar/header-bar.component';

// Services
import { CmsService } from 'services';

// @todo: Create post-trial flow service that redirects to current page always

// Routes
const ptueRoutes: Routes = [
  { path: 'post-trial', component: PostTrialComponent,
  resolve: { userData: PostTrialService },
  children: [
    { path: '', redirectTo: 'get-started', pathMatch: 'full'},
    { path: 'get-started', component: GetStartedComponent },
    { path: 'porting', component: PortingComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: 'full'},
      { path: 'account', component: AccountComponent },
      { path: 'confirm-numbers', component: NumbersComponent },
      { path: 'authorize-transfer', component: LOAComponent }
    ]},
    { path: 'shipping', component: ShippingComponent, children: [
      { path: '', redirectTo: 'choose-devices', pathMatch: 'full'},
      { path: 'choose-devices', component: DevicesComponent },
      { path: 'shipping-form', component: ShippingFormComponent }
    ]},
    { path: 'billing', component: BillingComponent, children: [
      { path: '', redirectTo: 'preview', pathMatch: 'full'},
      { path: 'preview', component: BillPreviewComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
      { path: 'payment', component: PaymentComponent }
    ]},
    { path: 'finish', component: FinishComponent }
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    PipesModule,
    RouterModule.forChild(ptueRoutes)
  ],
  declarations: [
    PostTrialComponent,
    PortingComponent,
    BillingComponent,
    ShippingComponent,
    AccountComponent,
    NumbersComponent,
    LOAComponent,
    BillPreviewComponent,
    TermsAndConditionsComponent,
    PaymentComponent,
    DevicesComponent,
    ShippingFormComponent,
    GetStartedComponent,
    FinishComponent,
    PtProgressBarComponent,
    ActionBarComponent,
    HeaderBarComponent
  ],
  providers: [PostTrialService, CmsService]
})



export class PostTrialModule { }
