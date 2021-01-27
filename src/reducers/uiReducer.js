import {
  REMOVE_ERROR_DATE,
  REMOVE_ERROR_FORMAT,
  REMOVE_WRONG_DATES,
  SHOW_ERROR_DATE,
  SHOW_ERROR_FORMAT,
  SHOW_WRONG_DATES,
} from '../constants/uiConstants';

export const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ERROR_FORMAT:
      return {
        ...state,
        errorFormat: action.payload,
      };

    case SHOW_ERROR_DATE:
      return {
        ...state,
        errorDate: action.payload,
      };

    case REMOVE_ERROR_FORMAT:
      return { ...state, errorFormat: null };

    case REMOVE_ERROR_DATE:
      return {
        ...state,
        errorDate: null,
      };

    case SHOW_WRONG_DATES: {
      return {
        ...state,
        wrongDatesError: action.payload,
      };
    }

    case REMOVE_WRONG_DATES:
      return {
        ...state,
        wrongDatesError: null,
      };

    default:
      return state;
  }
};
