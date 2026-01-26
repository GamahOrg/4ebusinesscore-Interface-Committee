import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ResponseModel } from "../models/response-model";
import { ItemResponse } from "../models/ItemModel";

export const fetchItemById = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "itemById/fetchItemById",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.getItemById(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getWorkSpaceById = createAsyncThunk<any, {}>(
  "itemById/myComponents",
  async (id: any) => {
    const response = await ControlPanelAggConsume.GetWorkSpaceById(id);
    return response;
  }
);

interface state {
  data: ItemResponse;
  workspaceByIdData: any;
  status: string;
  message: string;
  error: string | null;
}
let initialState: state = {
  data: new ItemResponse(),
  workspaceByIdData: {},
  status: "idle",
  message: "",
  error: null,
};

const itemByIdSlice = createSlice({
  name: "itemById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemById.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchItemById.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload as ItemResponse;
        }
      )
      .addCase(
        fetchItemById.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )
      .addCase(getWorkSpaceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWorkSpaceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workspaceByIdData = action?.payload?.result as [];
      })
      .addCase(getWorkSpaceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default itemByIdSlice.reducer;
