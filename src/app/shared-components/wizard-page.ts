import { Subject } from 'rxjs/Rx';

export abstract class WizardPage {
  result = new Subject<string>();

  constructor() {}

  back() {
    this.result.next('back');
  }

  finish() {
    this.result.next('success');
  }

  skip() {
    this.result.next('skip');
  }

}
