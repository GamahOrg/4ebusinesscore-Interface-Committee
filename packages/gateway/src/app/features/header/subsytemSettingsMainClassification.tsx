import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import SubSystemClassification from "../../models/SubSystemClassification";
import SystemClassification from "../../models/SystemClassification";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";

interface SubSystemClassificationState {
  items: SubSystemClassification[];
  item: SubSystemClassification;
  allSubsytemByClassificationid: SystemClassification;
  status: RequestStatus;
  pagination: Pagination;
  error: string | null;
}

const initialState: SubSystemClassificationState = {
  items: [],
  item: new SubSystemClassification(),
  allSubsytemByClassificationid: new SystemClassification(),
  status: RequestStatus.idle,
  pagination: new Pagination(),
  error: null,
};

export const GetAllSubSystemSettingsMainClassificationByRowCount =
  createAsyncThunk<ResponseModel, any>(
    "workspace/fetchSubsystemsSettingsMainClassificationByRowCount",
    async (params = {}, thunkApi) => {
      try {
        const response =
          await WorkspaceConsume.GetAllSubsytemSettingsMainClassificationByRowCount(
            params
          );
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
export const GetSubsystemSettingsClassificationById = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/fetchSubsystemSettingsClassificationById",
  async (subSystemId = {}, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.GetSubsystemSettingsMainClassificationById(
          subSystemId
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addSubsystemSettingsMainClassification = createAsyncThunk(
  "workspace/addSubsystemSettingsMainClassification",
  async (newSubSystem: object, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.PostSubsystemSettingsMainClassification(
          newSubSystem
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editSubsystemSettingsMainClassification = createAsyncThunk(
  "workspace/editSubsystemSettingsMainClassification",
  async (editedSubSystem: object, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.PutSubsystemSettingsMainClassificationById(
          editedSubSystem
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editSubsystemSettingsMainClassificationSequence = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/editSubsystemSettingsMainClassificationSequence",
  async (editedSubSystemSequence: any, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.PutSubsystemSettingsMainClassificationSequence(
          editedSubSystemSequence
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeSubsystemSettingsMainClassification = createAsyncThunk(
  "workspace/removeSubsystemSettingsMainClassification",
  async (subSystemId: string, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.DeleteSubsystemSettingsMainClassification(
          subSystemId
        );
      const responseWithId = { response, subSystemId };
      return responseWithId;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editSubsytemMainClassificationSequence = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/editSubsytemMainClassificationSequence",
  async (editedSubSystemSequence: any, thunkApi) => {
    try {
      const response =
        await ControlPanelAggConsume.UpdateSubsytemMainClassificationSequence(
          editedSubSystemSequence
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAllSubsytemSettingsbyMainClassificationid = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/getAllSubsytemSettingsbyMainClassificationid",
  async (MainClassificationid: any, thunkApi) => {
    try {
      const response =
        await ControlPanelAggConsume.getAllSubsytemSettingsbyMainClassificationid(
          MainClassificationid
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postSubsytemSettingsMainClassificationSequence = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/postSubsytemSettingsMainClassificationSequence",
  async (postSequence: any, thunkApi) => {
    try {
      const response =
        await ControlPanelAggConsume.PostSubsytemSettingsMainClassificationSequence(
          postSequence
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const SubsystemSettingsClassification = createSlice({
  name: "SubsystemSettingsClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        GetAllSubSystemSettingsMainClassificationByRowCount.pending,
        handlePending
      )
      .addCase(
        GetAllSubSystemSettingsMainClassificationByRowCount.fulfilled,
        (state, action) => {
          state.items = action.payload.result as SubSystemClassification[];
          state.pagination = (action as PayloadAction<ResponseModel>).payload;

          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(
        GetAllSubSystemSettingsMainClassificationByRowCount.rejected,
        handleRejected
      )
      .addCase(GetSubsystemSettingsClassificationById.pending, handlePending)
      .addCase(
        GetSubsystemSettingsClassificationById.fulfilled,
        (state, action) => {
          state.item = action.payload.result as SubSystemClassification;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(GetSubsystemSettingsClassificationById.rejected, handleRejected)
      .addCase(addSubsystemSettingsMainClassification.pending, handlePending)
      .addCase(
        addSubsystemSettingsMainClassification.fulfilled,
        (state, action) => {
          state.items = [
            ...state.items,
            action.payload.result,
          ] as SubSystemClassification[];
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(addSubsystemSettingsMainClassification.rejected, handleRejected)
      .addCase(editSubsystemSettingsMainClassification.pending, handlePending)
      .addCase(
        editSubsystemSettingsMainClassification.fulfilled,
        handleFulfilled
      )
      .addCase(editSubsystemSettingsMainClassification.rejected, handleRejected)
      .addCase(
        editSubsystemSettingsMainClassificationSequence.pending,
        handlePending
      )
      .addCase(
        editSubsystemSettingsMainClassificationSequence.fulfilled,
        handleFulfilled
      )
      .addCase(
        editSubsystemSettingsMainClassificationSequence.rejected,
        handleRejected
      )
      .addCase(
        postSubsytemSettingsMainClassificationSequence.pending,
        handlePending
      )
      .addCase(
        postSubsytemSettingsMainClassificationSequence.fulfilled,
        handleFulfilled
      )
      .addCase(
        postSubsytemSettingsMainClassificationSequence.rejected,
        handleRejected
      )
      .addCase(
        removeSubsystemSettingsMainClassification.fulfilled,
        (state, action) => {
          state.items = state.items.filter(
            (item) => item?.id !== action.payload.subSystemId
          );
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(
        removeSubsystemSettingsMainClassification.rejected,
        handleRejected
      )
      .addCase(removeSubsystemSettingsMainClassification.pending, handlePending)
      .addCase(editSubsytemMainClassificationSequence.pending, handlePending)
      .addCase(
        editSubsytemMainClassificationSequence.fulfilled,
        handleFulfilled
      )
      .addCase(editSubsytemMainClassificationSequence.rejected, handleRejected)
      .addCase(
        getAllSubsytemSettingsbyMainClassificationid.fulfilled,
        (state, action) => {
          state.allSubsytemByClassificationid = action.payload
            .result as SystemClassification;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(
        getAllSubsytemSettingsbyMainClassificationid.rejected,
        handleRejected
      )
      .addCase(
        getAllSubsytemSettingsbyMainClassificationid.pending,
        handlePending
      );
  },
});

const handlePending = (state: SubSystemClassificationState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: SubSystemClassificationState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: SubSystemClassificationState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};
export default SubsystemSettingsClassification.reducer;
