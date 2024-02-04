import { Direction } from '../types/direction';
import { ElementStates } from '../types/element-states';
import { getBubbleSortSteps, getSelectionSortSteps } from './use-array-sort';

describe('Алгоритм пузырьковой сортировки', () => {
  it('корректно сортирует пустой массив', () => {
    const sortedSteps = getBubbleSortSteps([], Direction.Ascending);

    expect(sortedSteps.length).toBe(0);
  });

  it('корректно сортирует массив из одного элемента', () => {
    const array = [{ index: 5, state: ElementStates.Default }];
    const sortedSteps = getBubbleSortSteps(array, Direction.Ascending);

    expect(sortedSteps.every((step) => step.length === 1 && step[0].index === 5)).toBe(true);
  });

  it('корректно сортирует массив из нескольких элементов', () => {
    const array = [
      { index: 3, state: ElementStates.Default },
      { index: 1, state: ElementStates.Default },
      { index: 5, state: ElementStates.Default },
      { index: 2, state: ElementStates.Default },
    ];
    const sortedSteps = getBubbleSortSteps(array, Direction.Ascending);

    const lastStep = sortedSteps[sortedSteps.length - 1];
    const isSorted = lastStep.every(
      (item, index, array) => index === array.length - 1 || item.index <= array[index + 1].index
    );
    expect(isSorted).toBe(true);
  });
});

describe('Алгоритм сортировки выбором', () => {
  it('корректно сортирует пустой массив', () => {
    const sortedSteps = getSelectionSortSteps([], Direction.Ascending);

    expect(sortedSteps.every((step) => step.length === 0)).toBe(true);
  });

  it('корректно сортирует массив из одного элемента', () => {
    const array = [{ index: 5, state: ElementStates.Default }];
    const sortedSteps = getSelectionSortSteps(array, Direction.Ascending);

    expect(sortedSteps.every((step) => step.length === 1 && step[0].index === 5)).toBe(true);
  });

  it('корректно сортирует массив из нескольких элементов', () => {
    const array = [
      { index: 3, state: ElementStates.Default },
      { index: 1, state: ElementStates.Default },
      { index: 5, state: ElementStates.Default },
      { index: 2, state: ElementStates.Default },
    ];
    const sortedSteps = getSelectionSortSteps(array, Direction.Ascending);

    const lastStep = sortedSteps[sortedSteps.length - 1];
    const isSorted = lastStep.every(
      (item, index, array) => index === array.length - 1 || item.index <= array[index + 1].index
    );
    expect(isSorted).toBe(true);
  });
});
