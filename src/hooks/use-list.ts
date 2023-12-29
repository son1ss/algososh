import { LinkedList } from '../utils/data-structures';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { useState } from 'react';
import { ElementStates } from '../types/element-states';

export type ListNode<T> = {
  letter: string;
  state: ElementStates;
  head?: string | Omit<ListNode<T>, 'head' | 'tail'>;
  tail?: string | Omit<ListNode<T>, 'head' | 'tail'>;
};

const toFormattedLinkedList = <T>(item: T, index: number, array: T[]): ListNode<T> => ({
  letter: String(item),
  state: ElementStates.Default,
  head: index === 0 ? 'Head' : undefined,
  tail: index === array.length - 1 ? 'Tail' : undefined,
});

const resetHeadAndTail = <T>(item: T, index: number, array: T[]) => ({
  ...item,
  head: index === 0 ? 'Head' : undefined,
  tail: index === array.length - 1 ? 'Tail' : undefined,
});

const prepareForDelete = <T>(item: ListNode<T>): ListNode<T> => ({
  ...item,
  letter: '',
  tail: { letter: item.letter, state: ElementStates.Changing },
  state: ElementStates.Changing,
});

export default function useList<T>(list: LinkedList<T>) {
  const [container, setContainer] = useState<ListNode<T>[]>(list.list().map(toFormattedLinkedList));
  const getDefault = (array: ListNode<T>[], ...index: number[]) =>
    array.map((item, pos) => (index.includes(pos) ? { ...item, state: ElementStates.Default } : item));
  const getChanging = (array: ListNode<T>[], ...index: number[]) =>
    array.map((item, pos) => (index.includes(pos) ? { ...item, state: ElementStates.Changing } : item));
  const getModified = (array: ListNode<T>[], ...index: number[]) =>
    array.map((item, pos) => (index.includes(pos) ? { ...item, state: ElementStates.Modified } : item));

  const append = async (item: T) => {
    setContainer((prev) => [
      ...prev.slice(0, -1),
      { ...prev[prev.length - 1], head: { letter: String(item), state: ElementStates.Changing } },
    ]);
    list.append(item);
    await delay(SHORT_DELAY_IN_MS);
    const array = list.list().map(toFormattedLinkedList);
    setContainer(getModified(array, array.length - 1));
    await delay(SHORT_DELAY_IN_MS);
    setContainer(array);
  };

  const prepend = async (item: T) => {
    setContainer(([first, ...prev]) => [
      { ...first, head: { letter: String(item), state: ElementStates.Changing } },
      ...prev,
    ]);
    list.prepend(item);
    await delay(SHORT_DELAY_IN_MS);
    const array = list.list().map(toFormattedLinkedList);
    setContainer(getModified(array, 0));
    await delay(SHORT_DELAY_IN_MS);
    setContainer(array);
  };

  const insertAt = async (item: T, index: number) => {
    for (let i = 0; i < index; i++) {
      setContainer((prev) =>
        getChanging(prev, i)
          .map(resetHeadAndTail)
          .map((value, index) =>
            index === i ? { ...value, head: { letter: String(item), state: ElementStates.Changing } } : value
          )
      );
      await delay(SHORT_DELAY_IN_MS);
    }
    setContainer((prev) =>
      prev
        .map(resetHeadAndTail)
        .map((value, pos) =>
          pos === index ? { ...value, head: { letter: String(item), state: ElementStates.Changing } } : value
        )
    );

    list.insertAt(item, index);
    setContainer(getModified(list.list().map(toFormattedLinkedList), index));
    await delay(SHORT_DELAY_IN_MS);
    setContainer(getDefault(list.list().map(toFormattedLinkedList), index));
  };

  const deleteHead = async () => {
    setContainer(([first, ...prev]) => [prepareForDelete(first), ...prev]);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setContainer(list.list().map(toFormattedLinkedList));
  };

  const deleteTail = async () => {
    setContainer((prev) => [...prev.slice(0, -1), prepareForDelete(prev[prev.length - 1])]);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setContainer(list.list().map(toFormattedLinkedList));
  };

  const deleteByIndex = async (index: number) => {
    for (let i = 0; i < index; i++) {
      setContainer((prev) => getChanging(prev, i));
      await delay(SHORT_DELAY_IN_MS);
    }
    setContainer((prev) => prev.map((value, pos) => (pos === index ? prepareForDelete(value) : value)));
    await delay(SHORT_DELAY_IN_MS);
    list.deleteByIndex(index);
    setContainer(list.list().map(toFormattedLinkedList));
  };

  const clear = () => {
    list.clear();
    setContainer(list.list().map(toFormattedLinkedList));
  };

  return [container, { append, prepend, insertAt, deleteByIndex, deleteHead, deleteTail }] as const;
}
