import { IsValidNumberPipe } from './is-valid-number.pipe';
import { MockActivatedRoute } from 'mocks';
import { CmsService } from 'services';

describe('IsValidNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new IsValidNumberPipe(new CmsService(new MockActivatedRoute()));
    expect(pipe).toBeTruthy();
  });
});
