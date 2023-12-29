import React, { useState } from 'react';
import useList, { ListNode } from '../../hooks/use-list';
import { LinkedList } from '../../utils/data-structures';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

const linkedList = new LinkedList<String>();

function getHeadOrTail<T>(item?: string | Omit<ListNode<T>, 'head' | 'tail'>) {
  if (typeof item === 'undefined') return undefined;
  return typeof item === 'string' ? item : <Circle {...item} isSmall />;
}

export const ListPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [indexValue, setIndexValue] = useState(0);
  const [loading, setLoading] = useState({
    addingHead: false,
    deletingHead: false,
    addingTail: false,
    deletingTail: false,
    addingIndex: false,
    deletingIndex: false,
  });
  const [list, { append, prepend, insertAt, deleteTail, deleteByIndex, deleteHead }] = useList(linkedList);

  const handleAddToHead = () => {
    setLoading((prev) => ({ ...prev, addingHead: true }));
    prepend(value).then(() => setLoading((prev) => ({ ...prev, addingHead: false })));
    setValue('');
  };

  const handleAddToTail = () => {
    setLoading((prev) => ({ ...prev, addingTail: true }));
    append(value).then(() => setLoading((prev) => ({ ...prev, addingTail: false })));
    setValue('');
  };

  const handleDeleteFromHead = () => {
    setLoading((prev) => ({ ...prev, deletingHead: true }));
    deleteHead().then(() => setLoading((prev) => ({ ...prev, deletingHead: false })));
  };

  const handleDeleteFromTail = () => {
    setLoading((prev) => ({ ...prev, deletingTail: true }));
    deleteTail().then(() => setLoading((prev) => ({ ...prev, deletingTail: false })));
  };

  const handleAddAtIndex = () => {
    setLoading((prev) => ({ ...prev, addingIndex: true }));
    insertAt(value, indexValue).then(() => setLoading((prev) => ({ ...prev, addingIndex: false })));
    setIndexValue(0);
    setValue('');
  };

  const handleDeleteAtIndex = () => {
    setLoading((prev) => ({ ...prev, deletingIndex: true }));
    deleteByIndex(indexValue).then(() => setLoading((prev) => ({ ...prev, deletingIndex: false })));
    setIndexValue(0);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className="demo-elements">
        <form className="grid-form">
          <Input isLimitText maxLength={4} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
          <Button text="Добавить в head" isLoader={loading.addingHead} onClick={handleAddToHead} />
          <Button text="Добавить в tail" isLoader={loading.addingTail} onClick={handleAddToTail} />
          <Button
            text="Удалить из head"
            isLoader={loading.deletingHead}
            onClick={handleDeleteFromHead}
            disabled={!list.length}
          />
          <Button
            text="Удалить из tail"
            isLoader={loading.deletingTail}
            onClick={handleDeleteFromTail}
            disabled={!list.length}
          />
          <Input
            isLimitText
            max={list.length - 1}
            type="number"
            placeholder="Введите индекс"
            value={indexValue}
            onChange={(e) => setIndexValue(Number(e.currentTarget.value))}
          />
          <Button
            text="Добавить по индексу"
            extraClass="grid-2"
            isLoader={loading.addingIndex}
            onClick={handleAddAtIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass="grid-2"
            isLoader={loading.deletingIndex}
            onClick={handleDeleteAtIndex}
            disabled={!list.length}
          />
        </form>
        <div className="circles">
          {list.map((item, index, arr) => (
            <>
              <Circle
                {...item}
                head={getHeadOrTail(item.head)}
                tail={getHeadOrTail(item.tail)}
                index={index}
                key={index}
              />
              {index < arr.length - 1 && <ArrowIcon key={`${index}arrow`} fill={'#0032FF'} />}
            </>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
