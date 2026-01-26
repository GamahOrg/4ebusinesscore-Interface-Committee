import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../models/response-model";
import { OrgHierarchyModel } from "../models/OrgHierarchyModel";
import { OrgConsume } from "@4eplatform/shared/apis/org";

export const fetchOrgs = createAsyncThunk<ResponseModel, object | undefined>(
  "orgs/fetchorgs",
  async (params = {}) => {
    const response = await OrgConsume.getAllOrgs(params);
    return response;
  }
);

interface OrgHierarchy {
  data: OrgHierarchyModel[];
  status: string;
  message: string;
}
let initialState: OrgHierarchy = {
  data: [],
  status: "idle",
  message: "",
};

const orgHierarchySlice = createSlice({
  name: "OrgHierarchy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state: OrgHierarchy) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgs.fulfilled,
        (state: OrgHierarchy, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as OrgHierarchyModel[];
          //   state.message = action.payload.message
          // state.message=action.payload
        }
      )
      .addCase(
        fetchOrgs.rejected,
        (state: OrgHierarchy, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
          // state.message=action.payload
        }
      );
  },
});

export default orgHierarchySlice.reducer;
