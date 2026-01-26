import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { HomeSettingsLanguageFormModel } from "../../models/home/home-settings-model";

export const fetchUserHomeLanguageFormSettings = createAsyncThunk<
  ResponseModel,
  any
>(
  "user-profile-home-language-form-settings/fetchUserHomeLanguageFormSettings",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getHomeFormLanguageSettings();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface UserData {
  data: HomeSettingsLanguageFormModel;
  status: string;
  totalPages: number;
  message: string;
}

let initialState: UserData = {
  data: new HomeSettingsLanguageFormModel("", "", "", false, "", ""),
  status: "idle",
  totalPages: 0,
  message: "",
};

const userHomeSettingsLanguageFormSlice = createSlice({
  name: "user-profile-home-language-form-settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserHomeLanguageFormSettings.pending, (state: UserData) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserHomeLanguageFormSettings.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as unknown as HomeSettingsLanguageFormModel;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchUserHomeLanguageFormSettings.rejected,
        (state: UserData, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default userHomeSettingsLanguageFormSlice.reducer;
