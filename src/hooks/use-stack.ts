import { useState } from 'react';
import { Stack } from '../utils/data-structures';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../constants/delays';

type ReturnValue<T> = [
  {
    array: T[];
    changing: number;
  },
  {
    push: (item: T) => Promise<void>;
    pop: () => Promise<void>;
    clear: () => void;
  }
];

export default function useStack<T>(stack: Stack<T>): ReturnValue<T> {
  const [container, setContainer] = useState({ array: stack.list(), changing: -1 });
  const setChanging = (index: number) => setContainer((prev) => ({ ...prev, changing: index }));
  const push = async (item: T) => {
    stack.push(item);
    setContainer({ changing: container.array.length, array: stack.list() });
    await delay(SHORT_DELAY_IN_MS);
    setChanging(-1);
  };
  const pop = async () => {
    stack.pop();
    setChanging(container.array.length - 1);
    await delay(SHORT_DELAY_IN_MS);
    setContainer({ changing: -1, array: stack.list() });
  };
  const clear = () => {
    stack.clear();
    setContainer({ changing: -1, array: stack.list() });
  };

  return [container, { push, pop, clear }];
}
