import { FormData } from "@4eplatform/shared/index";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const patchHomeSettingLanguageForm = createAsyncThunk<
  ResponseModel,
  any
>(
  "user-profile-patch-home-settings-language-form/patchHomeSettingsLanuageForm",
  async (data, thunkApi) => {
    var bodyFormData = FormData(data);
    try {
      const response = await UserManagmentConsume.patchLanguageForm(
        bodyFormData
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const patchHomeSettingLanguageFormSlice = createSlice({
  name: "user-profile-patch-home-settings-language-form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        patchHomeSettingLanguageForm.pending,
        (state: initialStateType) => {
          state.status = "loading";
        }
      )
      .addCase(
        patchHomeSettingLanguageForm.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        patchHomeSettingLanguageForm.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default patchHomeSettingLanguageFormSlice.reducer;
