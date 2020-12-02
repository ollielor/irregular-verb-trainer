
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import { render, act, cleanup, fireEvent, waitFor, screen } from '@testing-library/react-native';

import App from '../../App';
import StartScreen from '../../screens/StartScreen';
import ButtonComponent from '../../components/ButtonComponent';
import GermanStartScreen from '../../screens/StartScreen';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';

//jest.useFakeTimers();

const defaultProps = {
  color: jest.fn(), 
  function: jest.fn(),
  title: jest.fn(),
};

describe('StartScreen', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<StartScreen navigation={jest.fn()} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('navigates on button press', () => {
    const mock = jest.fn();
    const fakeNavigation = {
      navigate: jest.fn()
    };
    const { getByText } = render(<ButtonComponent title='Saksa' function={mock} />);
    fireEvent.press(getByText('Saksa'));
    //expect(getByText('Saksa')).toBeTruthy()
    expect(mock.mock.calls).toHaveBeenCalledWith(['Saksa'])
  });
  it('renders correctly', async () => {
    const navigation = { navigate: jest.fn() };
    const tree = render(<StartScreen navigation={navigation} />).toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});