import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { EnsureHttpsInterceptor } from './ensure-https-interceptor';
import { ErrorInterceptor } from './error-interceptor';

export const HttpInterceptorProviders = [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
