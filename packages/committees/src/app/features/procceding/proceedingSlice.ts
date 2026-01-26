import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/responseModel";
import { RequestStatus } from "../../enums/enums";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { ProceedingModel } from "../../models/proceeding-model";
import { CommitteeAggConsume } from "@4eplatform/shared/apis/committee_agg";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";

interface ProceedingState {
  proceeding: ProceedingModel;
  proceedings: ProceedingModel[];
  status: RequestStatus;
  data: any;
  error: string | null;
}

const initialState: ProceedingState = {
  proceeding: new ProceedingModel(),
  proceedings: [],
  status: RequestStatus.idle,
  data: [],
  error: "",
};

export const addProceeding = createAsyncThunk<ResponseModel, any>(
  "Committee/PostProceeding",
  async (newProceeding, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Name", newProceeding?.Name);
    bodyFormData.append("Notes", newProceeding?.Notes);
    bodyFormData?.append("Date", newProceeding?.Date);
    bodyFormData?.append("CommitteeId", newProceeding?.CommitteeId);
    if (newProceeding?.MeetingIds[0] != null) {
      for (
        let index = 0;
        index < newProceeding?.MeetingIds.length;
        index++
      ) {
        bodyFormData.append(
          "MeetingIds",
          newProceeding?.MeetingIds[index]
        );
      }
    }
    if (newProceeding?.ProceedingAttachments[0] != null) {
      for (
        let index = 0;
        index < newProceeding?.ProceedingAttachments.length;
        index++
      ) {
        bodyFormData.append(
          "ProceedingAttachments",
          newProceeding?.ProceedingAttachments[index]
        );
      }
    }
    try {
      const response = await CommitteeConsume.addProceeding(bodyFormData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const editProceeding = createAsyncThunk<ResponseModel, any>(
  "Committee/PutProceeding",
  async (newProceeding, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("ProceedingId", newProceeding?.ProceedingId);
    bodyFormData.append("ProceedingDto.Name", newProceeding?.Name);
    bodyFormData.append("ProceedingDto.Notes", newProceeding?.Notes);
    bodyFormData?.append("ProceedingDto.Date", newProceeding?.Date);
    bodyFormData?.append("ProceedingDto.CommitteeId", newProceeding?.CommitteeId);
    if (newProceeding?.MeetingIds[0] != null) {
      for (
        let index = 0;
        index < newProceeding?.MeetingIds.length;
        index++
      ) {
        bodyFormData.append(
          "ProceedingDto.MeetingIds",
          newProceeding?.MeetingIds[index]
        );
      }
    }
    if (newProceeding?.ProceedingAttachments[0] != null) {
      for (
        let index = 0;
        index < newProceeding?.ProceedingAttachments.length;
        index++
      ) {
        bodyFormData.append(
          "ProceedingDto.ProceedingAttachments",
          newProceeding?.ProceedingAttachments[index]
        );
      }
    }
    if (newProceeding?.OldProceedingAttachments[0] != null) {
      for (
        let index = 0;
        index < newProceeding?.OldProceedingAttachments?.length;
        index++
      ) {
        bodyFormData.append(
          "ProceedingDto.OldProceedingAttachments",
          newProceeding?.OldProceedingAttachments[index]?.path
        );
      }
    }
    try {
      const response = await CommitteeConsume.putProceeding(bodyFormData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putProceedingMemberAcceptance = createAsyncThunk<ResponseModel, any>(
  "Committee/putProceedingMemberAcceptance",
  async (data, thunkApi) => {
    try {
      const response = await CommitteeConsume.editProceedingMemberAcceptance(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getProceedings = createAsyncThunk<ResponseModel, any>(
  "proceedings/getProceedings",
  async (params = {}, thunkApi) => {
    try {
      const response = await CommitteeConsume.getProceedingsByCommitteeId(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getProceedingById = createAsyncThunk<ResponseModel, any>(
  "proceedings/getProceedingById",
  async (params = {}, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getProceeding(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addProceedingIdMembers = createAsyncThunk<ResponseModel, any>(
  "Committee/PostProceedingMembers",
  async (body, thunkApi) => {
    try {
      const response = await CommitteeConsume.addProceedingMembers(body);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const putMemberAttend = createAsyncThunk<ResponseModel, any>(
  "Committee/PutProceedingMemberAttendence",
  async (body, thunkApi) => {
    try {
      const response = await CommitteeConsume.editProceedingMemberAttendence(body);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


// export const getAllDelegationFromUserByUserId = createAsyncThunk<
//   ResponseModel,
//   any
// >(
//   "proceedings/getAllDelegationFromUserByUserId",
//   async ({ id, myParams }, thunkApi) => {
//     try {
//       const response =
//         await UserManagmentConsume.getAllDelegationFromUserByUserId({
//           id,
//           params: {
//             pageSize: myParams?.pageSize,
//             pageNumber: myParams?.pageNumber,
//           },
//         });
//       return response;
//     } catch (err: any) {
//       return thunkApi.rejectWithValue(err);
//     }
//   }
// );

export const getAllDelegationToUserByUserId = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("proceedings/getAllDelegationToUserByUserId", async ({ id, myparams }) => {
  const response = await UserManagmentConsume.getAllDelegationToUserByUserId({
    id,
    params: {
      pageSize: myparams?.pageSize,
      pageNumber: myparams?.pageNumber,
      date: myparams?.date,
    },
  });
  return response;
});
export const getAllDelegationFromUserByUserId = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("proceedings/getAllDelegationFromUserByUserId", async ({ id, myparams }) => {
  const response = await UserManagmentConsume.getAllDelegationFromUserByUserId({
    id,
    params: {
      pageSize: myparams?.pageSize,
      pageNumber: myparams?.pageNumber,
      date: myparams?.date,
    },
  });
  return response;
});

const proceedingsSlice = createSlice({
  name: "proceedings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProceedings.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.proceedings = (action as PayloadAction<ResponseModel>).payload
          .result as ProceedingModel[];
      })
      .addCase(getProceedings.pending, handlePending)
      .addCase(getProceedings.rejected, handleRejected)
      .addCase(getProceedingById.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.proceeding = (action as PayloadAction<ResponseModel>).payload
          .result as ProceedingModel;
      })
      .addCase(
        getAllDelegationToUserByUserId.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.status = RequestStatus.succeeded;
          state.data = (action as PayloadAction<ResponseModel>).payload
          .result as any;
        }
      )
      .addCase(getProceedingById.pending, handlePending)
      .addCase(getAllDelegationToUserByUserId.rejected, handlePending)
      .addCase(getAllDelegationToUserByUserId.pending, handlePending)
      .addCase(getProceedingById.rejected, handleRejected)
      .addCase(addProceeding.pending, handlePending)
      .addCase(addProceeding.fulfilled, handleFulfilled)
      .addCase(addProceeding.rejected, handleRejected)
      .addCase(editProceeding.pending, handlePending)
      .addCase(editProceeding.fulfilled, handleFulfilled)
      .addCase(editProceeding.rejected, handleRejected)
      .addCase(addProceedingIdMembers.pending, handlePending)
      .addCase(addProceedingIdMembers.fulfilled, handleFulfilled)
      .addCase(addProceedingIdMembers.rejected, handleRejected)
      .addCase(putMemberAttend.pending, handlePending)
      .addCase(putMemberAttend.fulfilled, handleFulfilled)
      .addCase(putMemberAttend.rejected, handleRejected)
      .addCase(putProceedingMemberAcceptance.pending, handlePending)
      .addCase(putProceedingMemberAcceptance.fulfilled, handleFulfilled)
      .addCase(putProceedingMemberAcceptance.rejected, handleRejected)
  },
});

const handlePending = (state: ProceedingState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: ProceedingState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: ProceedingState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default proceedingsSlice.reducer;
