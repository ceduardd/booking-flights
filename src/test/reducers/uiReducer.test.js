import {
  REMOVE_ERROR_FORMAT,
  SHOW_ERROR_DATE,
  SHOW_ERROR_FORMAT,
} from '../../constants/uiConstants';
import { uiReducer } from '../../reducers/uiReducer';

describe('uiReducer', () => {
  test('should return an error of places', () => {
    const initialState = {
      errorFormat: null,
    };

    const action = {
      type: SHOW_ERROR_FORMAT,
      payload: 'Place is not available',
    };

    const state = uiReducer(initialState, action);

    expect(state).toEqual({
      errorFormat: action.payload,
    });
  });

  test('should return an error of date', () => {
    const initialState = {
      errorDate: null,
    };

    const action = {
      type: SHOW_ERROR_DATE,
      payload: 'Date is invalid',
    };

    const state = uiReducer(initialState, action);

    expect(state).toEqual({
      errorDate: action.payload,
    });
  });

  test('should have all errors', () => {
    const initialState = {
      errorFormat: null,
      errorDate: null,
    };

    const action1 = {
      type: SHOW_ERROR_FORMAT,
      payload: 'Place is not available',
    };

    const action2 = {
      type: SHOW_ERROR_DATE,
      payload: 'Date is invalid',
    };

    const state1 = uiReducer(initialState, action1);
    const state2 = uiReducer(state1, action2);

    expect(state2).toEqual({
      errorFormat: action1.payload,
      errorDate: action2.payload,
    });
  });

  test('should remove all errors', () => {
    const initialState = {
      errorFormat: null,
    };

    const action1 = {
      type: SHOW_ERROR_FORMAT,
      payload: 'Place is not available',
    };

    const state1 = uiReducer(initialState, action1);

    const action2 = {
      type: REMOVE_ERROR_FORMAT,
    };

    const state2 = uiReducer(state1, action2);

    expect(state2).toEqual(initialState);
  });
});
