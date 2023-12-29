import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

export const StringComponent: React.FC = () => {
  const [data, setData] = useState<{ loading: boolean; array: string[]; changing: number[]; changed: number[] }>({
    loading: false,
    array: [],
    changing: [],
    changed: [],
  });
  const [value, setValue] = useState<string>('');

  const reverse = async (string: string) => {
    setData({
      loading: false,
      array: [],
      changing: [],
      changed: [],
    });
    const arr: string[] = string.split('');
    setData((prev) => ({ ...prev, array: arr }));
    for (let firstIndex = 0; firstIndex <= (arr.length + 1) / 2; firstIndex++) {
      await delay(SHORT_DELAY_IN_MS);
      const secondIndex = string.length - firstIndex - 1;
      setData((prev) => ({ ...prev, changing: [firstIndex, secondIndex] }));
      const temp = arr[secondIndex];
      arr[secondIndex] = arr[firstIndex];
      arr[firstIndex] = temp;
      await delay(SHORT_DELAY_IN_MS);
      setData((prev) => ({ ...prev, changed: prev.changed.concat([firstIndex, secondIndex]) }));
    }
  };

  const getChangeStatus = (index: number) => {
    if (data.changed.includes(index)) return ElementStates.Modified;
    if (data.changing.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Строка">
      <div className="demo-elements">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setData((prev) => ({ ...prev, loading: true }));
            value && reverse(value).then(() => setData((prev) => ({ ...prev, loading: false })));
          }}
          className="input-form"
        >
          <Input isLimitText maxLength={11} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
          <Button type="submit" text="Рассчитать" isLoader={data.loading} />
        </form>
        <div className="circles">
          {data.array.map((item, index) => (
            <Circle letter={item || ''} key={index} index={index} state={getChangeStatus(index)} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
