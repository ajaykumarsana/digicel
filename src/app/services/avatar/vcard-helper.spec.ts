/* tslint:disable:max-line-length */
import { VcardHelper } from './vcard-helper';

describe('VcardHelper', () => {
  const vcardHelper = new VcardHelper();
  vcardHelper.setAvatar(`/9j/4AAQSkZJRgABAQAAAQCAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAs2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKgoKCgoKCgoKCgoKCgr/wAARCABgAGADASIAAhEBAxEB/8QAH`,
    'jpeg');

  it('should create a vCard', () => {
    expect(vcardHelper.vCard).toBeTruthy();
  });

  it('should store an avatar', () => {
    expect(vcardHelper.vCard.photo).toBeDefined();
  });

  it('should return an image src for the avatar', () => {
    expect(vcardHelper.getAvatarSrc()).toContain('data:image/jpeg;base64,/9j/4');
  });

  it('should parse a base64 vCard', () => {
    const newVcardHelper = new VcardHelper('PHZDYXJkIHhtbG5zPSJ2Y2FyZC10ZW1wIj48Q0FURUdPUklFUz48U0lQVVJJPnNpcDorMTIwMDk5OTA0NDlAdHJ5aXQxLmJyb2Fkc29mdC5jb208L1NJUFVSST48Q09ORj48Q0FMTD5Pemc1T1RFeU53PT08L0NBTEw+PENIQVQ+WVdWbU1EbGpaamM0TW1Zek5EaGxZV0V3TURZM1lUQTNOemN4TkdKaU5UUXRiWGx5YjI5dExUTXlNekF6TURNNU16a3pPVE13TXpRek5ETTVOREEzTkRjeU56azJPVGMwTXpFeVpUWXlOekkyWmpZeE5qUTNNelptTmpZM05ESmxOak0yWmpaa1FHMTFZeTUwY25scGRERXVZbkp2WVdSemIyWjBMbU52YlE9PTwvQ0hBVD48L0NPTkY+PC9DQVRFR09SSUVTPjxQUk9ESUQ+MjAxNy0xMC0zMVQxNzo1NTowNVogYmMtdWMgLSBDb21tdW5pY2F0b3IgKDIyLjIuMC4xMTQ1IE1hYyBPUyAxMC4xMik8L1BST0RJRD48Rk4+Rm9vIEJhcjwvRk4+PC92Q2FyZD4=');
    expect(newVcardHelper.vCard.fn).toBe('Foo Bar');
  });

});
