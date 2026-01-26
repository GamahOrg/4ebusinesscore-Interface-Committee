import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ItemResponse } from "../models/ItemModel";
import { TicketingSystemConsume } from "@4eplatform/shared/apis/ticketing_system";
import {
  ItemsByRequestTemplateId,
  ItemsByRequestTemplateIdResponse,
} from "../models/ItemsByRequestTemplateId";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

interface stateType {
  data: ItemResponse;
  ItemsByRequestTemplateId: ItemsByRequestTemplateIdResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  data: new ItemResponse(),
  ItemsByRequestTemplateId: new ItemsByRequestTemplateIdResponse(),
};
export const getAllMyComponents = createAsyncThunk<any, {}>(
  "item/myComponents",
  async (param: any) => {
    const response = await ControlPanelAggConsume.GetAllMyComponents(param);

    return response;
  },
);
export const getWorkSpaceComponent = createAsyncThunk<any, {}>(
  "item/getWorkSpaceComponent",
  async (param: any) => {
    const response = await ControlPanelAggConsume.getWorkSpaceComponent(param);

    return response;
  },
);
export const addItem = createAsyncThunk(
  "item/addItem",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addItem(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
export const putItem = createAsyncThunk(
  "item/putItem",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putItemById(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteItemById(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const getItem = createAsyncThunk("item/getItem", async (_, thunkApi) => {
  try {
    const response = await TicketingSystemConsume.getItem();
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const fetchItemByRequestTemplateId = createAsyncThunk(
  "item/getItemByRequestTemplateId",
  async (params: any = {}, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getItemByRequestTemplateId(
        params,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(putItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(putItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchItemByRequestTemplateId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ItemsByRequestTemplateId.result = action.payload
          .result as ItemsByRequestTemplateId[];
        state.ItemsByRequestTemplateId.totalPages = action.payload.totalPages;
        state.ItemsByRequestTemplateId.totalItems = action.payload.totalItems;
        state.ItemsByRequestTemplateId.pageIndex = action.payload.pageIndex;
        state.ItemsByRequestTemplateId.pageSize = action.payload.pageSize;
      })
      .addCase(fetchItemByRequestTemplateId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByRequestTemplateId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default itemSlice.reducer;
