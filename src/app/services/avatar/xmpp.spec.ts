/* tslint:disable:max-line-length */
import { Xmpp } from './xmpp';

describe('Xmpp', () => {
  const xmpp = new Xmpp();
  const ucOneVcard = atob('PHZDYXJkIHhtbG5zPSJ2Y2FyZC10ZW1wIj48Q0FURUdPUklFUz48U0lQVVJJPnNpcDorMTIwMDk5OTA0NDlAdHJ5aXQxLmJyb2Fkc29mdC5jb208L1NJUFVSST48Q09ORj48Q0FMTD5Pemc1T1RFeU53PT08L0NBTEw+PENIQVQ+WVdWbU1EbGpaamM0TW1Zek5EaGxZV0V3TURZM1lUQTNOemN4TkdKaU5UUXRiWGx5YjI5dExUTXlNekF6TURNNU16a3pPVE13TXpRek5ETTVOREEzTkRjeU56azJPVGMwTXpFeVpUWXlOekkyWmpZeE5qUTNNelptTmpZM05ESmxOak0yWmpaa1FHMTFZeTUwY25scGRERXVZbkp2WVdSemIyWjBMbU52YlE9PTwvQ0hBVD48L0NPTkY+PC9DQVRFR09SSUVTPjxQUk9ESUQ+MjAxNy0xMC0zMVQxNzo1NTowNVogYmMtdWMgLSBDb21tdW5pY2F0b3IgKDIyLjIuMC4xMTQ1IE1hYyBPUyAxMC4xMik8L1BST0RJRD48L3ZDYXJkPg==');

  it('should parse an XMPP vcard', () => {
    const stanza = xmpp.parse(ucOneVcard);
    expect(stanza.prodid).toBe('2017-10-31T17:55:05Z bc-uc - Communicator (22.2.0.1145 Mac OS 10.12)');
  });

  it('should set full name on a vcard', () => {
    const stanza = xmpp.parse(ucOneVcard);
    stanza.fn = 'Foo Bar';
    expect(stanza.toString()).toContain('<FN>Foo Bar</FN>');
  });

  it('should parse image type and url from vcard', () => {
    const stanza = xmpp.parse('<vCard xmlns="vcard-temp"><PHOTO><TYPE>image/png</TYPE><BINVAL>base64encodedpng</BINVAL></PHOTO><CATEGORIES><SIPURI>sip:+12009990449@tryit1.broadsoft.com</SIPURI><CONF><CALL>Ozg5OTEyNw==</CALL><CHAT>YWVmMDljZjc4MmYzNDhlYWEwMDY3YTA3NzcxNGJiNTQtbXlyb29tLTMyMzAzMDM5MzkzOTMwMzQzNDM5NDA3NDcyNzk2OTc0MzEyZTYyNzI2ZjYxNjQ3MzZmNjY3NDJlNjM2ZjZkQG11Yy50cnlpdDEuYnJvYWRzb2Z0LmNvbQ==</CHAT></CONF></CATEGORIES><PRODID>2017-10-31T19:16:52Z bc-uc - Communicator (22.2.0.1145 Mac OS 10.12)</PRODID></vCard>');
    expect(stanza.photo.type).toBe('image/png');
    expect(stanza.photo.data).toBe('base64encodedpng');
  });

  it('should create an xmpp vcard with avatar', () => {
    const vcard = new xmpp.VCardConstructor();
    vcard.photo.type = 'image/png';
    vcard.photo.data = 'base64encodedpng';
    expect(vcard.toString()).toBe('<vCard xmlns="vcard-temp"><PHOTO><TYPE>image/png</TYPE><BINVAL>base64encodedpng</BINVAL></PHOTO></vCard>');
  });

});
