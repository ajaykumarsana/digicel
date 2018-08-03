import { Component, OnInit, Renderer2, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { CmsService, AudioRecordingService } from 'services';
import { Subscription } from 'rxjs/Subscription';
declare const navigator: any;

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {
  leftchannel = [];
  rightchannel = [];
  recorder = null;
  recording = false;
  recordingLength = 0;
  playing = false;
  volume = null;
  audioInput = null;
  audioStream = null;
  audioOutput = null;
  sampleRate = null;
  context = null;
  soundBlob: Blob;
  numChannels = 1;
  desiredSampleRate = 8000;
  audioCaptureError = false;
  errorMessage: string;
  statusUpdate = false;
  statusMessage: string;
  knob: HTMLElement;
  progressBar: HTMLElement;
  playedBar: HTMLElement;
  remoteSource: string; // temporary workaround for chrome bug where you can't scrub through the audio when audio.src is remote
  @Input() type: 'voicemail' | 'autoAttendant' | 'userVoicemail';
  @Output() onUpdated: EventEmitter<any>;
  @Output() onFilePresent: EventEmitter<any>;
  subscription: Subscription;
  fetchSubscription: Subscription;
  updating: boolean;

  constructor(
    public cms: CmsService,
    private ars: AudioRecordingService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.onUpdated = new EventEmitter();
    this.onFilePresent = new EventEmitter();
  }

  ngOnInit() {
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
    this.fetchGreeting(this.type);

    this.subscription = this.ars.sourceChange.subscribe((type) => {
      if (type === this.type && !this.updating) {
        this.fetchGreeting(this.type);
      }
      this.updating = false;
    });
  }

  getPerms() {

    const onError = error => {
      this.handleAudioError(error);
    };

    const onSuccess = stream => {
      this.onSuccess(stream);
    };



    if (!navigator.getUserMedia) {
      navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      );
    }

    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true}, onSuccess, onError);
    } else {
      console.log('getUserMedia not supported in this browser.');
      let error = {name: 'NoSupport'};
      this.handleAudioError(error);
    }
  }

  onSuccess(stream) {
    // creates the audio context  why both here? what is the difference?
    this.context = new AudioContext();

    // we query the context sample rate (varies depending on platforms)
    this.sampleRate = this.context.sampleRate;

    // creates a gain node
    this.volume = this.context.createGain();

    // creates an audio node from the microphone incoming stream
    this.audioInput = this.context.createMediaStreamSource(stream);

    // connect the stream to the gain node
    this.audioInput.connect(this.volume);

    /* From the spec: This value controls how frequently the audioprocess event is
    dispatched and how many sample-frames need to be processed each call.
    Lower values for buffer size will result in a lower (better) latency.
    Higher values will be necessary to avoid audio breakup and glitches */
    let bufferSize = 1024;
    this.recorder = this.context.createScriptProcessor(bufferSize, this.numChannels, this.numChannels);
    this.recorder.onaudioprocess = function(e) {
      if (this.recording === false) {
        // we are not recording so we return
        return;
      }

      this.audioStream = stream;

      // we are recording so we do not return
      if (this.numChannels === 2) {
        let left = e.inputBuffer.getChannelData (0);
        let right = e.inputBuffer.getChannelData (1);
        // we clone the samples
        this.leftchannel.push (new Float32Array (left));
        this.rightchannel.push (new Float32Array (right));
        this.recordingLength += bufferSize;
      } else {
        let left = e.inputBuffer.getChannelData (0);
        // we clone the samples
        this.leftchannel.push (new Float32Array (left));
        this.recordingLength += bufferSize;
      }
    }.bind(this);
    // we connect the recorder
    this.volume.connect (this.recorder);
    this.recorder.connect (this.context.destination);
  }

  onError(error) {
    this.handleAudioError(error);
  }

  ngOnDestroy() {
    this.fetchSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  handleFileUpload(file) {
    console.log('calling handleFileUpload file = ', file);
    console.log('MBE Server changes required in order to upload file');
  }

  handleAudioError(error) {
    this.audioCaptureError = true;
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

  fetchGreeting(type) {
    this.fetchSubscription = this.ars.getVoiceMailGreeting(type)
    .subscribe((data) => {
      let source;
      if (type === 'userVoicemail') {
        source = data.voicemailGreetingUrl;
      } else if (type === 'autoAttendant') {
        source = data.autoAttendant;
      } else {
        source = data.greetings.voicemail;
      }
      this.setAudioSource(source);
    });
  }

  startRecord() {
    this.getPerms();
    this.recording = true;
    // reset the buffers for the new recording
    this.leftchannel.length = this.rightchannel.length = 0;
    this.recordingLength = 0;
    this.setStatusMessage('RECORDING');
  }

  stopRecording() {
    // we stop recording
    this.recording = false;
    this.setStatusMessage('PROCESSING');
    let interleaved, downsampledBuffer;

    if (this.numChannels === 2) {
      // we flatten the left and right channels down
      let leftBuffer = this.mergeBuffers(this.leftchannel, this.recordingLength);
      let rightBuffer = this.mergeBuffers(this.rightchannel, this.recordingLength);
      // we interleave both channels together
      interleaved = this.interleave(leftBuffer, rightBuffer);

      // Here we downsample
      downsampledBuffer = this.downsampleBuffer(interleaved, this.sampleRate);
    } else {
      // we flatten the left channel only
      let leftBuffer = this.mergeBuffers(this.leftchannel, this.recordingLength);
      // we interleave only one channel
      interleaved = this.interleave(leftBuffer);

      // Here we downsample
      downsampledBuffer = this.downsampleBuffer(interleaved, this.desiredSampleRate);
    }

    let view = this.encodeWAV_PCM(downsampledBuffer, this.desiredSampleRate);

    // our final binary blob
    let blob = new Blob([view], {type: 'audio/wav'});
    this.soundBlob = blob;
    let url = (window.URL || (<any>window).webkitURL).createObjectURL(blob);
    this.setAudioSource(url);
    this.setFileStatus(true);
    this.setStatusMessage('');
    this.setKnobPosition(0);
    this.updateVMGreeting();
    this.audioStream.getTracks()[0].stop();
    this.audioStream = null;
    this.context.close();
  }

  encodeWAV_PCM(interleaved, sampleRate) {
    // we create our wav file
    let buffer = new ArrayBuffer(44 + interleaved.length * 2);
    let view = new DataView(buffer);

    // RIFF chunk descriptor
    this.writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 36 + interleaved.length * 2, true);
    this.writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    this.writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);

    view.setUint16(22, this.numChannels, true);
    view.setUint32(24, sampleRate, true);

    view.setUint32(28, sampleRate * (this.numChannels * 2), true);
    view.setUint16(32, (this.numChannels * 2), true);

    view.setUint16(34, 16, true);
    // data sub-chunk
    this.writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    this.floatTo16BitPCM(view, 44, interleaved);

    // write the PCM samples
    let lng = interleaved.length;
    let index = 44;
    let volume = 1;
    for (let i = 0; i < lng; i++) {
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
    }
    return view;
  }

  floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2 ) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  setFileStatus(present: boolean) {
    this.onFilePresent.emit(present);
  }

  updateVMGreeting() {
    let soundBlob = this.soundBlob;
    let updateType = this.type;
    let filePrefix;

    switch (updateType) {
      case 'userVoicemail':
        filePrefix = 'webVM';
        break;
      case 'autoAttendant':
        filePrefix = 'webAA';
        break;
      case 'voicemail':
        // TODO: handle company voicemails
        filePrefix = 'webVM';
        break;
    }
    let fileName = filePrefix + Date.now() + '.wav';
    this.ars.updateVoiceMailGreeting(soundBlob, fileName, updateType).subscribe((data) => {
      this.remoteSource = data.mediaUrl;
    });
  }

  setVMGreeting() {
    this.updating = true;
    this.ars.setVMGreeting(this.remoteSource, this.type)
    .subscribe((data) => {
      this.setFileStatus(false);
      this.setStatusMessage(data.statusMsg);
      this.onUpdated.emit();
    });
  }

  private setAudioSource(url) {
    this.audioOutput.src = url;
  }

  private getAudioSource(type): string {
    let audioSourceUrl =  this.audioOutput.src;
    return audioSourceUrl;
  }

  writeUTFBytes(view, offset, string) {
    let lng = string.length;
    for (let i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  mergeBuffers(channelBuffer, recordingLength) {
    let result = new Float32Array(recordingLength);
    let offset = 0;
    let lng = channelBuffer.length;
    for (let i = 0; i < lng; i++) {
      let buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  interleave(leftChannel, rightChannel?) {
    if ( this.numChannels === 2) {
      let length = leftChannel.length + rightChannel.length;
      let result = new Float32Array(length);
      let inputIndex = 0;
      for (let index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
      }
      return result;
    } else {
      let length = leftChannel.length;
      let result = new Float32Array(length);
      let inputIndex = 0;
      for (let index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex];
        inputIndex++;
      }
      return result;
    }
  }

  // from: http://stackoverflow.com/questions/16296645/decrease-bitrate-on-wav-file-created-with-recorderjs/26245260#26245260
  downsampleBuffer(buffer, rate) {
    if (rate === this.sampleRate) {
      console.log('rate === this.sampleRate returning buffer');
      return buffer;
    }
    if (rate > this.sampleRate) {
      console.log('downsampling rate should be smaller than original sample rate');
    }
    let sampleRateRatio = this.sampleRate / rate;
    let newLength = Math.round(buffer.length / sampleRateRatio);
    let result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
        let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        let accum = 0, count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        result[offsetResult] = accum / count;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  playAudio() {
    this.audioOutput.play();
    this.playing = true;
  }

  pauseAudio() {
    this.audioOutput.pause();
    this.playing = false;
  }

  reRecord() {
    this.setAudioSource('');
    this.setFileStatus(false);
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

}
