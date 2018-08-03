import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VcardHelper, AvatarService, CmsService } from 'services';
import { WebcamOptions } from './webcam-options';
import { MediaDevice } from './media-device';
import { WebcamModalComponent } from '../webcam-modal';
import { Subscription } from 'rxjs/Rx';
/**
 * Render Webcam Component
 */
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})

export class WebcamComponent implements OnInit, AfterViewInit {
  public stream: any;
  public videoSrc: any;
  public isSupportedWebRTC: boolean;
  public browser: any;
  @Input() options: WebcamOptions;
  @Input() onSuccess: Function;
  @Input() onError: Function;
  private jpegCompressionFactor = 0.5;
  webcamCaptureError = false;
  errorMessage: string;
  picTaken = false;
  avatarSubscription: Subscription;

  constructor(public cms: CmsService, private sanitzer: DomSanitizer, private elementRef: ElementRef,
    private avatarService: AvatarService, private webcamModal: WebcamModalComponent) {
    this.isSupportedWebRTC = false;
    this.browser = <any>navigator;
   }

  ngOnInit() {
    this.picTaken = false;

    this.options = {
      video: true,
      cameraType: '',
      audio: false,
      width: 189,
      height: 142
    };
    // getUserMedia() feature detection for plder browsers
    this.browser.getUserMedia_ = (this.browser.getUserMedia
    || this.browser.webkitGetUserMedia
    || this.browser.mozGetUserMedia
    || this.browser.msGetUserMedia);

    // Older browsers might not implement mediaDevices at all, so we set to an empty object first just in case
    if ((this.browser.mediaDevices === undefined) && !!this.browser.getUserMedia_ ) {
      this.browser.mediaDevices = {};
    }

    // Some Browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it isn't missing.
    if ((this.browser.mediaDevices && this.browser.mediaDevices.getUsweMedia === undefined) && !!this.browser.getUserMedia_) {
      this.browser.mediaDevices.getUserMedia = (constraints) => {
        return new Promise((resolve, reject) => {
          this.browser.getUserMedia_.call(this.browser, constraints, resolve, reject);
        });
      };
    }

    this.isSupportedWebRTC = !!(this.browser.mediaDevices && this.browser.mediaDevices.getUserMedia);
    // defaults
    this.options.width = this.options.width || 320;
    this.options.height = this.options.height || 240;
    this.options.cameraType =  this.options.cameraType || 'front';

  }

  ngAfterViewInit() {
    this.startCapture();
  }

  /**
   * Switch to facing more and setup webcam
   * @retuns {void}
   */

  onWebRTC(): any {
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
    if (this.browser.mediaDevices.enumerateDevices && this.options.video) {
      const cameraType = this.options.cameraType;
      this.browser.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach((device: MediaDevice) => {
          if (device && device.kind === 'videoinput') {
            if (device.label.toLowerCase().search(cameraType) > -1) {
              this.options.video = {deviceId: {exact: device.deviceId}, facingMode: 'environment'};
            }
          }
        });
        this.setWebcam();
      });
    } else {
      this.setWebcam();
    }
  }

  setWebcam(): any {
    // constructing a getUserMedia config-object and
    // a string (trying both)
    const optionsObject = { audio: false, video: false };
    let optionString = 'video';
    let container: any, video: any, canvas: any, context: any, ow: any, oh: any;

    if (this.options.video) {
      optionsObject.video = this.options.video;
      optionString = 'video';
    }

    if (this.options.audio === true) {
      optionsObject.audio = true;
      if (optionString !== '' ) {
        optionString = optionString + ', ';
      }
      optionString = optionString + 'audio';
    }

    container = this.elementRef.nativeElement.querySelector('#app-webcam');
    video = this.elementRef.nativeElement.querySelector('video');
    canvas = this.elementRef.nativeElement.querySelector('canvas');
    context = canvas.getContext('2d');
    video.autoplay = true;

    // Fix for ratio
    ow = parseInt(container.offsetWidth, 10);
    oh = parseInt(container.offsetHeight, 10);

    /*if (this.options.width < ow && this.options.height < oh ) {
      this.options.width = ow;
      this.options.height = oh;
    }*/

    // configure the interim video
    video.width = this.options.width;
    video.height = this.options.height;
    video.autoplay = true;

    canvas.width = this.options.width;
    canvas.height = this.options.height;

    // Promisify async callbakc's for Angular2 change detection
    const promisifyGetuserMedia = () => {
      return new Promise<string>((resolve, reject) => {
        // first we try if getUserMedia supports the config object
        try {
          // try object
          this.browser.mediaDevices.getUserMedia(optionsObject)
          .then((stream: any) => resolve(stream))
          .catch((objErr: any) => {
            // option object fails
            // trying string syntax
            // if the config object fails we try the config string
            this.browser.mediaDevices.getUserMedia(optionString)
            .then((stream: any) => resolve(stream))
            .catch((strErr: any) => {
              console.log('objErr = ', objErr);
              console.log('strErr = ', strErr);
              this.handleError(objErr);
            });
          });
        } catch (e) {
          reject(e);
        }
      });
    };

    promisifyGetuserMedia().then((stream) => {
      this.stream = stream;
     const webcamURL = URL.createObjectURL(stream);
     this.videoSrc = this.sanitzer.bypassSecurityTrustResourceUrl(webcamURL);
     this.onSuccess(stream); // TODO stream:MediaStream
    }).catch((err) => {
      // this.onError(err);
    });


  }

  handleError(error) {
   this.webcamCaptureError = true;
   switch (error.name) {
     case 'PermissionDeniedError':
       this.errorMessage = this.cms.get('webcamErrorPermissionsMessage');
       break;
    case 'DevicesNotFoundError':
      this.errorMessage = this.cms.get('webcamDevicesNotFoundError');
      break;
     case 'NoSupport':
       this.errorMessage = this.cms.get('webcamErrorNoSupport');
       break;
     default:
     this.errorMessage = this.cms.get('webcamErrorMessage');
   }
  }

  startCapture(): any {
    console.log('STARTING VIDEO CAPTURE');
    if (this.isSupportedWebRTC) {
      return this.onWebRTC();
    }
  }

  stopCapture(stream) {
    console.log('ENDING VIDEO CAPTURE');
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].stop();
    }
    stream.getVideoTracks()[0].stop();
  }

  snapPic() {
    const video = this.elementRef.nativeElement.querySelector('video');
    const canvas = this.elementRef.nativeElement.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, this.options.width, this.options.height);
    this.picTaken = true;
    this.stopCapture(this.stream);
  }

  savePic() {
    const canvas = this.elementRef.nativeElement.querySelector('canvas');
    const imageUri = canvas.toDataURL('image/jpeg', this.jpegCompressionFactor);
    this.avatarSubscription = this.avatarService.updateUserAvatar(imageUri)
    .subscribe(response => {
      if (response.status.type === 'success') {
        this.stopCapture(this.stream);
        this.webcamModal.close();
      }
    });
  }

  retakePic() {
    this.startCapture();
    const canvas = this.elementRef.nativeElement.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, this.options.width, this.options.height);
    this.picTaken = false;
  }

}
