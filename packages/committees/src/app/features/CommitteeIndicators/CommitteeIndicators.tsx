import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { CommitteeTimeTableModel } from "../../models/committee-time-table";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { CommitteeMembersModel } from "../../models/committee-members";
import { CommitteeIndicatorsConsume } from "@4eplatform/shared/apis/committeeIndicators";
import { IndicatorsOverAllModel, INITIAL_IndicatorsOverAllModel } from "../../models/IndicatorsOverAllModel";
import { MeetingsPerCommitteeModel } from "../../models/MeetingIndicatorsModel";
import { INITIAL_MembersIndicatorModel, MembersIndicatorModel } from "../../models/MembersIndicatorModel";
import { INITIAL_MembersJobIndicatorModel, MembersJobIndicatorModel } from "../../models/AllCommitteeDataIndicatorsModel";


interface CommitteesIndicatorsState {
  IndicatorsOverAll: IndicatorsOverAllModel;
  MembersIndicator:MembersIndicatorModel;
  MeetingIndicators: MeetingsPerCommitteeModel[];
  AllCommitteeDataIndicators: MembersJobIndicatorModel
  status: {
    getIndicatorsOverAllStatus: RequestStatus;
    getMembersIndicatorStatus: RequestStatus;
    getMeetingIndicatorsStatus: RequestStatus;
    getCommitteesStatus: RequestStatus;
    getAllCommitteeDataIndicatorsStatus: RequestStatus;
  };
  error: string | null;
  message: string;
  pagination: Pagination;
}

const initialState: CommitteesIndicatorsState = {
     IndicatorsOverAll: INITIAL_IndicatorsOverAllModel,
  MembersIndicator:INITIAL_MembersIndicatorModel,
  MeetingIndicators: [],
  AllCommitteeDataIndicators:INITIAL_MembersJobIndicatorModel ,
  status:{
    getIndicatorsOverAllStatus:   RequestStatus.idle,
    getMembersIndicatorStatus:   RequestStatus.idle,
    getMeetingIndicatorsStatus:   RequestStatus.idle,
    getCommitteesStatus:   RequestStatus.idle,
    getAllCommitteeDataIndicatorsStatus:   RequestStatus.idle,
  },
  error: "",
  pagination: new Pagination(),
  message: "",
};

export const getIndicatorsOverAll = createAsyncThunk<ResponseModel, any>(
  "committee/getIndicatorsOverAll",
  async (id: string, thunkApi) => {
    try {
      const response = await CommitteeIndicatorsConsume?.getIndicatorsOverAll();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const getMembersIndicator = createAsyncThunk<ResponseModel, any>(
  "committee/getMembersIndicator",
  async (id: string, thunkApi) => {
    try {
      const response = await CommitteeIndicatorsConsume?.getMembersIndicator();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const getMeetingIndicators = createAsyncThunk<ResponseModel, any>(
  "committee/getMeetingIndicators",
  async (id: string, thunkApi) => {
    try {
      const response = await CommitteeIndicatorsConsume.getMeetingIndicators();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const getAllCommitteeDataIndicators = createAsyncThunk<ResponseModel, any>(
  "committee/getAllCommitteeDataIndicators",
  async (params = {}, thunkApi) => {
    try {
      // const response = await CommitteeConsume.getAllCommittees(params);
      const response = await CommitteeIndicatorsConsume.getAllCommitteeDataIndicators(params);
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
      const response = await CommitteeIndicatorsConsume.getAllCommitteeMembers(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
const committeesIndicatorsSlice = createSlice({
  name: "committeeIndicatiors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       .addCase(getIndicatorsOverAll.fulfilled, (state, action) => {
        state.status.getIndicatorsOverAllStatus = RequestStatus.succeeded;
        state.IndicatorsOverAll = action.payload?.result as IndicatorsOverAllModel;
        // state.loading = false;
      })
      .addCase(getIndicatorsOverAll.pending, (state) => {
        handlePending(state, "getIndicatorsOverAllStatus");
      })
      .addCase(getIndicatorsOverAll.rejected, (state, action) => {
        handleRejected(state, action, "getIndicatorsOverAllStatus");
      })

      //meeting
       .addCase(getMeetingIndicators.fulfilled, (state, action) => {
        state.status.getMeetingIndicatorsStatus = RequestStatus.succeeded;
        state.MeetingIndicators = action.payload?.result as MeetingsPerCommitteeModel[];
        // state.loading = false;
      })
      .addCase(getMeetingIndicators.pending, (state) => {
        handlePending(state, "getMeetingIndicatorsStatus");
      })
      .addCase(getMeetingIndicators.rejected, (state, action) => {
        handleRejected(state, action, "getMeetingIndicatorsStatus");
      })


      //member
       .addCase(getMembersIndicator.fulfilled, (state, action) => {
        state.status.getMembersIndicatorStatus = RequestStatus.succeeded;
        state.MembersIndicator = action.payload?.result as MembersIndicatorModel;
      })
      .addCase(getMembersIndicator.pending, (state) => {
        handlePending(state, "getMembersIndicatorStatus");
      })
      .addCase(getMembersIndicator.rejected, (state, action) => {
        handleRejected(state, action, "getMembersIndicatorStatus");
      })


      //member
       .addCase(getAllCommitteeDataIndicators.fulfilled, (state, action) => {
        state.status.getAllCommitteeDataIndicatorsStatus = RequestStatus.succeeded;
        state.AllCommitteeDataIndicators = action.payload?.result as MembersJobIndicatorModel;
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(getAllCommitteeDataIndicators.pending, (state) => {
        handlePending(state, "getAllCommitteeDataIndicatorsStatus");
      })
      .addCase(getAllCommitteeDataIndicators.rejected, (state, action) => {
        handleRejected(state, action, "getAllCommitteeDataIndicatorsStatus");
      })

    
  },
});

const handlePending = (
  state: CommitteesIndicatorsState,
  statusKey: keyof CommitteesIndicatorsState["status"]
) => {
  state.status[statusKey] = RequestStatus.loading;
  // state.loading = true;
};

const handleRejected = (
  state: CommitteesIndicatorsState,
  action: any,
  statusKey: keyof CommitteesIndicatorsState["status"]
) => {
  state.status[statusKey] = RequestStatus.failed;
  state.error = action.error?.message ?? "AnErrorOccurred";
};

export default committeesIndicatorsSlice.reducer;
