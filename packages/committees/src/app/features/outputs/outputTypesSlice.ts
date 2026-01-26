import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { OutputTypesModel } from "../../models/output-types";

interface OutputTypesState {
  outputTypes: OutputTypesModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: OutputTypesState = {
  status: RequestStatus.idle,
  error: "",
  outputTypes: [],
  pagination: new Pagination(),
};

export const getOutputTypes = createAsyncThunk<ResponseModel, any>(
  "Output/getOutputTypes",
  async (params = {}, thunkApi) => {
    try {
      const response = await CommitteeConsume.getAllOutputTypes(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const OutputSlice = createSlice({
  name: "OutputType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOutputTypes.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.outputTypes = (action as PayloadAction<ResponseModel>).payload
          ?.result as OutputTypesModel[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })
      .addCase(getOutputTypes.pending, handlePending)
      .addCase(getOutputTypes.rejected, handleRejected);
  },
});

const handleFulfilled = (state: OutputTypesState) => {
  state.status = RequestStatus.succeeded;
};

const handlePending = (state: OutputTypesState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: OutputTypesState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default OutputSlice.reducer;
