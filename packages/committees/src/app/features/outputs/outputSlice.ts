import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { OutputModel } from "../../models/output";
import { CommitteeAggConsume } from "@4eplatform/shared/apis/committee_agg";

interface OutputState {
  outputs: OutputModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: OutputState = {
  status: RequestStatus.idle,
  error: "",
  outputs: [],
  pagination: new Pagination(),
};

export const getOutputsByCommitteeId = createAsyncThunk<ResponseModel, any>(
  "committee/getOutputs",
  async (CommitteeId: string, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getOutputsByCommitteeId(
        CommitteeId
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addOutputByCommitteeId = createAsyncThunk<ResponseModel, any>(
  "Outputs/getOutput",
  async (newOutput, thunkApi) => {
    try {
      const response = await CommitteeConsume.addOutput(newOutput);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editOutput = createAsyncThunk(
  "Outputs/editOutput",
  async (output: object, thunkApi) => {
    try {
      const response = await CommitteeConsume.editOutputType(output);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const OutputSlice = createSlice({
  name: "Output",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOutputsByCommitteeId.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.outputs = (action as PayloadAction<ResponseModel>).payload
          ?.result as OutputModel[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })
      .addCase(addOutputByCommitteeId.fulfilled, handleFulfilled)
      .addCase(editOutput.fulfilled, handleFulfilled)
      .addCase(getOutputsByCommitteeId.pending, handlePending)
      .addCase(getOutputsByCommitteeId.rejected, handleRejected)
      .addCase(addOutputByCommitteeId.pending, handlePending)
      .addCase(addOutputByCommitteeId.rejected, handleRejected)
      .addCase(editOutput.pending, handlePending)
      .addCase(editOutput.rejected, handleRejected);
  },
});

const handleFulfilled = (state: OutputState) => {
  state.status = RequestStatus.succeeded;
};

const handlePending = (state: OutputState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: OutputState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default OutputSlice.reducer;
