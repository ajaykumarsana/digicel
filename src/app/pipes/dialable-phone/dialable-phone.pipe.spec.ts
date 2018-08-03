import { DialablePhonePipe } from './dialable-phone.pipe';
import { MockActivatedRoute } from 'mocks';
import { CmsService } from 'services';

describe('DialablePhonePipe', () => {
  const pipe = new DialablePhonePipe(new CmsService(new MockActivatedRoute()));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "2122222222" to "+12122222222"', () => {
    expect(pipe.transform('2122222222')).toBe('+12122222222');
  });

  it('transforms "(212) 222-2222" to "+12122222222"', () => {
    expect(pipe.transform('(212) 222-2222')).toBe('+12122222222');
  });

  it('transforms "+12122222222" to "+12122222222"', () => {
    expect(pipe.transform('+12122222222')).toBe('+12122222222');
  });
});
