import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { CommitteeModel } from "../../models/committee-model";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { CommitteeAggConsume } from "@4eplatform/shared/apis/committee_agg";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { CommitteeConsume } from "@4eplatform/shared/apis/committee";
import { requestTamplateModel } from "../../models/requestTamplateModel"
import { requestTamplateByIdModel } from "../../models/requestTemplateByIdModel";
import { requestCategoryModel } from "../../models/requestCategory";
import { requestTypesByCategoryIdModel } from "../../models/requestTypesByCategoryId";
import { requestTemplatesByTypeIdModel } from "../../models/requestTemplatesByTypeId";

interface CommitteeApprovalState {
  committee: CommitteeModel;
  committees: CommitteeModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
  requestTamplates: requestTamplateModel[];
  totalpages:number;
  taotalItems:number;
  requestTemplateById: requestTamplateByIdModel;
  dataCategory: requestCategoryModel[];
  requestTypesByCategoryId: requestTypesByCategoryIdModel[];
  requestTemplatesBytypeId: requestTemplatesByTypeIdModel[];
  message: string;
}
   
const initialState: CommitteeApprovalState = {
  status: RequestStatus.idle,
  error: "",
  committee: new CommitteeModel(),
  committees: [],
  pagination: new Pagination(),
  requestTamplates: [],
  totalpages: 1,
  taotalItems: 1,
  requestTemplateById: new requestTamplateByIdModel(),
  dataCategory: [],
  requestTypesByCategoryId: [],
  requestTemplatesBytypeId: [],
  message: ''
};

export const fetchCommitteesApprovals = createAsyncThunk<ResponseModel, any>(
  "fetchCommitteesApprovals",
  async (params = {}, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getAllCommitteeApprovals(
        params
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCommitteeApprovals = createAsyncThunk<ResponseModel, string>(
  "fetchCommitteeApprovals",
  async (committeeId: string, thunkApi) => {
    try {
      const response = await CommitteeAggConsume.getCommitteeApprovalById(
        committeeId
      );
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAllRequestTemplate= createAsyncThunk<ResponseModel,any>(
  "requestTemplate/getRequestTemplate",
  async (params:any = {}) => {
    const response = await DynamicWorkflowConsume.getRequestTemplate(  
      {
      pagesize: params?.pageSize,
      pagenumber: params?.pageNumber,
    });
    return response;
  }
);

export const getRequestTemplateById = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "getRequestTemplateById",
  async (data: number | string | Number, thunkApi) => {
    
    try {
      const response = await DynamicWorkflowAggConsume.getRequestTemplateById(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getRequestCategory = createAsyncThunk(
  "requestCategory/getRequestCategory",
  async (_, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.getRequestCategory();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getRequestTypesByCategoryId = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "GetRequestTypesByCategoryId",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowConsume.GetRequestTypesByCategoryId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getRequestTemplatesByTypeId = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "GetRequestTemplatesByRequestTypeId",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowConsume.getRequestTemplatesByRequestTypeId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const putAssignWorkflowToCommittee = createAsyncThunk<ResponseModel, any>(
  "Committee/AssignWorkflowToCommittee",
  async (body, thunkApi) => {
    try {
      // const response = await CommitteeConsume.editAssignWorkflowToCommittee(body);
      const response = await CommitteeAggConsume.editAssignWorkflowToCommittee(body);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editChangeCommitteeStatus = createAsyncThunk<ResponseModel, any>(
  "committeeApprovals/ChangeCommitteeStatus",
  async ({ id, item }, thunkApi) => {
    try {
      const response = await CommitteeConsume.changeCommitteeStatus({id,body:item});
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const committeeApprovalSlice = createSlice({
  name: "committeeApprovals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommitteesApprovals.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.committees = (action as PayloadAction<ResponseModel>).payload
          ?.result as CommitteeModel[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })
      .addCase(fetchCommitteeApprovals.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.committee = (action as PayloadAction<ResponseModel>).payload
          ?.result as CommitteeModel;
      })
      .addCase(getAllRequestTemplate.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.requestTamplates = action.payload.result as unknown as requestTamplateModel[];
        state.totalpages= action.payload.totalPages as number;
        state.taotalItems= action.payload.totalItems as number;
      })
      .addCase(
        getRequestTemplateById.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.status =  RequestStatus.succeeded;
          state.requestTemplateById = action.payload?.result as unknown as requestTamplateByIdModel;
        }
      )
      .addCase(getRequestCategory.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.dataCategory = action.payload
          .result as unknown as requestCategoryModel[];
      })
      .addCase(getRequestTypesByCategoryId.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.requestTypesByCategoryId = action.payload
          .result as unknown as requestTypesByCategoryIdModel[];
      })
      .addCase(getRequestTemplatesByTypeId.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.requestTemplatesBytypeId = action.payload
          .result as unknown as requestTemplatesByTypeIdModel[];
      })
      .addCase(editChangeCommitteeStatus.pending, handlePending)
      .addCase(editChangeCommitteeStatus.fulfilled, handleFulfilled)
      .addCase(editChangeCommitteeStatus.rejected, handleRejected)
      .addCase(putAssignWorkflowToCommittee.pending, handlePending)
      .addCase(putAssignWorkflowToCommittee.fulfilled, handleFulfilled)
      .addCase(putAssignWorkflowToCommittee.rejected, handleRejected)
      .addCase(fetchCommitteesApprovals.pending, handlePending)
      .addCase(fetchCommitteesApprovals.rejected, handleRejected)
      .addCase(fetchCommitteeApprovals.pending, handlePending)
      .addCase(fetchCommitteeApprovals.rejected, handleRejected)
      .addCase(getAllRequestTemplate.pending, handlePending)
      .addCase(getAllRequestTemplate.rejected, handleRejected)
      .addCase(getRequestTemplateById.pending, handlePending)
      .addCase(getRequestTemplateById.rejected, handleRejected)
      .addCase(getRequestCategory.pending, handlePending)
      .addCase(getRequestCategory.rejected, handleRejected)
      .addCase(getRequestTypesByCategoryId.pending, handlePending)
      .addCase(getRequestTypesByCategoryId.rejected, handleRejected)
      .addCase(getRequestTemplatesByTypeId.pending, handlePending)
      .addCase(getRequestTemplatesByTypeId.rejected, handleRejected);
  },
});

const handlePending = (state: CommitteeApprovalState) => {
  state.status = RequestStatus.loading;
};

const handleFulfilled = (state: CommitteeApprovalState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: CommitteeApprovalState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default committeeApprovalSlice.reducer;
