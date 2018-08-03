import { PhonePipe } from './phone.pipe';
import { MockActivatedRoute } from 'mocks';
import { CmsService } from 'services';

describe('PhonePipe', () => {
  const pipe = new PhonePipe(new CmsService(new MockActivatedRoute()));

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms null to empty string', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('transforms "+12122222222" to "(212) 222-2222"', () => {
    expect(pipe.transform('+12122222222')).toBe('(212) 222-2222');
  });

  it('transforms "+12009990547" to "(200) 999-0547"', () => {
    expect(pipe.transform('+12009990547')).toBe('(200) 999-0547');
  });

  it('transforms "+1-2122222222" to "(212) 222-2222"', () => {
    expect(pipe.transform('+1-2122222222')).toBe('(212) 222-2222');
  });

  it('transforms "+1-2009990547" to "(200) 999-0547"', () => {
    expect(pipe.transform('+1-2009990547')).toBe('(200) 999-0547');
  });
});
