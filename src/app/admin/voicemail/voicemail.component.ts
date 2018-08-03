import { Component, OnInit, Renderer2, Input, ChangeDetectorRef, ElementRef, OnDestroy  } from '@angular/core';
import { CmsService, AudioRecordingService, UserService, GroupService, VoicemailService, CallingService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { Voicemail } from 'app/services/voicemail/voicemail';
declare const navigator: any;

@Component({
  selector: 'app-voicemail',
  templateUrl: './voicemail.component.html',
  styleUrls: ['./voicemail.component.scss']
})
export class VoiceMailComponent implements OnInit, OnDestroy {
  playing = false;
  audioOutput = null;
  audioPlaybackError = false;
  errorMessage: string;
  statusUpdate = false;
  statusMessage: string;
  knob: HTMLElement;
  progressBar: HTMLElement;
  playedBar: HTMLElement;
  @Input() voicemail: Voicemail;
  subscription: Subscription;
  canMakeCalls = false;
  isDeleted = false;

  constructor(
    public cms: CmsService,
    private ars: AudioRecordingService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private userService: UserService,
    private groupService: GroupService,
    private voicemailService: VoicemailService,
    private callingService: CallingService
  ) {}

  ngOnInit() {
    this.canMakeCalls = this.callingService.callingEnabled;
    this.audioOutput = new Audio();
    this.audioOutput.addEventListener('ended', () => {
      this.playing = false;
      this.setKnobPosition(0);
    });
    this.audioOutput.addEventListener('durationchange', () => {
      this.cdr.detectChanges();
    });
    this.audioOutput.addEventListener('timeupdate', () => {
      // buttons might not be present on init, so lets get them here if so
      if (!this.progressBar) {
        this.setButtons();
      }
      let percent = this.audioOutput.currentTime / this.audioOutput.duration;
      let newPosition = this.progressBar.clientWidth * percent;
      this.setKnobPosition(newPosition);
    });
    this.setAudioSource(this.voicemail.mediaUrl);

    const onError = error => {
      this.handleAudioError(error);
    };

  }

  ngOnDestroy() {
    // this.fetchSubscription.unsubscribe();
    // this.subscription.unsubscribe();
  }

  handleAudioError(error) {
    this.audioPlaybackError = true;
    switch (error.name) {
      case 'PermissionDeniedError':
        this.errorMessage = this.cms.get('audioErrorPermissionsMessage');
        break;
      case 'DevicesNotFoundError':
        this.errorMessage = this.cms.get('audioDevicesNotFoundError');
        break;
      case 'NoSupport':
        this.errorMessage = this.cms.get('audioErrorNoSupport');
        break;
      default:
      this.errorMessage = this.cms.get('audioErrorMessage');
    }
  }

  setStatusMessage(statusMessage) {
    this.statusUpdate = true;
    switch (statusMessage) {
      case 'SUCCESS':
      this.statusMessage = this.cms.get('audioStatusMessageUpdated');
      break;
      case 'RECORDING':
        this.statusMessage = this.cms.get('audioStatusMessageRecording');
        break;
      case 'PROCESSING':
        this.statusMessage = this.cms.get('audioStatusMessageProcessing');
        setTimeout(() => {
          this.setStatusMessage('');
        }, 3000);
        break;
      default:
      this.statusUpdate = false;
      this.statusMessage = this.cms.get('');
    }
  }

  private setAudioSource(url) {
    this.audioOutput.src = url;
  }

  private getAudioSource(type): string {
    let audioSourceUrl =  this.audioOutput.src;
    return audioSourceUrl;
  }

  playAudio(voicemail) {
    this.setReadStatus(voicemail);
    this.audioOutput.play();
    this.playing = true;
  }

  pauseAudio() {
    this.audioOutput.pause();
    this.playing = false;
  }

  deleteMessage(voicemail) {
    let message = voicemail.messageId;
    this.voicemailService.deleteVoiceMail('user', message).subscribe(() => {
      this.isDeleted = true;
    });
  }

  setReadStatus(voicemail: Voicemail) {
    let message = voicemail.messageId;
    this.voicemailService.setVoiceMailReadStatus('user', message, false).subscribe(() => {
      // @Todo: Once API is set we can set an optional boolean flag to update the UI as needed
    });
  }

  startDrag(event) {
    // buttons might not be present on init, so lets get them here if so
    if (!this.progressBar) {
      this.setButtons();
    }
    event.preventDefault();
    this.pauseAudio();
    let percent = this.audioOutput.currentTime / this.audioOutput.duration;

    let position = event.clientX;
    let moveRemover = this.renderer.listen('window', 'mousemove', (evt) => {
      let change = evt.clientX - position;
      position = evt.clientX;
      percent = this.setKnobPosition(this.knob.offsetLeft + change);

    });
    let mouseupRemover = this.renderer.listen('window', 'mouseup', (evt) => {
      moveRemover();
      mouseupRemover();
      this.setAudioTime(percent);
    });
  }

  private setKnobPosition(newPosition: number): number {
    // buttons might not be present on init, so lets get them here if so
    if (!this.progressBar) {
      this.setButtons();
    }
    let lowerBound = 0;
    let upperBound = this.progressBar.clientWidth;
    let percent: number;
    if (newPosition <= lowerBound) {
      newPosition = lowerBound;
    } else if (newPosition > upperBound) {
      newPosition = upperBound;
    }
    percent = newPosition / upperBound;

    this.knob.style.left = newPosition + 'px';
    this.playedBar.setAttribute('style', 'width: ' + this.progressBar.clientWidth * percent + 'px');

    return percent;
  }

  private setAudioTime(percent: number) {
    this.audioOutput.currentTime = this.audioOutput.duration * percent;
  }

  private setButtons() {
    this.progressBar = this.elementRef.nativeElement.querySelector('.audio-progress-bar');
    this.playedBar = this.elementRef.nativeElement.querySelector('.progress-bar-played');
    this.knob = this.elementRef.nativeElement.querySelector('.knob');
  }

  audioHasDuration(): boolean {
    return !isNaN(this.audioOutput.duration) && this.audioOutput.duration > 0;
  }

  dial() {
    if (this.voicemail.telephoneNumber) {
      this.callingService.initiateSoftphoneCall(this.voicemail.telephoneNumber);
    }
  }

}
