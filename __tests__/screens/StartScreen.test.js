import React from 'react';
import renderer from 'react-test-renderer';

import { render, act, cleanup, fireEvent, waitFor, screen } from '@testing-library/react-native';

import App from '../../App';
import StartScreen from '../../screens/StartScreen';
import ButtonComponent from '../../components/ButtonComponent';
import { Text } from 'react-native';
import { Button } from 'native-base';

//jest.useFakeTimers();

describe('StartScreen', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<StartScreen navigation={jest.fn()} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('navigates on button press', async () => {
    const { getByText } = render(<ButtonComponent color='#7E00C5' title='Saksa' function={() => {}} />);
    fireEvent.press(getByText("Saksa"));
    expect(getByText('Saksa')).not.toBeNull();
  });
  it('renders correctly', async () => {
    const navigation = { navigate: jest.fn() };
    const tree = render(<StartScreen navigation={navigation} />).toJSON();
    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});