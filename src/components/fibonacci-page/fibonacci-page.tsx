import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { delay, fibonacci } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const [data, setData] = useState<{ loading: boolean; array: number[] }>({ loading: false, array: [] });
  const [value, setValue] = useState<number>(0);

  const count = async (number: number) => {
    const arr: number[] = [];
    for (let i = 0; i <= number; i++) {
      arr.push(fibonacci(i + 1));
      setData((prev) => ({ ...prev, array: arr }));
      await delay(SHORT_DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className="demo-elements">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setData((prev) => ({ ...prev, loading: true }));
            value && count(value).then(() => setData((prev) => ({ ...prev, loading: false })));
          }}
          className="input-form"
        >
          <Input
            isLimitText
            type="number"
            max={19}
            value={value}
            onChange={(e) => setValue(Number(e.currentTarget.value))}
          />
          <Button type="submit" text="Рассчитать" isLoader={data.loading} />
        </form>
        <div className="circles">
          {data.array.map((item, index) => (
            <Circle letter={String(item) || ''} key={index} index={index} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
