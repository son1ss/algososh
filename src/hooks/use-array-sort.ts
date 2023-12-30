import { useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { Direction } from '../types/direction';
import { ElementStates } from '../types/element-states';
import { delay } from '../utils/utils';

export default function useArraySort(length: number) {
  const [array, setArray] = useState<{ index: number; state: ElementStates }[]>(() =>
    new Array(length).fill(null).map(() => ({ index: Math.round(Math.random() * 100), state: ElementStates.Default }))
  );

  const bubbleSort = async (direction: Direction) => {
    setArray((prev) => prev.map((item) => ({ ...item, state: ElementStates.Default })));
    for (let i = 1; i < array.length; i++) {
      for (let j = 0; j < array.length - i; j++) {
        setArray((prev) =>
          prev.map((item, index) => ([j + 1, j].includes(index) ? { ...item, state: ElementStates.Changing } : item))
        );
        await delay(SHORT_DELAY_IN_MS);
        setArray((prev) => {
          const arr = Array.from(prev);
          if (
            (direction === Direction.Ascending && arr[j].index > arr[j + 1].index) ||
            (direction === Direction.Descending && arr[j].index < arr[j + 1].index)
          ) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
          return arr.map((item) =>
            item.state === ElementStates.Modified ? item : { ...item, state: ElementStates.Default }
          );
        });
      }
      setArray((prev) =>
        prev.map((item, index, array) =>
          array.length - i === index ? { ...item, state: ElementStates.Modified } : item
        )
      );
    }
    setArray(([first, ...rest]) => [{ ...first, state: ElementStates.Modified }, ...rest]);
  };

  const selectionSort = async (direction: Direction) => {
    setArray((prev) => prev.map((item) => ({ ...item, state: ElementStates.Default })));
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j < array.length; j++) {
        setArray((prev) =>
          prev.map((item, index) => ([i, j].includes(index) ? { ...item, state: ElementStates.Changing } : item))
        );
        await delay(SHORT_DELAY_IN_MS);
        setArray((prev) => {
          const arr = Array.from(prev);
          if (
            (direction === Direction.Ascending && arr[i].index > arr[j].index) ||
            (direction === Direction.Descending && arr[i].index < arr[j].index)
          ) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
          return arr.map((item) =>
            item.state === ElementStates.Modified ? item : { ...item, state: ElementStates.Default }
          );
        });
      }
      setArray((prev) => prev.map((item, index) => (i === index ? { ...item, state: ElementStates.Modified } : item)));
    }
    await delay(SHORT_DELAY_IN_MS);
  };

  const reset = () => {
    setArray(
      new Array(length).fill(null).map(() => ({ index: Math.round(Math.random() * 100), state: ElementStates.Default }))
    );
  };

  return [array, { bubbleSort, selectionSort, reset }] as const;
}
