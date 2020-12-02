import React from 'react';
import renderer from 'react-test-renderer';

import { render, act, cleanup, fireEvent, waitFor, screen } from '@testing-library/react-native';

import { NavigationContainer} from '@react-navigation/native';

import App from '../../App';
import StartScreen from '../../screens/StartScreen';
import ButtonComponent from '../../components/ButtonComponent';
import GermanStartScreen from '../../screens/StartScreen';
import { Text } from 'react-native';
import { Container } from 'native-base';

//jest.useFakeTimers();

const defaultProps = {
  color: jest.fn(), 
  function: jest.fn(),
  title: "Saksa",
};

describe('App', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('navigates on button press', () => {
    const mock = jest.fn();
    const fakeNavigation = {
      navigate: jest.fn()
    };
    const { getByText } = render(<NavigationContainer />);
    fireEvent.press(getByText("Saksa"));
    expect(fakeNavigation).toBeCalledWith('Saksa')
  });
  it('renders correctly', async () => {
    const navigation = { navigate: jest.fn() };
    const tree = render(<StartScreen navigation={navigation} />).toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});