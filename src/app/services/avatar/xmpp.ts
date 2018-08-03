import * as jxt from 'jxt';

export class Xmpp {
  private jxt: any;
  public VCardConstructor: any;

  constructor() {
    this.jxt = jxt.createRegistry();
    const utils = this.jxt.utils;
    const vcardNs = 'vcard-temp';
    this.VCardConstructor = this.jxt.define({
      name: 'vCard',
      namespace: vcardNs,
      element: 'vCard',
      fields: {
        fn: utils.textSub(vcardNs, 'FN'),
        prodid: utils.textSub(vcardNs, 'PRODID')
      }
    });
    const photo = this.jxt.define({
      name: 'photo',
      namespace: vcardNs,
      element: 'PHOTO',
      fields: {
          type: utils.textSub(vcardNs, 'TYPE'),
          data: utils.textSub(vcardNs, 'BINVAL'),
          url: utils.textSub(vcardNs, 'EXTVAL')
      }
    });
    this.jxt.extend(this.VCardConstructor, photo);
  }

  parse(xmppString: string) {
    return this.jxt.parse(xmppString);
  }
}
