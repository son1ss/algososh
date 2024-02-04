export const fibonacci = (number: number): number => (number < 3 ? 1 : fibonacci(number - 1) + fibonacci(number - 2));
export const getFibonacciArray = (length: number) => Array.from({ length }, (_, index) => fibonacci(index + 1));

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type StringStep = { array: string[]; changing: number[]; changed: number[] };

export const getReverseStringSteps = (string: string): StringStep[] => {
  const array: string[] = string.split('');
  const returnValue: StringStep[] = [{ array: array.slice(), changed: [], changing: [] }];
  for (let i = 0; i < array.length / 2; i++) {
    const secondIndex = string.length - i - 1;
    returnValue.push({ ...returnValue[returnValue.length - 1], changing: [i, secondIndex] });
    const temp = array[secondIndex];
    array[secondIndex] = array[i];
    array[i] = temp;
    returnValue.push({
      ...returnValue[returnValue.length - 1],
      array: array.slice(),
    });
    returnValue.push({
      ...returnValue[returnValue.length - 1],
      changed: returnValue[returnValue.length - 1].changed.concat([i, secondIndex]),
    });
  }
  return returnValue;
};
