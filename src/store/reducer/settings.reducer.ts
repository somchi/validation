import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings, Conditions } from '../../utils/types';
import { STATE_KEY } from '../../utils/helper';

const initialState: AppSettings = {
  uppercase: false,
  lowercase: false,
  figure: false,
  characters: false,
  special: false,
  showModal: false,
};

export const settingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setUserSelections: (
      state: AppSettings,
      action: PayloadAction<{ status: boolean; field: string }>
    ) => {
      const field: any = action.payload.field;
      state[field as keyof AppSettings] = action.payload.status;
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    },
    setModalToggle: (state: AppSettings, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    resetState: (state: AppSettings, action: PayloadAction<Conditions>) => {
      const data = action.payload;
      state.characters = data.characters;
      state.figure = data.figure;
      state.lowercase = data.lowercase;
      state.special = data.special;
      state.uppercase = data.uppercase;
    },
  },
});

export const { setUserSelections, setModalToggle, resetState } =
  settingsSlice.actions;

export default settingsSlice.reducer;
