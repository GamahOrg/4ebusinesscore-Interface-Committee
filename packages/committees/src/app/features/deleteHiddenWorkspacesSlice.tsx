import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const deleteHiddenWorkspaces = createAsyncThunk<any, any>(
  "workspace/deleteHiddenWorkspaces",
  async (id: string) => {
    const response = await ControlPanelAggConsume.deleteHiddenWorkspace(id);

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

const deleteHiddenWorkspacesSlice = createSlice({
  name: "deleteHiddenWorkspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteHiddenWorkspaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHiddenWorkspaces.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as [];
      })
      .addCase(deleteHiddenWorkspaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default deleteHiddenWorkspacesSlice.reducer;
