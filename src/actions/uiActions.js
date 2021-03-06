import {
  REMOVE_ERROR_DATE,
  REMOVE_ERROR_FORMAT,
  REMOVE_WRONG_DATES,
  REMOVE_WRONG_PLACES,
  SHOW_ERROR_DATE,
  SHOW_ERROR_FORMAT,
  SHOW_WRONG_DATES,
  SHOW_WRONG_PLACES,
} from '../constants/uiConstants';

export const showErrorFormat = message => ({
  type: SHOW_ERROR_FORMAT,
  payload: message,
});

export const removeErrorFormat = () => ({
  type: REMOVE_ERROR_FORMAT,
});

export const showErrorDate = message => ({
  type: SHOW_ERROR_DATE,
  payload: message,
});

export const removeErrorDate = () => ({
  type: REMOVE_ERROR_DATE,
});

export const showWrongDates = message => ({
  type: SHOW_WRONG_DATES,
  payload: message,
});

export const removeWrongDates = () => ({
  type: REMOVE_WRONG_DATES,
});

export const showWrongPlaces = message => ({
  type: SHOW_WRONG_PLACES,
  payload: message,
});

export const removeWrongPlaces = () => ({
  type: REMOVE_WRONG_PLACES,
});
