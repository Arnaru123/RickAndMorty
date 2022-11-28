import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { CharsResponse, GET_CHARS } from "../queries/allChars";
import { query } from "../../queries/apollo";
import { LoadingStatus } from './../../types/loadingStatus';
import { CharInfo } from './../../types/charInfo';

interface CharsState {
  chars: EntityState<CharInfo>;
  status: LoadingStatus;
  errors?: string | string[];
}

const sliceName = 'allChars';

export const charactersAdapter = createEntityAdapter<CharInfo>();

export const charsSelectors = charactersAdapter
  .getSelectors<RootState>(({ chars }) => chars.chars);

const initialState: CharsState = {
  chars: charactersAdapter.getInitialState(),
  status: LoadingStatus.IDLE,
  errors: undefined
}

export const fetchChars = createAsyncThunk(
  `${sliceName}/fetchedChars`,
  async () => {
    const {
      data: {
        characters: {
          results
        }
      }
    } = await query<CharsResponse>({ query: GET_CHARS })

    return results || []
  }
)

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChars.pending, (state) => {
        state.status = LoadingStatus.PENDING
      })
      .addCase(fetchChars.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESSFUL
        charactersAdapter.setAll(state.chars, payload)
      })
      .addCase(fetchChars.rejected, (state, { error }) => {
        state.status = LoadingStatus.REJECTED
        state.errors = error.message
      })
  }
})

export const {
  reducer: charsReducer
} = slice;

export default slice;