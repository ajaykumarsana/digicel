import { Vcard } from './vcard';
import { Xmpp } from './xmpp';

export class VcardHelper {
  public vCard: Vcard;

  constructor(base64Vcard?: string) {
    const xmpp = new Xmpp();

    if (base64Vcard) {
      this.vCard = xmpp.parse(atob(base64Vcard));
    }

    if (!this.vCard) {
      this.vCard = new xmpp.VCardConstructor();
    }
  }

  getAvatarSrc(): string {
    const vCardPhoto = this.vCard.photo;
    if (vCardPhoto && vCardPhoto.data) {
      return `data:${vCardPhoto.type};base64,${vCardPhoto.data}`;
    } else {
      return '';
    }
  }

  // https://stackoverflow.com/a/11335500
  setAvatarFromDataUri(dataUri: string) {
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = dataUri.match(regex);
    const ext = matches[1] as 'jpeg' | 'png' | 'gif';
    const data = matches[2];
    this.setAvatar(data, ext);
  }

  setAvatar(base64Image: string, imageType: 'jpeg' | 'png' | 'gif') {
    this.vCard.photo.data = base64Image;
    this.vCard.photo.type = `image/${imageType}`;
  }

  toBase64(): string {
    return btoa(this.vCard.toString());
  }
}
