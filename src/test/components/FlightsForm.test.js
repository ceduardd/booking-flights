import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import 'jest-canvas-mock';

import FlightsForm from '../../components/FlightsForm';

const mockStore = configureStore();

const initialState = {
  ui: {},
};

let store = mockStore(initialState);

store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <FlightsForm />
  </Provider>
);

describe('<FlightsForm />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test('should be match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should show something error', () => {
    const initialState = {
      ui: {
        wrongDatesError: 'Select an available origin',
      },
    };

    const store = mockStore(initialState);

    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <FlightsForm />
      </Provider>
    );

    const form = wrapper.find('form');

    form.simulate('submit', { pereventDefault() {} });

    expect(wrapper.find('ErrorLabel').exists()).toBe(true);
  });
});
