import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import useQueue from '../../hooks/use-queue';
import { Queue } from '../../utils/data-structures';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [{ array, changing, head, tail }, { clear, dequeue, enqueue }] = useQueue<string>(queue);
  const [loading, setLoading] = useState({ adding: false, deleting: false });

  return (
    <SolutionLayout title="Очередь">
      <div className="demo-elements">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading((prev) => ({ ...prev, adding: true }));
            enqueue(value).then(() => setLoading((prev) => ({ ...prev, adding: false })));
          }}
          className="input-form"
        >
          <Input isLimitText maxLength={4} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
          <Button type="submit" text="Добавить" isLoader={loading.adding} />
          <Button
            onClick={() => {
              setLoading((prev) => ({ ...prev, deleting: true }));
              dequeue().then(() => setLoading((prev) => ({ ...prev, deleting: false })));
            }}
            text="Удалить"
            disabled={!array.filter((item) => item).length}
            isLoader={loading.deleting}
          />
          <Button disabled={!array.filter((item) => item).length} onClick={clear} text="Очистить" />
        </form>
        <div className="circles">
          {array.map((item, index, arr) => (
            <Circle
              letter={item || ''}
              key={index}
              index={index}
              head={index === head ? HEAD : ''}
              tail={index + 1 === tail || (item && index === arr.length - 1 && tail === 0) ? TAIL : ''}
              state={changing === index ? ElementStates.Changing : ElementStates.Default}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
