import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { sliceAction } from "@4eplatform/shared/assets/slices/sliceAction";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { casesHandler } from "@4eplatform/shared/assets/slices/casesHandler";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { PermissionsModel } from "../../models/permissions-model";

interface PermissionsState {
  permissions: PermissionsModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: PermissionsState = {
  status: RequestStatus.idle,
  error: "",
  permissions: [],
  pagination: new Pagination(),
};

export const getPermissions = sliceAction(
  "permissions/getPermissions",
  CommitteeConsume.getAllPermissions
);
const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermissions.fulfilled, (state, action) => {
      state.status = RequestStatus.succeeded;
      state.permissions = (action as PayloadAction<ResponseModel>).payload
        .result as PermissionsModel[];
    });
    //   .addMatcher(
    //     (action) => action.type.startsWith("getPermissions"),
    //     (state, action) => {
    //       switch (action.type) {
    //         case `${getPermissions.fulfilled}`:
    //           state.permissions = (action as PayloadAction<ResponseModel>)
    //             .payload.result as PermissionsModel[];
    //           state.pagination = (
    //             action as PayloadAction<ResponseModel>
    //           ).payload;
    //           return state;
    //         default:
    //           return casesHandler("getPermissions")(state, action);
    //       }
    //     }
    //   )
  },
});

export default permissionsSlice.reducer;
