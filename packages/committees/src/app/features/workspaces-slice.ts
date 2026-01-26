import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { WorkspaceCardModel } from "../models/WorkSpaceModel";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

export const fetchAllMyWorkspaces = createAsyncThunk<any, {}>(
  "workspaces/fetchAllMyWorkspaces",
  async (param: any) => {
    const response = await ControlPanelAggConsume.GetAllMyComponents(param);

    return response;
  }
);

interface SubsystemState {
  loading: boolean;
  cards: WorkspaceCardModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: SubsystemState = {
  loading: false,
  cards: [],
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMyWorkspaces.pending, (state) => {
        state.status = RequestStatus.loading;
        state.loading = true;
      })
      .addCase(fetchAllMyWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
        state.cards = action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: false,
        })) as WorkspaceCardModel[];
      })
      .addCase(fetchAllMyWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.failed;
      });
  },
});

export default workspaceSlice.reducer;
