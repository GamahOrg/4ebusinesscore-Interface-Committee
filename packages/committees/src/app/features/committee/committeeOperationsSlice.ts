import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/responseModel";
import { RequestStatus } from "../../enums/enums";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import objectToFormData from "@4eplatform/shared/assets/forms/FormData";

interface IdeasState {
  status: RequestStatus;
  error: string | null;
}

const initialState: IdeasState = {
  status: RequestStatus.idle,
  error: "",
};

export const addCommittee = createAsyncThunk<ResponseModel, any>(
  "committeeOperations/addCommittee",
  async (newCommittee, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Name", newCommittee?.Name);
    bodyFormData.append("CommitteeDate", newCommittee?.CommitteeDate);
    bodyFormData?.append("CommitteeTime", newCommittee?.CommitteeTime);
    if(newCommittee?.ProjectName){
      bodyFormData?.append("ProjectName", newCommittee?.ProjectName);
    }
    if(newCommittee?.Description){
      bodyFormData.append("Description", newCommittee?.Description);
    }
    bodyFormData.append("HasLegalDocument", newCommittee?.HasLegalDocument);
    if(newCommittee?.LegalDocument){
      bodyFormData.append("LegalDocument", newCommittee?.LegalDocument);
    }
    if(newCommittee?.WorkRule){
      bodyFormData.append("WorkRule", newCommittee?.WorkRule);
    }
    if(newCommittee?.Missions){
      bodyFormData.append("Missions", newCommittee?.Missions);
    }
    if(newCommittee?.EndDateCommittee){
      bodyFormData.append("EndDateCommittee", newCommittee?.EndDateCommittee);
    }
    // bodyFormData.append("Targets", JSON.stringify(newCommittee?.Targets));
    if (newCommittee?.Targets[0] != null) {
      for (let index = 0; index < newCommittee?.Targets.length; index++) {
        bodyFormData.append("Targets", JSON.stringify(newCommittee?.Targets[index]));
      }
    }
    if (newCommittee?.Attachments[0] != null) {
      for (let index = 0; index < newCommittee?.Attachments.length; index++) {
        bodyFormData.append("Attachments", newCommittee?.Attachments[index]);
      }
    }
    if (newCommittee?.WorkRules[0] != null) {
      for (let index = 0; index < newCommittee?.WorkRules.length; index++) {
        bodyFormData.append("WorkRules", newCommittee?.WorkRules[index]);
      }
    }
    if (newCommittee?.ExternalMembers[0] != null) {
      for (
        let index = 0;
        index < newCommittee?.ExternalMembers.length;
        index++
      ) {
        bodyFormData.append(
          "ExternalMembers",
          JSON.stringify(newCommittee?.ExternalMembers[index])
        );
      }
    }
    if (newCommittee?.InternalMembers[0] != null) {
      for (
        let index = 0;
        index < newCommittee?.InternalMembers.length;
        index++
      ) {
        bodyFormData.append(
          "InternalMembers",
          JSON.stringify(newCommittee?.InternalMembers[index])
        );
      }
    }
    // bodyFormData.append("InternalMembers",newCommittee?.InternalMembers)
    // bodyFormData.append("ExternalMembers",newCommittee?.ExternalMembers)
    try {
      const response = await CommitteeConsume.addCommittee(bodyFormData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const editCommitteee = createAsyncThunk<ResponseModel, any>(
  "committeeOperations/editCommittee",
  async (newCommittee, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Name", newCommittee?.Name);
    bodyFormData.append("CommitteeDate", newCommittee?.CommitteeDate);
    if(newCommittee?.EndDateCommittee){
      bodyFormData.append("EndDateCommittee", newCommittee?.EndDateCommittee);
    }
    bodyFormData?.append("CommitteeTime", newCommittee?.CommitteeTime);
    // if(newCommittee?.ProjectName){
      bodyFormData?.append("ProjectName", newCommittee?.ProjectName || "لا يوجد");
    // }
    // if(newCommittee?.Description){
      bodyFormData.append("Description", newCommittee?.Description);
    // }
    bodyFormData.append("HasLegalDocument", newCommittee?.HasLegalDocument);
    // if(newCommittee?.LegalDocument){
    bodyFormData.append("LegalDocument", newCommittee?.LegalDocument);
    // }
    // if(newCommittee?.WorkRule){
      bodyFormData.append("WorkRule", newCommittee?.WorkRule);
    // }
    // if(newCommittee?.Missions){
      bodyFormData.append("Missions", newCommittee?.Missions);
    // }
    // bodyFormData.append("Targets", JSON.stringify(newCommittee?.Targets));
    if (newCommittee?.Targets[0] != null) {
      for (let index = 0; index < newCommittee?.Targets.length; index++) {
        bodyFormData.append("Targets", JSON.stringify(newCommittee?.Targets[index]));
      }
    }

    // if (newCommittee?.Attachments[0] != null) {
    //   for (let index = 0; index < newCommittee?.Attachments.length; index++) {
    //     bodyFormData.append("Attachments", newCommittee?.Attachments[index]);
    //   }
    // }
    // if (newCommittee?.WorkRules[0] != null) {
    //   for (let index = 0; index < newCommittee?.WorkRules.length; index++) {
    //     bodyFormData.append("WorkRules", newCommittee?.WorkRules[index]);
    //   }
    // }
    if (newCommittee?.ExternalMembers[0] != null) {
      for (
        let index = 0;
        index < newCommittee?.ExternalMembers.length;
        index++
      ) {
        bodyFormData.append(
          "ExternalMembers",
          JSON.stringify(newCommittee?.ExternalMembers[index])
        );
      }
    }
    if (newCommittee?.InternalMembers[0] != null) {
      for (
        let index = 0;
        index < newCommittee?.InternalMembers.length;
        index++
      ) {
        bodyFormData.append(
          "InternalMembers",
          JSON.stringify(newCommittee?.InternalMembers[index])
        );
      }
    }
    try {
      const response = await CommitteeConsume.editCommittee({id:newCommittee?.id,body:bodyFormData});
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const committeeOperationsSlice = createSlice({
  name: "committeeOperations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCommittee.pending, handlePending)
      .addCase(addCommittee.fulfilled, handleFulfilled)
      .addCase(addCommittee.rejected, handleRejected)
      .addCase(editCommitteee.pending, handlePending)
      .addCase(editCommitteee.fulfilled, handleFulfilled)
      .addCase(editCommitteee.rejected, handleRejected);
  },
});

const handlePending = (state: IdeasState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: IdeasState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: IdeasState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default committeeOperationsSlice.reducer;
