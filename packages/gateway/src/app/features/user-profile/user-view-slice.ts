import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UserDataModel } from "../../models/user-profile/user-view-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";

export const fetchUserView = createAsyncThunk<ResponseModel, any>(
  "user-profile-view/fetchUserView",
  async (data: any, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getUserView();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const getCountRequestInstances = createAsyncThunk<ResponseModel, any>(
  "user-profile-view/getCountRequestInstances",
  async (data: any, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getCountRequestInstances();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface UserData {
  data: any;
  status: string;
  totalPages: number;
  message: string;
  requestCount: any;
}

let initialState: UserData = {
  data: {},
  status: "idle",
  totalPages: 0,
  message: "",
  requestCount: 0,
};

const userViewSlice = createSlice({
  name: "user-profile-view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserView.pending, (state: UserData) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserView.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as UserDataModel;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchUserView.rejected,
        (state: UserData, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(getCountRequestInstances.pending, (state: UserData) => {
        state.status = "loading";
      })
      .addCase(
        getCountRequestInstances.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.requestCount = action.payload.result as any;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        getCountRequestInstances.rejected,
        (state: UserData, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default userViewSlice.reducer;
