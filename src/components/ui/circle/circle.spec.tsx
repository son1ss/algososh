import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

import { Circle } from './circle';

describe('Компонент Circle', () => {
  it('корректно рендерится пустой', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с буквой', () => {
    const tree = renderer.create(<Circle letter="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с строкой head', () => {
    const tree = renderer.create(<Circle head="Head" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с реакт компонентом как head', () => {
    const tree = renderer.create(<Circle head={<span>Компонент</span>} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с строкой tail', () => {
    const tree = renderer.create(<Circle tail="Tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с реакт компонентом как tail', () => {
    const tree = renderer.create(<Circle tail={<span>Компонент</span>} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с isSmall === true', () => {
    const tree = renderer.create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится в стандартном состоянии', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится в изменяющемся состоянии', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится в измененном состоянии', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
