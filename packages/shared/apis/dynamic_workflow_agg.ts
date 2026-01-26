import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let defaultUsers = "DefaultExceptionActionTacker";
const DynamicWorkflowAggBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_DynamicWorkFlowAgg_Url
}/api/`;

const DynamicWorkflowAggEndpoints: { [key: string]: Endpoint } = {
  getRequestTimeline: { url: "/RequestInstance", method: "get" },
  getOutgoingRequests: {
    url: "/RequestInstance/GetOutgoingRequests",
    method: "get",
  },
  getIncomingRequests: {
    url: "/RequestInstance/GetIncomingRequests",
    method: "get",
  },
  getRequestTemplateById: { url: "/RequestTemplate", method: "getById" },
  getUsersForSendStep: {
    url: "/AssginRequset/GetUsersForSendStep",
    method: "getById",
  },
  getIncomingFilterAssginRequsets: {
    url: "/AssginRequset/GetIncomingFilterAssginRequsets",
    method: "postByParams",
  },
  getAssginRequsetById: {
    url: "/AssginRequset/GetAssginRequsetById",
    method: "getById",
  },
  getOutgoingRequestsWithFilter: {
    url: "/RequestInstance/GetFilterOutgoingRequests",
    method: "postByParams",
  },
  getIncomingRequestsWithFilter: {
    url: "/RequestInstance/GetFilterIncomingRequests",
    method: "postByParams",
  },
  getAllReportsByRequestId: {
    url: "/Reports/GetAllReportsByRequestId",
    method: "getById",
  },
  getAllApprovals: {
    url: "/RequestInstance/GetRequestInstancesProject",
    method: "get",
  },
  getAllApprovalsByProjectId: {
    url: "/RequestInstance/GetRequestByProjectId",
    method: "get",
  },
  getCountRequestInstanceProject: {
    url: "/RequestInstance/GetCountRequestInstanceProject",
    method: "get",
  },
  getRequestInstancesForUserById: {
    url: "RequestInstance/GetRequestInstancesForUserById",
    method: "getById",
  },
  getRequestInstancesByActionTakerById: {
    url: "RequestInstance/GetRequestInstancesByActionTakerById",
    method: "getById",
  },
  getDefaultExceptionActionTacker: {
    url: `${DynamicWorkflowAggBaseUrl}${defaultUsers}`,
    method: "get",
  },
  getNotExceptionActionTacker: {
    url: `DefaultExceptionActionTacker/NotDefaultExceptionActionTacker`,
    method: "get",
  },
  getAllFliterRequestInstancesTharUserTakeAction: {
    url: `RequestInstance/GetAllFliterRequestInstancesTharUserTakeAction`,
    method: "postByParams",
  },
  getCountRequestInstances: {
    url: "/RequestInstance/GetCountRequestInstances",
    method: "get",
  },
  getCanceledFilterAssignRequests: {
    url: "/RequestInstance/GetAllFliterCancelRequestInstance",
    method: "postByParams",
  },
  getSuggestedRequestsWithFilter: {
    url: "/RequestInstance/GetFilterSuggestionRequests",
    method: "postByParams",
  },
};

export const DynamicWorkflowAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_DynamicWorkFlowAgg_Url
}/`;

export const DynamicWorkflowAggConsume = initializeConsume(
  DynamicWorkflowAggBaseUrl,
  DynamicWorkflowAggEndpoints
);
