import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import PlaceSelector from '../../../components/selectors/PlaceSelector';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const initialState = {
  ui: {},
};

let store = mockStore(initialState);

store.dispatch = jest.fn();

const changeHandler = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <PlaceSelector changeHandler={changeHandler} />
  </Provider>
);

describe('<PlaceSelector />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test('should be match with snapshot ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call to changeHandler', () => {
    const input = wrapper.find('.form-control');

    const e = {
      target: {
        value: 'madrid',
      },
    };

    input.simulate('change', e);

    expect(changeHandler).toHaveBeenCalledWith(e.target.value);
  });

  test('should show error message', () => {
    const errorMessage = 'Something error';

    const state = {
      ui: {
        errorFormat: errorMessage,
      },
    };

    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <PlaceSelector errorMessage={errorMessage} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ErrorLabel').exists()).toBe(true);
  });
});
