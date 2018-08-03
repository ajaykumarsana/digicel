export class DtmfTone {
  private baseDir = 'assets/dtmf';
  constructor (public symbol: string) {}

  getToneFile(): string {
    const files = {
      '0': 'dtmf-0.ogg',
      '1': 'dtmf-1.ogg',
      '2': 'dtmf-2.ogg',
      '3': 'dtmf-3.ogg',
      '4': 'dtmf-4.ogg',
      '5': 'dtmf-5.ogg',
      '6': 'dtmf-6.ogg',
      '7': 'dtmf-7.ogg',
      '8': 'dtmf-8.ogg',
      '9': 'dtmf-9.ogg',
      '*': 'dtmf-star.ogg',
      '#': 'dtmf-pound.ogg',
      'ring': 'dtmf-ringback.ogg'
    };
    const file = files[this.symbol];
    return file ? `${this.baseDir}/${file}` : '';
  }

  getAudio(): HTMLAudioElement {
    const toneFile = this.getToneFile();
    return toneFile ? new Audio(toneFile) : null;
  }
}
