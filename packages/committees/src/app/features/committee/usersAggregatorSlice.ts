import { createSlice, PayloadAction ,createAsyncThunk} from "@reduxjs/toolkit";
import { sliceAction } from "@4eplatform/shared/assets/slices/sliceAction";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { UsersAggModel } from "../../models/users-aggregator-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { userRoleModel } from "../../models/user-role-model";

interface UsersState {
  users: UsersAggModel[];
  userRoles: userRoleModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
  user:UsersAggModel;
}

const initialState: UsersState = {
  status: RequestStatus.idle,
  error: "",
  users: [],
  userRoles:[],
  pagination: new Pagination(),
  user : new UsersAggModel()
};

export const getUsersWithOrgDetails = sliceAction("usersAgg/getUsers", (data) =>
  ControlPanelAggConsume.getUsersWithOrgDetails({
    searchTerm: data?.searchTerm,
    pageNumber: data?.pageNumber,
    pageSize: data?.pageSize,
  })
);

export const getUserById = createAsyncThunk<ResponseModel, any>(
  "usersAgg/getUserById",
  async (id, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getUserbyId(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchUserRoles = createAsyncThunk<ResponseModel, any>(
  "usersAgg/fetchUserRoles",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume?.getAllUserRoles
        (
          data.id, {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
const usersAggSlice = createSlice({
  name: "usersAgg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersWithOrgDetails.fulfilled, (state, action) => {
      state.status = RequestStatus.succeeded;
      state.users = (action as PayloadAction<ResponseModel>).payload
        .result as UsersAggModel[];
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.status = RequestStatus.succeeded;
      state.user = (action as PayloadAction<ResponseModel>)
        .payload.result as UsersAggModel;
    });
    builder.addCase(getUserById.pending, handlePending);
    builder.addCase(getUserById.rejected, handleRejected);
    builder.addCase(fetchUserRoles.fulfilled, (state, action) => {
      state.status = RequestStatus.succeeded;
      state.userRoles = (action as PayloadAction<ResponseModel>)
        .payload.result as userRoleModel[];
    });
    builder.addCase(fetchUserRoles.pending, handlePending);
    builder.addCase(fetchUserRoles.rejected, handleRejected);
  },
});



const handlePending = (state: UsersState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: UsersState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: UsersState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};
export default usersAggSlice.reducer;
