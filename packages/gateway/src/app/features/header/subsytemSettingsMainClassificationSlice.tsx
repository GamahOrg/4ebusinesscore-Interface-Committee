import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSubsytemSettingsMainClassificationAgg = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/GetSubsytemSettingsMainClassificationAgg",
  async (params?: any) => {
    const response =
      await ControlPanelAggConsume.getSubsytemSettingsMainClassificationAgg({
        pageSize: params?.pageSize || "1000",
        pageNumber: params?.pageNumber || "1",
        search: params?.search || "",
      });
    return response;
  }
);

interface SubsystemState {
  items: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
};

const SubsytemSettingsMainClassificationSlice = createSlice({
  name: "subsytemSettingsMainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSubsytemSettingsMainClassificationAgg.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        GetSubsytemSettingsMainClassificationAgg.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.items = action.payload.result as unknown as [];
        }
      )
      .addCase(
        GetSubsytemSettingsMainClassificationAgg.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default SubsytemSettingsMainClassificationSlice.reducer;
