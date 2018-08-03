import { DurationFromMillisecondsPipe } from './duration-from-milliseconds.pipe';

describe('DurationFromMillisecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationFromMillisecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
