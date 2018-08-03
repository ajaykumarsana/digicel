import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { BuyerModule } from './buyer/buyer.module';
import { ProvisioningModule } from './provisioning/provisioning.module';
import { AppComponent } from './app.component';
import { ApiService, UserService, CatalogService, CmsService, GroupService, MessagingService, AdminService,
  ChatService, AvatarService, PresenceService, CallingService, ToastService, AudioRecordingService, AnalyticsService,
  FormValidationService, VoicemailService, AuthService, ServicePackService } from 'services';
import { PipesModule } from 'pipes';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RecommendedGreetingService } from 'app/services/auto-attendant/recommended-greeting.service';
import { PostTrialModule } from './post-trial/post-trial.module';
import { GroupLevelModule } from './group-level/group-level.module';
import { CountrySelectorModule } from './countryselector/countryselector.module';
import { OnboardingModule } from './onboarding/onboarding.module';

import { HttpInterceptorProviders } from './http-interceptors/index';
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    BuyerModule,
    ProvisioningModule,
    RouterModule.forRoot(appRoutes),
    PipesModule,
    BootstrapModalModule,
    PostTrialModule,
    GroupLevelModule,
    CountrySelectorModule,
    OnboardingModule
  ],
  providers: [
    ApiService,
    UserService,
    CatalogService,
    CmsService,
    GroupService,
    MessagingService,
    AdminService,
    ChatService,
    AvatarService,
    PresenceService,
    CallingService,
    ToastService,
    AudioRecordingService,
    AnalyticsService,
    FormValidationService,
    VoicemailService,
    RecommendedGreetingService,
    AuthService,
    HttpInterceptorProviders,
    Title,
    ServicePackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
