import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { remove } from 'lodash';
import { Toast, ToastTypes } from './toast';

@Injectable()
export class ToastService {
  private toastId = 0;
  private toasts: Toast[] = [];
  private toastsSubject: BehaviorSubject<Toast[]> = new BehaviorSubject([]);
  public toastsObservable: Observable<Toast[]> = this.toastsSubject.asObservable();

  constructor() { }

  toast(message: string, type: ToastTypes = 'info', duration = 8000, dismissable = false, link: {text: string, route: string} = null) {
    const id = this.toastId;
    this.toastId++;
    this.toasts.push({id, message, type, duration, dismissable, link});
    this.broadcast();

    setTimeout(() => {
      remove(this.toasts, toast => toast.id === id);
      this.broadcast();
    }, duration);
  }

  private broadcast() {
    this.toastsSubject.next(this.toasts);
  }

  dismiss(toastId: number) {
    remove(this.toasts, toast => toast.id === toastId);
    this.broadcast();
  }

}
