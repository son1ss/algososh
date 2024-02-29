import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import { Button } from './button';

describe('Компонент кнопки', () => {
  it('корректно рендерится с текстом', () => {
    const tree = renderer.create(<Button text="Click me" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится отключенным', () => {
    const tree = renderer.create(<Button text="Disabled" disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно рендерится с лоадером', () => {
    const tree = renderer.create(<Button text="Loading" isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректный вызов колбека по клику', () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" onClick={onClickMock} />);

    fireEvent.click(screen.getByText('Click me'));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
