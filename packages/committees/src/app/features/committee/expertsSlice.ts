import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/responseModel";
import {AskExpertConsume} from "@4eplatform/shared/apis/ask_expert";
import { ExpertModel } from "../../models/experts-model";

interface ExpertsState {
  data: ExpertModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string;
}

const initialState: ExpertsState = {
  data: [],
  status: "idle",
  error: null,
  message: "",
};


export const getExpertsWithoutPagination = createAsyncThunk<ResponseModel, any>(
  "experts2/GetAllExpertsWithoutPagination",
  async (params: any = {}) => {
    const response = await AskExpertConsume.getAllExpertsWithoutPagination();
    return response;
  }
);

const expertsSlice = createSlice({
  name: "experts2",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpertsWithoutPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExpertsWithoutPagination.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.result as unknown as ExpertModel[];
      })
      .addCase(getExpertsWithoutPagination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      }) 
  },
});

export default expertsSlice.reducer;
