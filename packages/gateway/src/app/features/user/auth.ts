import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

// Async Thunk action creator
export const AuthUser = createAsyncThunk(
  "user/AuthUser",
  async (credentials: {}, thunkApi) => {
    try {
      const userData = await UserManagmentConsume.auth(credentials);
      return userData;
    } catch (error:any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  }
);
export const AuthLogout = createAsyncThunk(
  "user/AuthLogout",
  async (credentials: {}, thunkApi) => {
    try {
      const userData = await UserManagmentConsume.logout(credentials);
      return userData;
    } catch (error:any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  }
);
const initialState = {
  currentUser: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    // Reducers for synchronous actions
    // ... (AuthStart, AuthSuccess, AuthFailure)
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(AuthUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      });
  },
});

export const userToken = (state:any) => state.user.token;

export default authSlice.reducer;
