import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioComponent } from './audio';
import { CatalogComponent } from './catalog';
import { ControlMessagesComponent } from './control-messages';
import { DownloadAppComponent } from './download-app';
import { HuntGroupComponent } from './hunt-group';
import { ProductComponent } from './product';
import { ToastComponent } from './toast';
import { CustomerBillingInfoComponent } from './customer-billing-info';
import { WebcamComponent } from './webcam';
import { BrandHeaderComponent } from './brand-header';
import { SelectComponent } from './select';
import { TeamComponent } from './team';
import { TooltipComponent } from './tooltip';
import { ConfirmModalComponent } from './confirm-modal';
import { PhoneMenuComponent } from './phone-menu/phone-menu.component';
import { AddressComponent } from './address';
import { PasswordComponent } from './password';
import { HeaderComponent } from './header';
import { TeamMemberFormComponent } from './team-member-form';
import { PortingFormComponent } from './porting-form';
import { TopNavComponent } from './top-nav';
import { HiComponent } from './hi';
import { AudioModalComponent } from './audio-modal';
import { SimRingComponent } from './sim-ring';
import { BehaviorComponent } from './behavior';
import { DirectCallComponent } from './direct-call';
import { DepartmentsComponent } from './departments';
import { PhoneMenuModalComponent } from './phone-menu-modal';
import { WebcamModalComponent } from './webcam-modal/webcam-modal.component';
import { ServicePackComponent } from './service-pack';
import { ServicePacksComponent } from './service-packs';
import { HuntGroupService } from '../services/hunt-group/hunt-group.service';
import { AutoAttendantService } from '../services/auto-attendant/auto-attendant.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './sign-up/account/account.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { CheckoutComponent } from './sign-up/checkout/checkout.component';
import { SummaryComponent } from './sign-up/summary/summary.component';
import { SignUpNavComponent } from './sign-up-nav/sign-up-nav.component';
import { GoogleSsoButtonComponent } from './google-sso-button/google-sso-button.component';
import { FooterComponent } from './footer/footer.component';
import { TeamMemberDisplayComponent } from './team-member-display/team-member-display.component';
import { CompanyDisplayComponent } from './company-display/company-display.component';
import { TeamDisplayComponent } from './team-display/team-display.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { BillingSummaryComponent } from './sign-up/billing-summary/billing-summary.component';
import { BuyerPortingComponent } from './buyer-porting/buyer-porting.component';
import { PostCheckoutComponent } from './sign-up/post-checkout/post-checkout.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AudioComponent,
    CatalogComponent,
    ControlMessagesComponent,
    DownloadAppComponent,
    HuntGroupComponent,
    PhoneMenuComponent,
    ProductComponent,
    ToastComponent,
    CustomerBillingInfoComponent,
    WebcamComponent,
    BrandHeaderComponent,
    SelectComponent,
    TeamComponent,
    TooltipComponent,
    ConfirmModalComponent,
    AddressComponent,
    PasswordComponent,
    HeaderComponent,
    TeamMemberFormComponent,
    PortingFormComponent,
    TopNavComponent,
    ServicePackComponent,
    ServicePacksComponent,
    ServicePacksComponent,
    GoogleSsoButtonComponent,
    SignUpComponent,
    AccountComponent,
    PhoneNumberComponent,
    CheckoutComponent,
    SummaryComponent,
    SignUpNavComponent,
    FooterComponent,
    TeamMemberDisplayComponent,
    CompanyDisplayComponent,
    TeamDisplayComponent,
    PaymentFormComponent,
    BillingSummaryComponent,
    BuyerPortingComponent,
    PostCheckoutComponent
  ],
  entryComponents: [
    PasswordComponent,
    HiComponent,
    AudioModalComponent,
    SimRingComponent,
    BehaviorComponent,
    DirectCallComponent,
    DepartmentsComponent,
    PhoneMenuModalComponent,
    WebcamModalComponent
  ],
  declarations: [
    AudioComponent,
    CatalogComponent,
    ControlMessagesComponent,
    DownloadAppComponent,
    HuntGroupComponent,
    PhoneMenuComponent,
    ProductComponent,
    ToastComponent,
    CustomerBillingInfoComponent,
    WebcamComponent,
    BrandHeaderComponent,
    SelectComponent,
    TeamComponent,
    TooltipComponent,
    ConfirmModalComponent,
    AddressComponent,
    PasswordComponent,
    HeaderComponent,
    TeamMemberFormComponent,
    PortingFormComponent,
    TopNavComponent,
    HiComponent,
    AudioModalComponent,
    SimRingComponent,
    BehaviorComponent,
    DirectCallComponent,
    DepartmentsComponent,
    PhoneMenuModalComponent,
    WebcamModalComponent,
    ServicePackComponent,
    ServicePacksComponent,
    GoogleSsoButtonComponent,
    SignUpComponent,
    AccountComponent,
    PhoneNumberComponent,
    CheckoutComponent,
    SummaryComponent,
    SignUpNavComponent,
    FooterComponent,
    TeamMemberDisplayComponent,
    CompanyDisplayComponent,
    TeamDisplayComponent,
    PaymentFormComponent,
    BillingSummaryComponent,
    BuyerPortingComponent,
    PostCheckoutComponent
  ],
  providers: [HuntGroupService, AutoAttendantService]
})
export class SharedComponentsModule { }
