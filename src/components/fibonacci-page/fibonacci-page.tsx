import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { delay, getFibonacciArray } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const [data, setData] = useState<{ loading: boolean; array: number[] }>({ loading: false, array: [] });
  const [value, setValue] = useState<number>();

  const count = async (number: number) => {
    for (let i = 0; i <= number; i++) {
      setData((prev) => ({ ...prev, array: getFibonacciArray(i) }));
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
            min={0}
            max={19}
            value={value ?? ''}
            onChange={(e) => setValue(Number(e.currentTarget.value))}
          />
          <Button type="submit" text="Рассчитать" disabled={value === undefined} isLoader={data.loading} />
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
