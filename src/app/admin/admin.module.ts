import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'pipes';
import { SharedComponentsModule, WebcamComponent, WebcamModalComponent } from 'components';
import { AdminService } from 'services';
import { AdminComponent } from './admin.component';
import { UserCardComponent } from './user-card/user-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { VoiceMailComponent } from './voicemail/voicemail.component';
import { UserVoicemailComponent } from './user-voicemail/user-voicemail.component';
import { CompanyVoicemailComponent } from './company-voicemail/company-voicemail.component';
import { LoginComponent } from './login/login.component';
import { CallHistoryComponent } from './call-history/call-history.component';
import { TeamChatComponent } from './team-chat/team-chat.component';
import { DevicesComponent } from './devices/devices.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { CompanyCallHistoryComponent } from './company-call-history/company-call-history.component';
import { CompanyAnalyticsComponent } from './company-analytics/company-analytics.component';
import { SettingsComponent } from './settings/settings.component';
import { TeamListComponent } from './team-list/team-list.component';
import { SoftphoneComponent } from './softphone/softphone.component';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import { PresenceSelectorComponent } from './presence-selector/presence-selector.component';
import { AvatarComponent } from './avatar/avatar.component';
import { PresenceIndicatorComponent } from './presence-indicator/presence-indicator.component';
import { CallTypeComponent } from './company-analytics/call-type/call-type.component';
import { CallDirectionComponent } from './company-analytics/call-direction/call-direction.component';
import { DailyCallCountsComponent } from './company-analytics/daily-call-counts/daily-call-counts.component';
import { DownloadAppComponent } from '../shared-components/';
import { CompanyComponent } from './settings/company/company.component';
import { BillingComponent } from './settings/billing/billing.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { OrderStatusComponent } from './settings/order-status/order-status.component';
import { PasswordComponent } from 'components';
import { MemberProfileComponent } from './settings/profile/member-profile/member-profile.component';
import { CallLogEntryComponent } from './call-log-entry/call-log-entry.component';
import { LanguageComponent } from './settings/language/language.component';
import { ContactComponent } from './settings/contact/contact.component';
import { SavedCardsComponent } from './settings/saved-cards/saved-cards.component';
import { FtueComponent } from './ftue/ftue.component';
import { PostTrialModule } from '../post-trial/post-trial.module';
import { MainLineBehaiviorSelectorComponent } from './main-line-behavior-selector/main-line-behavior-selector.component';

const adminRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent,
    resolve: { adminData: AdminService },
    children: [
      { path: 'user-voicemail', component: UserVoicemailComponent },
      { path: 'webcam', component: WebcamComponent },
      { path: 'company-voicemail', component: CompanyVoicemailComponent },
      { path: 'call-history', component: CallHistoryComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'team/:memberId', component: TeamChatComponent },
      { path: 'team', component: TeamChatComponent },
      { path: 'receptionist', component: ReceptionistComponent },
      { path: 'company-call-history', component: CompanyCallHistoryComponent },
      { path: 'analytics', component: CompanyAnalyticsComponent },
      { path: 'settings', component: SettingsComponent, children: [
        { path: 'company', component: CompanyComponent },
        { path: 'billing', component: BillingComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'order-status', component: OrderStatusComponent },
        { path: 'password', component: PasswordComponent },
        { path: 'language', component: LanguageComponent },
        { path: 'contact', component: ContactComponent },
        { path: '', redirectTo: 'company', pathMatch: 'full' },
      ] },
      { path: 'download', component: DownloadAppComponent },
      { path: '', redirectTo: 'user-voicemail', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
    PipesModule,
    SharedComponentsModule,
    ChartsModule,
    PostTrialModule
  ],
  declarations: [AdminComponent, UserCardComponent, SideNavComponent,
    VoiceMailComponent, UserVoicemailComponent, CompanyVoicemailComponent, LoginComponent,
    CallHistoryComponent, TeamChatComponent, DevicesComponent, ReceptionistComponent,
    CompanyCallHistoryComponent, CompanyAnalyticsComponent, SettingsComponent, TeamListComponent,
    SoftphoneComponent, PresenceSelectorComponent, AvatarComponent, PresenceIndicatorComponent,
    CallTypeComponent, CallDirectionComponent, DailyCallCountsComponent, CompanyComponent,
    BillingComponent, ProfileComponent, MemberProfileComponent, CallLogEntryComponent,
    OrderStatusComponent, LanguageComponent, ContactComponent, SavedCardsComponent,
    FtueComponent, MainLineBehaiviorSelectorComponent],
  providers: [FtueComponent, WebcamComponent, WebcamModalComponent]
})
export class AdminModule { }
