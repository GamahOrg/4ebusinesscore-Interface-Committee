import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const DynamicWorkflowEndpoints: { [key: string]: Endpoint } = {
  postTransaction: { url: "/RequestTransaction", method: "post" },
  getRequestTemplateById: { url: "RequestTemplate", method: "getById" },
  getParentRequestTemplate: {
    url: "RequestTemplate/GetParentRequestTemplatesByCategoryId",
    method: "getById",
  },
  GetRequestTypesByCategoryId: {
    url: "RequestCategoryTypes/GetRequestTypesByCategoryId",
    method: "getById",
  },
  GetRequestTemplatesByRequestTypeId: {
    url: "RequestTemplate/GetRequestTemplatesByRequestTypeId",
    method: "getById",
  },
  getRequestCategory: { url: "RequestCategory", method: "get" },
  getRequestTemplate: { url: "RequestTemplate", method: "get" },
  postRequestTemplate: { url: "RequestTemplate", method: "post" },
  putRequestTemplate: { url: "RequestTemplate", method: "putById" },
  deleteRequestTemplate: { url: "RequestTemplate", method: "delete" },
  addRate: { url: "RequestRate", method: "post" },
  getRequestTemplatesByRequestTypeId: {
    url: "RequestTemplate/GetRequestTemplatesByRequestTypeId",
    method: "getById",
  },
  getAllRequestTemplateBycategoryId: {
    url: "RequestTemplate/GetAllRequestTemplateBycategoryId",
    method: "getByIdParams",
  },
  getAssginRequestTransaction: {
    url: "AssginRequestTransaction",
    method: "get",
  },
  addAssginRequestTransaction: {
    url: "AssginRequestTransaction",
    method: "post",
  },
  putAssginRequestTransaction: {
    url: "AssginRequestTransaction",
    method: "put",
  },
  deleteExceptionActionTacker: {
    url: "DefaultExceptionActionTacker",
    method: "deleteByBody",
  },
  postExceptionActionTacker: {
    url: "DefaultExceptionActionTacker",
    method: "post",
  },
  getIsAuthorizeStep: {
    url: "RequestInstance/IsAuthorizeStep",
    method: "getById",
  },
  getIsAuthorizeStepAssgin: {
    url: "RequestInstance/IsAuthorizeStepAssgin",
    method: "getById",
  },
};

const DynamicWorkflowBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_DynamicWorkFlow_Url
}/api/`;
export const DynamicWorkflowRootUrl = `${
  (window as any)._env_?.REACT_APP_API_DynamicWorkFlow_Url
}/`;

export const DynamicWorkflowConsume = initializeConsume(
  DynamicWorkflowBaseUrl,
  DynamicWorkflowEndpoints
);
