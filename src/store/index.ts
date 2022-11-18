import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import { charsReducer } from './slices/allChars';
import { favoriteCharsReducer } from './slices/favoriteChars';

const devTools = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: {
    chars: charsReducer,
    favoriteChars: favoriteCharsReducer,
  },
  devTools
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
