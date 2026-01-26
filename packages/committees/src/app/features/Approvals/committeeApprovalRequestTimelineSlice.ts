import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { DynamicWorkflowAggConsume } from '@4eplatform/shared/apis/dynamic_workflow_agg';

interface RequestTimeline {
  data:any;
  status: string;
  message: string;
}

let initialState: RequestTimeline = {
  data:  null,
  status: "idle",
  message: "",
};


export const fetchRequestTimeline = createAsyncThunk<ResponseModel, any>(
  "commiitteeApprovalRequestTimeline/fetchRequestTimeline",
  async (params, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getRequestTimeline(params);
      return response;
    } catch (error) {

      return thunkApi.rejectWithValue(error);
    }
  }
);



const committeeApprovalRequestTimelineSlice = createSlice({
  name: "commiitteeApprovalRequestTimeline",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestTimeline.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequestTimeline.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.result as ResponseModel;
       
      })
      .addCase(fetchRequestTimeline.rejected, (state) => {
        state.status = "failed";
      });

  },
});

export default committeeApprovalRequestTimelineSlice.reducer;
