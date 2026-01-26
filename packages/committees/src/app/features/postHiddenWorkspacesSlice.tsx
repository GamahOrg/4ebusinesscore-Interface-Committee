import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const postHiddenWorkspaces = createAsyncThunk<any, any>(
  "workspace/postHiddenWorkspaces",
  async (data: any) => {
    const response = await ControlPanelAggConsume.postHiddenWorkspace(data);

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

const postHiddenWorkspacesSlice = createSlice({
  name: "postHiddenWorkspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postHiddenWorkspaces.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postHiddenWorkspaces.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as [];
      })
      .addCase(postHiddenWorkspaces.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default postHiddenWorkspacesSlice.reducer;
