import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/response-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

export const fetchUserLogin = createAsyncThunk<ResponseModel, any>(
  "user-profile/userLoginSlice",
  async (data: any, thunkApi) => {
    try {
      // const response = await httpRequest.getLoggedInUser("");
      const response = await UserManagmentConsume.getUserLoggin(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface UserData {
  data: any;
  status: string;
  totalPages: number;
  message: string;
}

let initialState: UserData = {
  data: {},
  status: "idle",
  totalPages: 0,
  message: "",
};

const userLoginSlice = createSlice({
  name: "user-profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state: UserData) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserLogin.fulfilled,
        (state: UserData, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as any;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchUserLogin.rejected,
        (state: UserData, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default userLoginSlice.reducer;
