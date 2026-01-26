import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const getFavouriteList = createAsyncThunk<any>(
  "favouriteList/getFavouriteList",
  async () => {
    const response = await ControlPanelAggConsume.getFavouritesList();

    return response;
  }
);

export const addToFavourites = createAsyncThunk<any, any>(
  "favouriteList/addToFavourites",
  async (id: any) => {
    const response = await ControlPanelAggConsume.addToFavourites(id);

    return response;
  }
);
export const deleteFromFavourites = createAsyncThunk<any, string>(
  "favouriteList/addToFavourites",
  async (id: any) => {
    const response = await ControlPanelAggConsume.deleteFromFavourites(id);
    return response;
  }
);

export const switchFavourites = createAsyncThunk<any, string>(
  "favouriteList/switchFavourites",
  async (id: any) => {
    const response = await ControlPanelAggConsume.switchFavourites(id);

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

const favouritesListSlice = createSlice({
  name: "FavouriteList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavouriteList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavouriteList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: true,
        })) as any;
      })
      .addCase(getFavouriteList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message ?? "An error occurred";
      });
  },
});

export default favouritesListSlice.reducer;
