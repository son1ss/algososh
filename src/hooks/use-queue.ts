import { useState } from 'react';
import { Queue } from '../utils/data-structures';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../constants/delays';

export default function useQueue<T>(queue: Queue<T>) {
  const [container, setContainer] = useState({
    array: queue.list(),
    head: queue.getHead(),
    tail: queue.getTail(),
    changing: -1,
  });

  const setChanging = (index: number) => setContainer((prev) => ({ ...prev, changing: index }));

  const enqueue = async (item: T) => {
    setChanging(container.tail);
    await delay(SHORT_DELAY_IN_MS);
    queue.enqueue(item);
    setContainer((prev) => ({ ...prev, array: queue.list(), changing: -1, tail: queue.getTail() }));
  };

  const dequeue = async () => {
    setChanging(container.head);
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setContainer((prev) => ({ ...prev, array: queue.list(), changing: -1, head: queue.getHead() }));
  };

  const clear = () => {
    queue.clear();
    setContainer({
      array: queue.list(),
      head: queue.getHead(),
      tail: queue.getTail(),
      changing: -1,
    });
  };
  return [container, { enqueue, dequeue, clear }] as const;
}
