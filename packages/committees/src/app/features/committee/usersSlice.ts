import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceAction } from "@4eplatform/shared/assets/slices/sliceAction";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { casesHandler } from "@4eplatform/shared/assets/slices/casesHandler";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { UsersModel } from "../../models/users-model";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface UsersState {
  users: UsersModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: UsersState = {
  status: RequestStatus.idle,
  error: "",
  users: [],
  pagination: new Pagination(),
};

export const getUsers = sliceAction("users/getUsers",(data) =>
  UserManagmentConsume.getAllUsers({
    userName: data?.searchTerm,
    pageNumber: data?.pageNumber,
    pageSize: data?.pageSize,
  }),
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = RequestStatus.succeeded;
      state.users = (action as PayloadAction<ResponseModel>).payload
        .result as UsersModel[];
    });
    // addMatcher(
    //   (action) => action.type.startsWith("getUsers"),
    //   (state, action) => {
    //     switch (action.type) {
    //       case `${getUsers.fulfilled}`:
    //         state.allUsers = (action as PayloadAction<ResponseModel>).payload
    //           .result as UsersModel[];
    //         state.pagination = (action as PayloadAction<ResponseModel>).payload;
    //         return state;
    //       default:
    //         return casesHandler("getUsers")(state, action);
    //     }
    //   }
    // );
  },
});

export default usersSlice.reducer;
