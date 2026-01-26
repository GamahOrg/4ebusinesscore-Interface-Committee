import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MyComponentsModel } from "../models/MyComponentsModel";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const getAllMyComponents = createAsyncThunk<any, {}>(
  "workspace/myComponents",
  async (param: any) => {
    const response = await ControlPanelAggConsume.GetAllMyComponents(param);

    return response;
  }
);
export const getTotalMyComponents = createAsyncThunk<any, {}>(
  "workspace/myTotalComponents",
  async (param: any) => {
    const response = await ControlPanelAggConsume.GetAllMyComponents(param);

    return response;
  }
);

export const getAllMyComponentsInToolBox = createAsyncThunk<any, {}>(
  "workspace/myComponentsInToolBox",
  async (param: any) => {
    const response = await ControlPanelAggConsume.GetAllMyComponents(param);

    return response;
  }
);

export const fetchUserCardsByRoles = createAsyncThunk<any, {}>(
  "workspace/fetchUserCardsByRoles",
  async (param, thunkAPI) => {
    try {
      const response =
        await ControlPanelAggConsume.getAllSubSystemByLoggedUserRoles(param);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface SubsystemState {
  items: MyComponentsModel[];
  totalComponents: MyComponentsModel[];
  itemsInToolBox: MyComponentsModel[];
  userCardsByRoles: MyComponentsModel[];
  totalPages: number;
  totalItems: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  totalComponents: [],
  itemsInToolBox: [],
  userCardsByRoles: [],
  totalPages: 1,
  totalItems: 1,
  status: "idle",
  error: null,
};

const getAllMyComponentsSlice = createSlice({
  name: "getAllMyComponents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMyComponents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMyComponents.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.items = action.payload.result as unknown as MyComponentsModel[];
        state.totalPages = action?.payload?.totalPages;
        state.totalItems = action?.payload?.totalItems;
        state.items = action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: false,
        })) as MyComponentsModel[];
      })
      .addCase(getAllMyComponents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getTotalMyComponents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalMyComponents.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.items = action.payload.result as unknown as MyComponentsModel[];
        state.totalPages = action?.payload?.totalPages;
        state.totalItems = action?.payload?.totalItems;
        state.totalComponents = action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: false,
        })) as MyComponentsModel[];
      })
      .addCase(getTotalMyComponents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getAllMyComponentsInToolBox.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMyComponentsInToolBox.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.itemsInToolBox = action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: false,
        })) as MyComponentsModel[];
      })
      .addCase(getAllMyComponentsInToolBox.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchUserCardsByRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCardsByRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userCardsByRoles = action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: false,
        })) as MyComponentsModel[];
      })
      .addCase(fetchUserCardsByRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default getAllMyComponentsSlice.reducer;
