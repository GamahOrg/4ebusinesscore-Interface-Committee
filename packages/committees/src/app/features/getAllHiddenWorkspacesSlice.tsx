import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkspaceHiddenDto } from "../models/WorkspaceHiddenDto";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const getAllHiddenWorkspaces = createAsyncThunk<any>(
  "workspace/hiddenWorkspaces",
  async () => {
    const response = await ControlPanelAggConsume.GetAllHiddenWorkspaces();

    return response;
  }
);

interface SubsystemState {
  items: WorkspaceHiddenDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
};

const getAllHiddenWorkspacesSlice = createSlice({
  name: "getAllMyComponents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHiddenWorkspaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllHiddenWorkspaces.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as WorkspaceHiddenDto[];
      })
      .addCase(getAllHiddenWorkspaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default getAllHiddenWorkspacesSlice.reducer;
