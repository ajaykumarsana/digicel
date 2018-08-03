import { ZipCodePipe } from './zipcode.pipe';

describe('ZipCodePipe', () => {
  let pipe = new ZipCodePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 11207 to a 11207', () => {
    expect(pipe.transform('11207')).toBe('11207');
  });

  it('transforms 112076420 to 11207-6420', () => {
    expect(pipe.transform('112076420')).toBe('11207-6420');
  });

});
