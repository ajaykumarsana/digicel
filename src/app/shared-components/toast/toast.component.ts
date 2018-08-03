import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';
import { ToastService, Toast, CmsService } from 'services';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  toastSubscription: Subscription;

  constructor(private sanitizer: DomSanitizer, private toastService: ToastService, public cms: CmsService) { }

  ngOnInit() {
    this.toastSubscription = this.toastService.toastsObservable.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

  dismiss(toastId: number) {
    this.toastService.dismiss(toastId);
  }

  getImgSrc(toast: Toast): SafeUrl {
    let imageFile: string;
    const basePath = 'assets/images/';

    switch (toast.type) {
      case 'success':
        imageFile = 'check_complete.svg';
        break;
      case 'info':
        imageFile = 'phone_in_circle.svg';
        break;
      case 'warning':
        imageFile = 'alert_icon.svg';
        break;
      case 'danger':
        imageFile = 'error_icon.svg';
        break;
    }

    return this.sanitizer.bypassSecurityTrustUrl(basePath + imageFile);
  }

}
