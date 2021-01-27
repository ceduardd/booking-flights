import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import 'jest-canvas-mock';

import DateSelector from '../../../components/selectors/DateSelector';

const mockStore = configureStore();

const initialState = {
  ui: {},
};

let store = mockStore(initialState);

store.dispatch = jest.fn();

const changeHandler = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DateSelector changeHandler={changeHandler} />
  </Provider>
);

describe('<DateSelector />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test('should be match with snapshot', () => {
    // Should show a console.error() because <DatePiker />
    expect(wrapper).toMatchSnapshot();
  });

  test('should show error message', () => {
    const errorMessage = 'Something error';

    const state = {
      ui: {
        errorDate: errorMessage,
      },
    };

    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <DateSelector errorMessage={errorMessage} />
      </Provider>
    );

    expect(wrapper.find('ErrorLabel').exists()).toBe(true);
  });

  test('should call changeHandler', () => {
    const dateValue = new Date();

    const input = wrapper.find('DatePicker');

    // console.log(input.html());

    input.prop('onChange')(dateValue);

    expect(changeHandler).toHaveBeenCalled();
  });
});
