import { configureStore } from '@reduxjs/toolkit';
import jackpotReducer from './reducers/jackpot.slice';

export const store = configureStore({
  reducer: {
    jackpot: jackpotReducer,
  },
});
