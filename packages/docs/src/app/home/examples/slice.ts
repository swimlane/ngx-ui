import { createSlice } from 'ngrx-slice';

export interface CounterState {
  value: number;
  incrementCount: number;
  decrementCount: number;
}

export const initialState: CounterState = {
  decrementCount: 0,
  incrementCount: 0,
  value: 0,
};

export const {
  actions: CounterActions,
  selectors: CounterSelectors,
  ...CounterFeature
} = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
      state.incrementCount++;
    },
    decrement: (state) => {
      state.value--;
      state.decrementCount++;
    },
  },
});
