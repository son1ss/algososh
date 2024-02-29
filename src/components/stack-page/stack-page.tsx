import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import useStack from '../../hooks/use-stack';
import { Stack } from '../../utils/data-structures';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [{ array, changing }, { clear, pop, push }] = useStack<string>(stack);
  const [loading, setLoading] = useState({ adding: false, deleting: false });
  return (
    <SolutionLayout title="Стек">
      <div className="demo-elements">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading((prev) => ({ ...prev, adding: true }));
            push(value).then(() => setLoading((prev) => ({ ...prev, adding: false })));
            setValue('');
          }}
          className="input-form"
        >
          <Input isLimitText maxLength={4} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
          <Button type="submit" text="Добавить" disabled={!value.length} isLoader={loading.adding} />
          <Button
            onClick={() => {
              setLoading((prev) => ({ ...prev, deleting: true }));
              pop().then(() => setLoading((prev) => ({ ...prev, deleting: false })));
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
              state={changing === index ? ElementStates.Changing : ElementStates.Default}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
