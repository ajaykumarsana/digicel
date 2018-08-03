import { PhoneAsYouTypePipe } from './phone-as-you-type.pipe';
import { MockActivatedRoute } from 'mocks';
import { CmsService } from 'services';

describe('PhoneAsYouTypePipe', () => {
  const pipe = new PhoneAsYouTypePipe(new CmsService(new MockActivatedRoute()));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "2" to "2"', () => {
    expect(pipe.transform('2')).toBe('2');
  });

  it('transforms "2122" to "(212) 2"', () => {
    expect(pipe.transform('2122')).toBe('(212) 2');
  });

  it('transforms "(212) 2222" to "(212) 222-2"', () => {
    expect(pipe.transform('(212) 2222')).toBe('(212) 222-2');
  });

  it('transforms "21" to "(21"', () => {
    expect(pipe.transform('21')).toBe('(21');
  });

  it('transforms "(21" to "(21"', () => {
    expect(pipe.transform('(21')).toBe('(21');
  });

  it('transforms "(21 " to "(21"', () => {
    expect(pipe.transform('(21 ')).toBe('(21');
  });
});
