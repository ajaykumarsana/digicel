import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService, GroupService } from 'services';
import { IAddress } from 'interfaces';
import { CyberSourceResponse  } from './cybersource-response';
import { CyberSourceRequest } from './cybersource-request';
import { PaymentMetaData } from './payment-metadata';
import { PaymentErrors } from './payment-errors';

@Component({
  selector: 'app-customer-billing-info',
  templateUrl: './customer-billing-info.component.html',
  styleUrls: ['./customer-billing-info.component.scss']
})
export class CustomerBillingInfoComponent implements OnInit, OnDestroy {
  @Input() editMode: boolean;
  @Input() forceDisabled: boolean;
  @Output() editModeChange: EventEmitter<any>;
  @ViewChild('iframeHop') iframeHop: ElementRef;
  @ViewChild('cyberSourceForm') cyberSourceForm: ElementRef;
  public renderIframeParams = false;
  public iframeConfig: {};
  public iframeConfigKeys: string[];
  public iframeSourceUrl: string;
  public trustedIframeSourceUrl: SafeUrl;
  private iframeSourceDomain: string;
  private billingAddress: IAddress;
  public messageHandler;
  public ccMetadata: PaymentMetaData = new PaymentMetaData();
  public ccErrors: PaymentErrors = new PaymentErrors();
  public paymentTokenExists = false;


  constructor(private sanitizer: DomSanitizer, private apiService: ApiService, private groupService: GroupService ) { }

  ngOnInit() {
    this.editMode = this.editMode || false;
    this.forceDisabled = this.forceDisabled || false;
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.getIframeParamsAndLoadIframe(this.checkForPaymentInstrument());
  }

ngOnDestroy() {
    if (this.messageHandler) {
        window.removeEventListener('message', this.messageHandler);
    }
}

toggleEdit(updatedCard?) {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
}

sendPaymentInfo() {
    this.billingAddress = this.groupService.getAddress('billingAddress');
    let request = new CyberSourceRequest(
      this.billingAddress.firstName,
      this.billingAddress.lastName,
      this.billingAddress.address1,
      this.billingAddress.address2,
      this.billingAddress.city,
      this.billingAddress.state,
      this.billingAddress.postalCode
    );
    let iframePaymentWindow = this.iframeHop.nativeElement.contentWindow;

    iframePaymentWindow.postMessage(request, this.iframeSourceDomain);
    this.addEventPaymentFrameListener(this.iframeSourceDomain);
    this.resetPaymentErrors();
}

// returns existing paymentToken or null if none
private checkForPaymentInstrument(): string {
    let paymentInstrument = this.groupService.getPaymentInstrument();
    if (paymentInstrument && paymentInstrument.paymentToken) {
        this.paymentTokenExists = true;
        if (paymentInstrument.card) {
            this.ccMetadata.last4 = paymentInstrument.card.cardNumberLast4;
            this.ccMetadata.exp = paymentInstrument.card.expDate;
        }
        return paymentInstrument.paymentToken;
    } else {
        return null;
    }
}
private getIframeParamsAndLoadIframe(paymentToken: string): void {
    if (paymentToken === null) {
        this.groupService.getBillingInfo()
        .subscribe(
            data => {
                console.log('we got data =', data);
                this.initIframe(data);
            },
            error => {
                console.log('we got error =', error);
            }
        );
    } else {
        // if we have a stored token
    }

}

private initIframe(iframeParams: {}) {
    console.log('in initHop cybersourceParams = ', iframeParams);

    let getURL = window.location;
    let baseURL = getURL.protocol + '//' + getURL.host + '/';

    this.iframeConfig = iframeParams;
    // Use the Cybersource url from the Arterra API unless we have one hardcoded in modestoOptions
    this.iframeSourceUrl = baseURL + this.iframeConfig['iframeUrl'];
    this.iframeSourceUrl = 'https://www.youtube.com/embed/PUBnlbjZFAI';
    this.trustedIframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSourceUrl);
    // this.iframeSourceDomain = new URL(this.iframeSourceUrl).origin;
    this.iframeConfigKeys = Object.keys(this.iframeConfig);

    this.renderIframeParams = true;
    // Wait until input fields render before submitting
    setTimeout(() => {
        this.cyberSourceForm.nativeElement.submit();
    }, 0);
}

private receivePaymentResponse(paymentResponse) {
    let response = new CyberSourceResponse(paymentResponse);

    if (response.success) {
        if (Object.keys(response.metaData).length !== 0) {
            this.ccMetadata = response.metaData;
        }
        let patchInstrument = {paymentToken: response.token};
    this.billingAddress = this.groupService.getAddress('billingAddress');
        this.groupService.updateGroup(patchInstrument)
            .subscribe(() => {
                this.paymentTokenExists = true;
                let paymentInstrument = this.groupService.getPaymentInstrument();
                this.toggleEdit(paymentInstrument && paymentInstrument.card);
            },
            (err) => console.log(this, err)
            );
    } else {
        this.ccErrors = response.errors;
        console.log(`error code = CYB-${response.reasonCode} message = ${response.getErrorMsg()}`);
    }
}

private createMessageHandler(validOrigin) {
    this.messageHandler = event => {
        if (event.origin === validOrigin) {
            this.receivePaymentResponse(event.data);
        } else {
          console.log( this, `Message from unknown domain (${event.origin}) has been ignored`);
        }
    };
}

private addEventPaymentFrameListener(validOrigin) {
    if (!this.messageHandler) {
        this.createMessageHandler(validOrigin);
        window.addEventListener('message', this.messageHandler, false);
    }
}

private resetPaymentErrors() {
    this.ccErrors = new PaymentErrors();
}

cancelCardEditing() {
    this.getCustomerInfo();
    this.toggleEdit();
}


}
