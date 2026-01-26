import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { CommitteeTimeTableModel } from "../../models/committee-time-table";
import { CommitteeModel } from "../../models/committee-model";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { CommitteeMembersModel } from "../../models/committee-members";
import { CommitteeAggConsume } from "@4eplatform/shared/apis/committee_agg";


interface CommitteesState {
  committee: CommitteeModel;
  notApprovedCommitteeById:CommitteeModel;
  committees: CommitteeModel[];
  committeeMembers: CommitteeMembersModel[]
  status: RequestStatus;
  error: string | null;
  CommitteeTimeTable:CommitteeTimeTableModel[];
  totalpages: number;
  taotalItems: number;
  totalPagesForMembers:number;
  totalItemsForMembers:number;
  message: string;
  pagination: Pagination;
}

const initialState: CommitteesState = {
  status: RequestStatus.idle,
  error: "",
  committee: new CommitteeModel(),
  notApprovedCommitteeById:new CommitteeModel(),
  committees: [],
  pagination: new Pagination(),
  CommitteeTimeTable: [],
  committeeMembers: [],
  totalpages: 1,
  taotalItems: 1,
  totalPagesForMembers: 1,
  totalItemsForMembers: 1,
  message: "",
};

export const getCommittee = createAsyncThunk<ResponseModel, any>(
  "committee/getCommittee",
  async (id: string, thunkApi) => {
    try {
      const response = await CommitteeAggConsume?.getCommitteeById(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const getNotApprovedCommitteeById = createAsyncThunk<ResponseModel, any>(
  "committee/getNotApprovedCommitteeById",
  async (id: string, thunkApi) => {
    try {
      const response = await CommitteeAggConsume?.fetchNotApprovedCommitteeById(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const getCommitteeTimeTable = createAsyncThunk<ResponseModel, any>(
  "committee/getCommitteeTimeTable",
  async (id: string, thunkApi) => {
    try {
      const response = await CommitteeConsume.getCommitteeTimeTable(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const getCommittees = createAsyncThunk<ResponseModel, any>(
  "committee/getCommittees",
  async (params = {}, thunkApi) => {
    try {
      // const response = await CommitteeConsume.getAllCommittees(params);
      const response = await CommitteeAggConsume.getAllCommittees(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCommitteeMembers = createAsyncThunk<ResponseModel, any>(
  "Committee/GetAllCommitteeMembers",
  async (data, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getAllCommitteeMembers(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
const committeesSlice = createSlice({
  name: "committee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommittee.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.committee = (action as PayloadAction<ResponseModel>).payload
          .result as CommitteeModel;
      })
      .addCase(getNotApprovedCommitteeById.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.notApprovedCommitteeById = (action as PayloadAction<ResponseModel>).payload
          .result as CommitteeModel;
      })
      .addCase(getCommitteeTimeTable.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.CommitteeTimeTable = (action as PayloadAction<ResponseModel>)
          .payload.result as CommitteeTimeTableModel[];
      })
      .addCase(getCommittees.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.committees = (action as PayloadAction<ResponseModel>).payload
          ?.result as CommitteeModel[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })
      .addCase(getCommitteeMembers.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.committeeMembers = action.payload.result as unknown as CommitteeMembersModel[];
        state.totalPagesForMembers= action.payload.totalPages as number;
        state.totalItemsForMembers = action.payload.totalItems as number;
      })
      .addCase(getCommittee.pending, handlePending)
      .addCase(getCommittee.rejected, handleRejected)
      .addCase(getCommitteeTimeTable.pending, handlePending)
      .addCase(getCommitteeTimeTable.rejected, handleRejected)
      .addCase(getCommittees.pending, handlePending)
      .addCase(getCommittees.rejected, handleRejected)
      .addCase(getCommitteeMembers.pending,handlePending)
      .addCase(getCommitteeMembers.rejected,handleRejected)
  },
});

const handlePending = (state: CommitteesState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: CommitteesState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default committeesSlice.reducer;
