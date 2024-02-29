import { getReverseStringSteps } from './utils';

describe('Разворот строки', () => {
  it('корректно разворачивает строку с чётным количеством символов', () => {
    const reversedSteps = getReverseStringSteps('abcdefgh');
    const lastStep = reversedSteps[reversedSteps.length - 1];
    expect(lastStep.array.join('')).toBe('hgfedcba');
  });

  it('корректно разворачивает строку с нечетным количеством символов', () => {
    const reversedSteps = getReverseStringSteps('abcde');
    const lastStep = reversedSteps[reversedSteps.length - 1];
    expect(lastStep.array.join('')).toBe('edcba');
  });

  it('корректно разворачивает строку с одним символом', () => {
    const reversedSteps = getReverseStringSteps('a');
    const lastStep = reversedSteps[reversedSteps.length - 1];
    expect(lastStep.array.join('')).toBe('a');
  });

  it('корректно разворачивает пустую строку', () => {
    const reversedSteps = getReverseStringSteps('');
    const lastStep = reversedSteps[reversedSteps.length - 1];
    expect(lastStep.array.join('')).toBe('');
  });
});
