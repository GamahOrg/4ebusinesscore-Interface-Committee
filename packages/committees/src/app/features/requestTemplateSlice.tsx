
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { requestTamplateModel } from "../models/requestTamplateModel";
import { requestCategoryModel } from "../models/requestCategory";
import { parentRequestTemplateModel } from "../models/parentRequestTemplate";
import { OrgHierarchyModel } from "../models/org-model";
import { SlaModel } from "../models/slaModel";
import { RolsModel } from "../models/rols-model";
import { EmployeeModel } from "../models/employee-model";
import { ResponseModel } from "../models/response-model";
import { requestTamplateByIdModel } from "../models/requestTemplateByIdModel";
import { SpecializedModel } from "../models/SpecializedModel";
import { UserLoginModel } from "../models/user-login-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";
import { SLAConsume } from "@4eplatform/shared/apis/sla";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";
import { requestTypesByCategoryIdModel } from "../models/requestTypesByCategoryId";
import { requestTemplatesByRequestTypeIdModel } from "../models/requestTemplatesByRequestTypeId";
import { exceptionUsersModel } from "../models/exceptionUsersModel";


interface stateType {
  data: requestTamplateModel[];
  exceptionUsers:exceptionUsersModel[];
  dataCategory: requestCategoryModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalpages:number;
  taotalItems:number;
  parentRequestTemplate: parentRequestTemplateModel[];
  organization: OrgHierarchyModel[];
  sla: SlaModel[];
  rols: RolsModel[];
  employee: EmployeeModel[],
  requestTemplateById: requestTamplateByIdModel;
  message: string;
  specialized: SpecializedModel[];
  lookups:any[];
  userLogin: UserLoginModel;
  requestTypesByCategoryId: requestTypesByCategoryIdModel[];
  requestTemplatesByRequestTypeId: requestTemplatesByRequestTypeIdModel[];
}

const initialState: stateType = {
  data: [],
  exceptionUsers:[],
  dataCategory: [],
  status: "idle",
  error: null,
  totalpages: 1,
  taotalItems: 1,
  parentRequestTemplate: [],
  organization: [],
  sla: [],  
  rols: [],
  employee: [],
  requestTemplateById: new requestTamplateByIdModel(),
  message: '',
  specialized: [],
  lookups:[],
  userLogin: new UserLoginModel("", "", "", 0,"","","","",[]),
  requestTypesByCategoryId: [],
  requestTemplatesByRequestTypeId: [],
};

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

export const addRequestTemplate = createAsyncThunk(
  "requestTemplate/addRequestTemplate",
  async (data: any, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.postRequestTemplate(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const putRequestTemplate = createAsyncThunk(
  "requestTemplate/putRequestTemplate",
  async (data: any, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.putRequestTemplate(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getRequestTemplate= createAsyncThunk<ResponseModel,any>(
  "requestTemplate/getRequestTemplate",
  async (params:any = {}) => {
    const response = await DynamicWorkflowConsume.getRequestTemplate(  
      {
      pagesize: params?.pageSize,
      pagenumber: params?.pageNumber,
      date:params?.date,
    });
    return response;
  }
);

export const getExceptionUsersRequestTemplate= createAsyncThunk<ResponseModel,any>(
  "requestTemplate/getExceptionUsersRequestTemplate",
  async (params:any = {}) => {
    const response = await DynamicWorkflowAggConsume.getDefaultExceptionActionTacker(  
      {
      pageSize: params?.pageSize || "1000",
      pageNumber: params?.pageNumber || "1",
    });
    return response;
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


export const getParentRequestTemplate = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "getParentRequestTemplate",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.getParentRequestTemplate(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const GetRequestTypesByCategoryId = createAsyncThunk<
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

export const GetRequestTemplatesByRequestTypeId = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "GetRequestTemplatesByRequestTypeId",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response =
        await DynamicWorkflowConsume.GetRequestTemplatesByRequestTypeId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getOrganization = createAsyncThunk<ResponseModel,object|undefined>(
  "getOrganization",
  async (query={}, thunkApi) => {
    try {
      const response = await OrgConsume.getAllOrgs(query);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getSLA = createAsyncThunk(
  "getSLA",
  async (_, thunkApi) => {
    try {
      const response = await SLAConsume.getAllSla();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getRols = createAsyncThunk(
  "getRols",
  async (_, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getAllRoles();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getEmployee = createAsyncThunk<ResponseModel,object|undefined>(
  "getEmployee",
  async (query={}, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getEmployee(query);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getSpecialized = createAsyncThunk(
  "getSpecialized",
  async (_, thunkApi) => {
    try {
      const response = await OrgConsume.getAllOrgCategory();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const getAllLookUps = createAsyncThunk(
  "lookups/getAllLookUps",
  async () => {
    const response = await OrgConsume.getAllOrgCategory({
      PageNumber: 1,
      PageSize: 1000,
    });
    return response; // Assuming the result contains all lookups
  }
);

export const getUserLoggedIn = createAsyncThunk<ResponseModel, any>(
  "user-profile/userLoginSlice",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getUserLoggin(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

const requestTemplate2Slice = createSlice({
  name: "mainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRequestTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRequestTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addRequestTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

    // Get RequestTemplate
      .addCase(getRequestTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRequestTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.result as unknown as requestTamplateModel[];
        state.totalpages= action.payload.totalPages as number;
        state.taotalItems= action.payload.totalItems as number;
      })
      .addCase(getRequestTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // Put RequestTemplate
      .addCase(putRequestTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putRequestTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(putRequestTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

   
      // Get RequestCategory
      .addCase(getRequestCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRequestCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataCategory = action.payload.result as unknown as requestCategoryModel[];
      })
      .addCase(getRequestCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // GetParentRequestTemplatesByCategoryId

      .addCase(getParentRequestTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getParentRequestTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parentRequestTemplate = action.payload.result as unknown as parentRequestTemplateModel[];
      })
      .addCase(getParentRequestTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      // get exception users
       .addCase(getExceptionUsersRequestTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExceptionUsersRequestTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exceptionUsers = action.payload.result as unknown as exceptionUsersModel[];
      })
      .addCase(getExceptionUsersRequestTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // GetRequestTypesByCategoryId

      .addCase(GetRequestTypesByCategoryId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetRequestTypesByCategoryId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requestTypesByCategoryId = action.payload
          .result as unknown as requestTypesByCategoryIdModel[];
      })
      .addCase(GetRequestTypesByCategoryId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // GetRequestTemplatesByRequestTypeId

      .addCase(GetRequestTemplatesByRequestTypeId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetRequestTemplatesByRequestTypeId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requestTemplatesByRequestTypeId = action.payload
          .result as unknown as requestTemplatesByRequestTypeIdModel[];
      })
      .addCase(GetRequestTemplatesByRequestTypeId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // Get Organization
      .addCase(getOrganization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.organization = action.payload.result as unknown as OrgHierarchyModel[];
      })
      .addCase(getOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })


      // Get SLA
      .addCase(getSLA.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSLA.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sla = action.payload.result as unknown as SlaModel[];
      })
      .addCase(getSLA.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // Get Rols
      .addCase(getRols.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRols.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rols = action.payload.result as unknown as RolsModel[];
      })
      .addCase(getRols.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
       // Get Lookups
       .addCase(getAllLookUps.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllLookUps.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lookups = action.payload.result as unknown as RolsModel[];
      })
      .addCase(getAllLookUps.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // Get Employee
      .addCase(getEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload.result as unknown as EmployeeModel[];
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // Get specialized
      .addCase(getSpecialized.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSpecialized.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.specialized = action.payload.result as unknown as SpecializedModel[];
      })
      .addCase(getSpecialized.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })

      // Get getRequestTemplateById
      .addCase(getRequestTemplateById.pending, (state: stateType) => {
        state.status = "loading";
      })
      .addCase(
        getRequestTemplateById.fulfilled,
        (state: stateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.requestTemplateById = action.payload?.result as unknown as requestTamplateByIdModel;
        }
      )
      .addCase(
        getRequestTemplateById.rejected,
        (state: stateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )

      // Get getUserLoggedIn
      .addCase(getUserLoggedIn.pending, (state: stateType) => {
        state.status = "loading";
      })
      .addCase(
        getUserLoggedIn.fulfilled,
        (state: stateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.userLogin = action.payload.result as unknown as UserLoginModel;
        }
      )
      .addCase(
        getUserLoggedIn.rejected,
        (state: stateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
      
  },
});

export default requestTemplate2Slice.reducer;
