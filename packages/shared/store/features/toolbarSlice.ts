// src/store/toolbar/toolbarSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToolbarItem } from "../../models/ToolbarItem";
import { WorkspaceConsume } from "../../apis/workspace";
import { ResponseModel } from "../../models/responseModel";

interface ToolbarState {
  items: ToolbarItem;
  loading: boolean;
  error: string | null;
}

const initialState: ToolbarState = {
  items: {
    id: "",
    subSystemId: "",
    cardNameEn: "",
    cardNameAr: "",
    workspaceKey: "",
  },
  loading: false,
  error: null,
};

export const fetchToolbar = createAsyncThunk<ResponseModel, any>(
  "toolbar/fetchToolbar",
  async (params, thunkApi) => {
    try {
      const res = await WorkspaceConsume.GetComponentData(params);
      return res;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    clearToolbar(state) {
      state.items = {
        id: "",
        subSystemId: "",
        cardNameEn: "",
        cardNameAr: "",
        workspaceKey: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolbar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolbar.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.result as ToolbarItem;
      })
      .addCase(fetchToolbar.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load toolbar";
      });
  },
});

export const { clearToolbar } = toolbarSlice.actions;
export default toolbarSlice.reducer;
