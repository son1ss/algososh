import React, { useState } from 'react';
import useArraySort from '../../hooks/use-array-sort';
import { Direction } from '../../types/direction';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

type Sort = 'bubble' | 'selection';

export const SortingPage: React.FC = () => {
  const [array, { bubbleSort, selectionSort, reset }] = useArraySort(5);
  const [type, setType] = useState<Sort>('bubble');

  const sort = (direction: Direction) => {
    type === 'bubble' ? bubbleSort(direction) : selectionSort(direction);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className="demo-elements">
        <form className="input-form sort-form">
          <RadioInput
            label="Выбор"
            name="type"
            value="selection"
            checked={type === 'selection'}
            onChange={(e) => setType(e.currentTarget.value as Sort)}
          />
          <RadioInput
            label="Пузырек"
            name="type"
            value="bubble"
            checked={type === 'bubble'}
            onChange={(e) => setType(e.currentTarget.value as Sort)}
          />
          <Button onClick={() => sort(Direction.Ascending)} sorting={Direction.Ascending} text="По возрастанию" />
          <Button onClick={() => sort(Direction.Descending)} sorting={Direction.Descending} text="По убыванию" />
          <Button onClick={reset} text="Новый массив" />
        </form>
        <div className="columns">
          {array.map((item, index) => (
            <Column {...item} key={index} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
