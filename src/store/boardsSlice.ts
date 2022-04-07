import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { routes } from "../helpers/constants";
import { IBoard, initialValues } from "../models/interfaces/Board.interface";
import HttpService from "../services/HttpService";
import { RootState } from "./store";

// export const getAllBoards = createAsyncThunk(
//   'boards/getAll',
//   async () => {
//     const response = await HttpService.getAll<IBoard>(routes.getBoardsAPI());
//     return response.data;
//   }
// );

// const boardsAdapter = createEntityAdapter<IBoard>();

// export const boardsSlice = createSlice({
//   name: 'boards',
//   initialState: boardsAdapter.getInitialState(initialValues),
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllBoards.pending, (state, action) => {
//         console.log('pending', state, action);
//       })
//       .addCase(getAllBoards.fulfilled, (state, action) => {
//         console.log('fulfilled', state, action);
//         boardsAdapter.addMany;
//       })
//   }
// });

// const boardsReducer = boardsSlice.reducer;


// export const boardsSelector = (state: RootState) => state.boards;

// export default boardsReducer;
