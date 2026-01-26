import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/responseModel";
import { RequestStatus } from "../../enums/enums";
import { MeetingModel } from "../../models/meeting-model";
import { CommitteeConsume } from '@4eplatform/shared/apis/committee';
import { CommitteeAggConsume } from "@4eplatform/shared/apis/committee_agg";
import { AttachmentModel } from "../../models/attachment-model"; 
interface MeetingState {
meeting:MeetingModel;
meetings:MeetingModel[];
status: RequestStatus;
error: string | null;
attachments:AttachmentModel[];
}

const initialState: MeetingState = {
    meeting:new MeetingModel(),
    meetings:[],
    status: RequestStatus.idle,
    error: "",
    attachments:[],
};

export const addMeeting = createAsyncThunk<ResponseModel, any>(
  "meetings/addMeeting",
  async (newMeeting, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Name",newMeeting?.Name)
    bodyFormData.append("Rules",newMeeting?.Rules)
    bodyFormData.append("Location",newMeeting?.Location)
    bodyFormData.append("MeetingStatus",newMeeting?.MeetingStatus)
    bodyFormData.append("HasExpertAssist",newMeeting?.HasExpertAssist)
    bodyFormData.append("MeetingDate",newMeeting?.MeetingDate)
    bodyFormData.append("CommitteeId",newMeeting?.CommitteeId)
    if(newMeeting?.ViceId){
      bodyFormData.append("ViceId",newMeeting?.ViceId)
    }
    bodyFormData.append("IsVice",newMeeting?.IsVice)
    if (newMeeting?.MeetingAttachments[0] != null) {
      for (let index = 0; index < newMeeting?.MeetingAttachments.length; index++) {
        bodyFormData.append("MeetingAttachments", newMeeting?.MeetingAttachments[index]);
      }
    }
    if (newMeeting?.ExternalMembers[0] != null) {
      for (
        let index = 0;
        index < newMeeting?.ExternalMembers.length;
        index++
      ) {
        bodyFormData.append(
          "ExternalMembers",
          JSON.stringify(newMeeting?.ExternalMembers[index])
        );
      }
    }
    try {
      const response = await CommitteeConsume.addMeeting(bodyFormData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  
  }
);
export const getMeetings = createAsyncThunk<ResponseModel, any>(
  "meetings/getMeetings",
  async (id, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getMeetingByCommitteeId(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAttachments = createAsyncThunk<ResponseModel, any>(
  "meetings/getAttachments",
  async (id, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getAllMeetingAttachments(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getMeetingById = createAsyncThunk<ResponseModel, any>(
  "meetings/getMeetingById",
  async (id, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getMeetingById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const MeetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMeeting.pending, handlePending)
      .addCase(addMeeting.fulfilled, handleFulfilled)
      .addCase(addMeeting.rejected, handleRejected)
      .addCase(getMeetings.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.meetings = (action as PayloadAction<ResponseModel>)
          .payload.result as MeetingModel[];
      })
      .addCase(getMeetings.pending, handlePending)
      .addCase(getMeetings.rejected, handleRejected)
      .addCase(getAttachments.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.attachments = (action as PayloadAction<ResponseModel>)
          .payload.result as AttachmentModel[];
      })
      .addCase(getAttachments.pending, handlePending)
      .addCase(getAttachments.rejected, handleRejected)
      .addCase(getMeetingById.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.meeting = (action as PayloadAction<ResponseModel>)
          .payload.result as MeetingModel;
      })
      .addCase(getMeetingById.pending, handlePending)
      .addCase(getMeetingById.rejected, handleRejected)
  },
});

const handlePending = (state: MeetingState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: MeetingState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: MeetingState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default MeetingSlice.reducer;
