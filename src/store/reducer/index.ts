import { combineReducers } from 'redux';
import { settingsSlice } from './settings.reducer';

export const reducers = combineReducers({
  appSettings: settingsSlice.reducer,
});
