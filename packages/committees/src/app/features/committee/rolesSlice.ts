import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { casesHandler } from "@4eplatform/shared/assets/slices/casesHandler";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { RoleModel } from "../../models/roles-model";
import { UserRole } from "../../models/users-in-role";

interface RolesState {
  roles: RoleModel[];
  usersInRole: UserRole[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: RolesState = {
  status: RequestStatus.idle,
  error: "",
  roles: [],
  usersInRole: [],
  pagination: new Pagination(),
};

export const fetchRoles = createAsyncThunk<ResponseModel, any>(
  "roles/fetchRoles",
  async (params: any = {}) => {
    const response = await UserManagmentConsume.getAllRoles({
      pageSize: params?.pageSize,
      pageNumber: params?.pageNumber,
    });
    return response;
  }
);
export const fetchUserRoles = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("roles/fetchUserRoles", async ({ id, myparams }) => {
  const response = await UserManagmentConsume.GetUserByRoleId({
    id,
    params: {
      pageSize: "1000000",
      pageNumber: "1",
    },
  });
  return response;
});

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.roles = (action as PayloadAction<ResponseModel>).payload
          .result as RoleModel[];
      })
      .addCase(
        fetchUserRoles.fulfilled,
        (state: RolesState, action: PayloadAction<ResponseModel>) => {
          state.usersInRole = action.payload.result as unknown as UserRole[];
        }
      );
  },
});

export default rolesSlice.reducer;
