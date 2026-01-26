import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";
import { ResponseModel } from "../models/response-model";
import { AssignUsers } from "../models/assign-users";
import { Requests } from "../models/requests";
import { RequestOutgoingStatus } from "../models/response-status";
import { IncomingRequests } from "../models/incoming-requests";


export const fetchIncomingRequestsWithFilter = createAsyncThunk<
  ResponseModel,
  any
>("requests/fetchIncomingRequestsWithFilter", async (data: any, thunkApi) => {
  var bodyFormData = new FormData();
  if (Object.keys(data?.body)?.length > 0) {
    if (data?.body?.orgIds[0] != null) {
      for (let index = 0; index < data?.body?.orgIds?.length; index++) {
        bodyFormData.append("orgIds", data?.body?.orgIds[index]);
      }
    }
    if (data?.body?.requester[0] != null) {
      for (let index = 0; index < data?.body?.requester?.length; index++) {
        bodyFormData.append("requester", data?.body?.requester[index]);
      }
    }
    if (data?.body?.requestInstanceName[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceName?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceName",
          data?.body?.requestInstanceName[index]
        );
      }
    }
    if (data?.body?.categoryIds[0] != null) {
      for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
        bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
      }
    }
    if (data?.body?.requestInstanceNumber[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceNumber?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceNumber",
          data?.body?.requestInstanceNumber[index]
        );
      }
    }
    if (data?.body?.statues[0] != null) {
      for (let index = 0; index < data?.body?.statues?.length; index++) {
        bodyFormData.append("statues", data?.body?.statues[index]);
      }
    }
    if (data?.body?.dateTimes[0] != null) {
      for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
        bodyFormData.append(
          "dateTimes",
          data?.body?.dateTimes[index].split("T")[0]
        );
      }
    }
    if (data?.body?.delegatedUsers[0] != null) {
      for (let index = 0; index < data?.body?.delegatedUsers?.length; index++) {
        bodyFormData.append(
          "delegatedUsers",
          data?.body?.delegatedUsers[index]
        );
      }
    }
  }
  try {
    const response =
      await DynamicWorkflowAggConsume.getIncomingRequestsWithFilter({
        params: data.params,
        body: bodyFormData,
      });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});
export const fetchOutgoingRequestsWithFilter = createAsyncThunk<
  ResponseModel,
  any
>("requests/fetchOutgoingRequestsWithFilter", async (data: any, thunkApi) => {
  var bodyFormData = new FormData();
  if (Object.keys(data?.body)?.length > 0) {
    if (data?.body?.orgIds[0] != null) {
      for (let index = 0; index < data?.body?.orgIds?.length; index++) {
        bodyFormData.append("orgIds", data?.body?.orgIds[index]);
      }
    }

    if (data?.body?.requestInstanceName[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceName?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceName",
          data?.body?.requestInstanceName[index]
        );
      }
    }
    if (data?.body?.categoryIds[0] != null) {
      for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
        bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
      }
    }
    if (data?.body?.requestInstanceNumber[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceNumber?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceNumber",
          data?.body?.requestInstanceNumber[index]
        );
      }
    }
    if (data?.body?.statues[0] != null) {
      for (let index = 0; index < data?.body?.statues?.length; index++) {
        bodyFormData.append("statues", data?.body?.statues[index]);
      }
    }
    if (data?.body?.delegatedUsers[0] != null) {
      for (let index = 0; index < data?.body?.delegatedUsers?.length; index++) {
        bodyFormData.append(
          "delegatedUsers",
          data?.body?.delegatedUsers[index]
        );
      }
    }
    if (data?.body?.dateTimes[0] != null) {
      for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
        bodyFormData.append(
          "dateTimes",
          data?.body?.dateTimes[index]?.split("T")[0]
        );
      }
    }
  }
  try {
    const response =
      await DynamicWorkflowAggConsume.getOutgoingRequestsWithFilter({
        params: data.params,
        body: bodyFormData,
      });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});
export const fetchIncomingFilterAssginRequsets = createAsyncThunk<
  ResponseModel,
  any
>("requests/fetchIncomingFilterAssginRequsets", async (data: any, thunkApi) => {
  var bodyFormData = new FormData();
  if (Object.keys(data?.body)?.length > 0) {
    if (data?.body?.orgIds[0] != null) {
      for (let index = 0; index < data?.body?.orgIds?.length; index++) {
        bodyFormData.append("orgIds", data?.body?.orgIds[index]);
      }
    }
    if (data?.body?.requester[0] != null) {
      for (let index = 0; index < data?.body?.requester?.length; index++) {
        bodyFormData.append("requester", data?.body?.requester[index]);
      }
    }
    if (data?.body?.requestInstanceName[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceName?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceName",
          data?.body?.requestInstanceName[index]
        );
      }
    }
    if (data?.body?.categoryIds[0] != null) {
      for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
        bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
      }
    }
    if (data?.body?.requestInstanceNumber[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceNumber?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceNumber",
          data?.body?.requestInstanceNumber[index]
        );
      }
    }
    if (data?.body?.statues[0] != null) {
      for (let index = 0; index < data?.body?.statues?.length; index++) {
        bodyFormData.append("statues", data?.body?.statues[index]);
      }
    }
    if (data?.body?.delegatedUsers[0] != null) {
      for (let index = 0; index < data?.body?.delegatedUsers?.length; index++) {
        bodyFormData.append(
          "delegatedUsers",
          data?.body?.delegatedUsers[index]
        );
      }
    }
    if (data?.body?.dateTimes[0] != null) {
      for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
        bodyFormData.append(
          "dateTimes",
          data?.body?.dateTimes[index].split("T")[0]
        );
      }
    }
  }
  try {
    const response =
      await DynamicWorkflowAggConsume.getIncomingFilterAssginRequsets({
        params: data.params,
        body: bodyFormData,
      });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});
export const addRequestRate = createAsyncThunk<ResponseModel, any>(
  "requests/addRequestRate",
  async (data, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.addRate(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getOutgoingRequestsById = createAsyncThunk<ResponseModel, any>(
  "requests/getOutgoingRequestsById",
  async (params, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getRequestInstancesForUserById(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getIncomingRequestsById = createAsyncThunk<ResponseModel, any>(
  "requests/getIncomingRequestsById",
  async (params, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getRequestInstancesByActionTakerById(
          params
        );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAssginRequsetById = createAsyncThunk<ResponseModel, any>(
  "requests/fetchAssginRequsetById",
  async (params, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getAssginRequsetById(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchUsersForSendStep = createAsyncThunk<ResponseModel, any>(
  "requests/fetchUsersForSendStep",
  async (params, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getUsersForSendStep(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchIsAuthorizeStep = createAsyncThunk<ResponseModel, any>(
  "requests/fetchIsAuthorizeStep",
  async (id, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.getIsAuthorizeStep(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchIsAuthorizeStepAssgin = createAsyncThunk<ResponseModel, any>(
  "requests/fetchIsAuthorizeStepAssgin",
  async (id, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowConsume.getIsAuthorizeStepAssgin(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCountRequestInstances = createAsyncThunk<ResponseModel, any>(
  "requests/getCountRequestInstances",
  async (data: any, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowAggConsume.getCountRequestInstances();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchCanceledFilterRequests = createAsyncThunk<ResponseModel, any>(
  "requests/fetchCanceledFilterRequests",
  async (data: any, thunkApi) => {
    var bodyFormData = new FormData();
    if (Object.keys(data?.body)?.length > 0) {
      if (data?.body?.orgIds[0] != null) {
        for (let index = 0; index < data?.body?.orgIds?.length; index++) {
          bodyFormData.append("orgIds", data?.body?.orgIds[index]);
        }
      }

      if (data?.body?.mainClassificationsIds) {
        bodyFormData.append("mainClassificationsIds", data?.body?.mainClassificationsIds);
      }
      if (data?.body?.serviceCatalogsIds) {
        bodyFormData.append("serviceCatalogsIds", data?.body?.serviceCatalogsIds);
      }
      if (data?.body?.serviceManagementCategoryIds) {
        bodyFormData.append("serviceManagementCategoryIds", data?.body?.serviceManagementCategoryIds);
      }
      if (data?.body?.itemIds) {
        bodyFormData.append("itemIds", data?.body?.itemIds);
      }

      if (data?.body?.requester[0] != null) {
        for (let index = 0; index < data?.body?.requester?.length; index++) {
          bodyFormData.append("requester", data?.body?.requester[index]);
        }
      }
      if (data?.body?.requestInstanceName[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceName?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceName",
            data?.body?.requestInstanceName[index]
          );
        }
      }
      if (data?.body?.categoryIds[0] != null) {
        for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
          bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
        }
      }
      if (data?.body?.requestInstanceNumber[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceNumber?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceNumber",
            data?.body?.requestInstanceNumber[index]
          );
        }
      }
      if (data?.body?.statues[0] != null) {
        for (let index = 0; index < data?.body?.statues?.length; index++) {
          bodyFormData.append("statues", data?.body?.statues[index]);
        }
      }
      if (data?.body?.dateTimes[0] != null) {
        for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
          bodyFormData.append(
            "dateTimes",
            data?.body?.dateTimes[index].split("T")[0]
          );
        }
      }
      if (data?.body?.delegatedUsers[0] != null) {
        for (
          let index = 0;
          index < data?.body?.delegatedUsers?.length;
          index++
        ) {
          bodyFormData.append(
            "delegatedUsers",
            data?.body?.delegatedUsers[index]
          );
        }
      }
    }
    try {
      const response =
        await DynamicWorkflowAggConsume.getCanceledFilterAssignRequests({
          params: data.params,
          body: bodyFormData,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

export const fetchSuggestedRequestsWithFilter = createAsyncThunk<
  ResponseModel,
  any
>("requests/fetchSuggestedRequestsWithFilter", async (data: any, thunkApi) => {
  var bodyFormData = new FormData();
  if (Object.keys(data?.body)?.length > 0) {
    if (data?.body?.orgIds[0] != null) {
      for (let index = 0; index < data?.body?.orgIds?.length; index++) {
        bodyFormData.append("orgIds", data?.body?.orgIds[index]);
      }
    }

    if (data?.body?.mainClassificationsIds) {
      bodyFormData.append("mainClassificationsIds", data?.body?.mainClassificationsIds);
    }
    if (data?.body?.serviceCatalogsIds) {
      bodyFormData.append("serviceCatalogsIds", data?.body?.serviceCatalogsIds);
    }
    if (data?.body?.serviceManagementCategoryIds) {
      bodyFormData.append("serviceManagementCategoryIds", data?.body?.serviceManagementCategoryIds);
    }
    if (data?.body?.itemIds) {
      bodyFormData.append("itemIds", data?.body?.itemIds);
    }

    if (data?.body?.requestInstanceName[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceName?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceName",
          data?.body?.requestInstanceName[index]
        );
      }
    }
    if (data?.body?.categoryIds[0] != null) {
      for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
        bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
      }
    }
    if (data?.body?.requestInstanceNumber[0] != null) {
      for (
        let index = 0;
        index < data?.body?.requestInstanceNumber?.length;
        index++
      ) {
        bodyFormData.append(
          "requestInstanceNumber",
          data?.body?.requestInstanceNumber[index]
        );
      }
    }
    if (data?.body?.statues[0] != null) {
      for (let index = 0; index < data?.body?.statues?.length; index++) {
        bodyFormData.append("statues", data?.body?.statues[index]);
      }
    }
    if (data?.body?.delegatedUsers[0] != null) {
      for (let index = 0; index < data?.body?.delegatedUsers?.length; index++) {
        bodyFormData.append(
          "delegatedUsers",
          data?.body?.delegatedUsers[index]
        );
      }
    }
    if (data?.body?.dateTimes[0] != null) {
      for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
        bodyFormData.append(
          "dateTimes",
          data?.body?.dateTimes[index]?.split("T")[0]
        );
      }
    }
  }
  try {
    const response =
      await DynamicWorkflowAggConsume.getSuggestedRequestsWithFilter({
        params: data.params,
        body: bodyFormData,
      });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.message);
  }
});

interface requests {
  requestCount: any;
  isAuthorizeStep: boolean;
  canceledRequests: IncomingRequests[],
  isAuthorizeStepAssgin: boolean;
  assignUsers: AssignUsers[];
  incomingRequests: IncomingRequests[];
  incomingRequest: IncomingRequests;
  outgoingRequests: Requests[];
  outgoingRequest: Requests;
  assignRequests: IncomingRequests[];
  assignRequest: IncomingRequests;
  statusForIncoming: string;
  totalPagesForIncoming: number;
  totalItemsForIncoming: number;
  messageForIncoming: string;
  pageSizeForIncoming: number;
  pageIndexForIncoming: number;
  statusForOutgoing: string;
  totalPagesForOutgoing: number;
  totalItemsForOutgoing: number;
  messageForOutgoing: string;
  pageSizeForOutgoing: number;
  pageIndexForOutgoing: number;
  statusForAssign: string;
  totalPagesForAssign: number;
  totalItemsForAssign: number;
  messageForAssign: string;
  pageSizeForAssign: number;
  pageIndexForAssign: number;
  totalPagesForCancelled: number;
  totalItemsForCancelled: number;
  pageSizeForCancelled: number;
  pageIndexForCancelled: number;
  status: string;
  suggestedRequests: Requests[];
  messageForSuggested: string;
  statusForSuggested: string;
  totalPagesForSuggested: number;
  totalItemsForSuggested: number;
  pageSizeForSuggested: number;
  pageIndexForSuggested: number;
}

let initialState: requests = {
  requestCount: 0,
  isAuthorizeStep: false,
  isAuthorizeStepAssgin: false,
  assignUsers: [],
  incomingRequests: [],
  outgoingRequests: [],
  canceledRequests: [],
  assignRequests: [],
  incomingRequest: {
    id: "",
    name: "",
    date: new Date(),
    requestStatus: 0,
    createdByFirstName: "",
    createdBySecondName: "",
    createdByThirdName: "",
    createdByFourthName: "",
    orgNameAr: "",
    orgNameEn: "",
    requestCategoryName: "",
    requestNumber: "",
    createBy: "",
    email: "",
  },
  outgoingRequest: {
    id: "",
    requestName: "",
    destinationName: "",
    organizationName: "",
    requestDate: "",
    requestStatus: RequestOutgoingStatus?.Pinding,
    roleName: "",
    requestCategoryName: "",
    requestNumber: "",
  },
  assignRequest: {
    id: "",
    name: "",
    date: new Date(),
    requestStatus: 0,
    createdByFirstName: "",
    createdBySecondName: "",
    createdByThirdName: "",
    createdByFourthName: "",
    orgNameAr: "",
    orgNameEn: "",
    requestCategoryName: "",
    requestNumber: "",
    createBy: "",
    email: "",
  },
  statusForIncoming: "idle",
  totalPagesForIncoming: 0,
  totalItemsForIncoming: 0,
  messageForIncoming: "",
  pageSizeForIncoming: 0,
  pageIndexForIncoming: 0,
  statusForOutgoing: "idle",
  totalPagesForOutgoing: 0,
  totalItemsForOutgoing: 0,
  messageForOutgoing: "",
  pageSizeForOutgoing: 0,
  pageIndexForOutgoing: 0,
  statusForAssign: "idle",
  totalPagesForAssign: 0,
  totalItemsForAssign: 0,
  messageForAssign: "",
  pageSizeForAssign: 0,
  pageIndexForAssign: 0,
  status: "idle",
  totalPagesForCancelled: 0,
  totalItemsForCancelled: 0,
  pageSizeForCancelled: 0,
  pageIndexForCancelled: 0,
  suggestedRequests: [],
  messageForSuggested: "",
  statusForSuggested: "idle",
  totalPagesForSuggested: 0,
  totalItemsForSuggested: 0,
  pageSizeForSuggested: 0,
  pageIndexForSuggested: 0
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomingRequestsWithFilter.pending, (state: requests) => {
        state.statusForIncoming = "loading";
      })
      .addCase(
        fetchIncomingRequestsWithFilter.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForIncoming = "succeeded";
          state.incomingRequests = action.payload
            .result as unknown as IncomingRequests[];
          state.totalPagesForIncoming = action.payload.totalPages;
          state.totalItemsForIncoming = action.payload.totalItems;
          state.pageIndexForIncoming = action.payload.pageIndex;
          state.pageSizeForIncoming = action.payload.pageSize;
        }
      )
      .addCase(
        fetchIncomingRequestsWithFilter.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForIncoming = "failed";
          state.messageForIncoming = action.payload;
        }
      )
      .addCase(fetchOutgoingRequestsWithFilter.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        fetchOutgoingRequestsWithFilter.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForOutgoing = "succeeded";
          state.outgoingRequests = action.payload
            .result as unknown as Requests[];
          state.totalPagesForOutgoing = action.payload.totalPages;
          state.totalItemsForOutgoing = action.payload.totalItems;
          state.pageIndexForOutgoing = action.payload.pageIndex;
          state.pageSizeForOutgoing = action.payload.pageSize;
        }
      )
      .addCase(
        fetchOutgoingRequestsWithFilter.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForOutgoing = "failed";
          state.messageForOutgoing = action.payload;
        }
      )
      .addCase(fetchIncomingFilterAssginRequsets.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        fetchIncomingFilterAssginRequsets.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForAssign = "succeeded";
          state.assignRequests = action.payload
            .result as unknown as IncomingRequests[];
          state.totalPagesForAssign = action.payload.totalPages;
          state.totalItemsForAssign = action.payload.totalItems;
          state.pageIndexForAssign = action.payload.pageIndex;
          state.pageSizeForAssign = action.payload.pageSize;
        }
      )
      .addCase(
        fetchIncomingFilterAssginRequsets.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForAssign = "failed";
          state.messageForAssign = action.payload;
        }
      )
      .addCase(getOutgoingRequestsById.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        getOutgoingRequestsById.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForOutgoing = "succeeded";
          state.outgoingRequest = action.payload.result as Requests;
        }
      )
      .addCase(getOutgoingRequestsById.rejected, (state: requests) => {
        state.statusForOutgoing = "failed";
      })
      .addCase(getIncomingRequestsById.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        getIncomingRequestsById.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForIncoming = "succeeded";
          state.incomingRequest = action.payload.result as IncomingRequests;
        }
      )
      .addCase(getIncomingRequestsById.rejected, (state: requests) => {
        state.statusForIncoming = "failed";
      })
      .addCase(fetchAssginRequsetById.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        fetchAssginRequsetById.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForAssign = "succeeded";
          state.assignRequest = action.payload.result as IncomingRequests;
        }
      )
      .addCase(fetchAssginRequsetById.rejected, (state: requests) => {
        state.statusForIncoming = "failed";
      })
      .addCase(fetchUsersForSendStep.pending, (state: requests) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        fetchUsersForSendStep.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.assignUsers = action.payload.result as AssignUsers[];
        }
      )
      .addCase(fetchUsersForSendStep.rejected, (state: requests) => {
        state.statusForIncoming = "failed";
      })
      .addCase(
        fetchIsAuthorizeStep.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.isAuthorizeStep = action.payload.result as unknown as boolean;
        }
      )
      .addCase(
        fetchIsAuthorizeStepAssgin.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.isAuthorizeStepAssgin = action.payload
            .result as unknown as boolean;
        }
      )

      .addCase(getCountRequestInstances.pending, (state: requests) => {
        state.status = "loading";
      })
      .addCase(
        getCountRequestInstances.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.requestCount = action.payload.result as any;
        }
      )
      .addCase(
        getCountRequestInstances.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.status = "failed";
        }
      ).addCase(
        fetchCanceledFilterRequests.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.canceledRequests = action.payload
            .result as unknown as IncomingRequests[];
          state.totalPagesForCancelled = action.payload.totalPages;
          state.totalItemsForCancelled = action.payload.totalItems;
          state.pageIndexForCancelled = action?.payload?.pageIndex
          state.pageSizeForCancelled = action?.payload?.pageSize
        }
      )
      .addCase(fetchSuggestedRequestsWithFilter.pending, (state: requests) => {
        state.statusForSuggested = "loading";
      })
      .addCase(
        fetchSuggestedRequestsWithFilter.fulfilled,
        (state: requests, action: PayloadAction<ResponseModel>) => {
          state.statusForSuggested = "succeeded";
          state.suggestedRequests = action.payload
            .result as unknown as Requests[];
          state.totalPagesForSuggested = action.payload.totalPages;
          state.totalItemsForSuggested = action.payload.totalItems;
          state.pageIndexForSuggested = action.payload.pageIndex;
          state.pageSizeForSuggested = action.payload.pageSize;
        }
      )
      .addCase(
        fetchSuggestedRequestsWithFilter.rejected,
        (state: requests, action: PayloadAction<any>) => {
          state.statusForSuggested = "failed";
          state.messageForSuggested = action.payload;
        }
      )
  },
});

export default requestsSlice.reducer;
