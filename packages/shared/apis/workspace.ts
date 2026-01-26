import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const WorkspaceEndpoints: { [key: string]: Endpoint } = {
  getAllSubsystems: {
    url: "SubsytemSettings/GetAllsubsystemfilter",
    method: "get",
  },
  deleteSubsystems: { url: "SubsytemSettings", method: "delete" },
  editWorkspaceParts: { url: "SubsytemSettings/PutLookUp", method: "putById" },
  putWorkspaceActivation: {
    url: "SubsytemSettings/PutWorkSpaceActivaion",
    method: "putById",
  },
  getSubsystemsAndComponent: {
    url: "SubsytemSettings/GetAllSubsystemAndComponent",
    method: "get",
  },
  getSubsystems: { url: "SubsytemSettings/GetAllSubsystem", method: "get" },
  getNoteTypeId: { url: "SubsytemSettings/GetAllLookUp", method: "get" },
  GetAllTypeWithListOfWorkspaceParent: {
    url: "/SubsytemSettings/GetAllTypeWithListOfWorkspaceParents",
    method: "get",
  },
  GetAllSubsytemSettingsMainClassification: {
    url: "/SubsytemSettings/GetAllSubsytemSettingsMainClassification",
    method: "get",
  },
  GetAllSubsytemSettingsMainClassificationByRowCount: {
    url: "/SubsytemSettingsMainClassification/GetAllSubsytemSettingsMainClassificationByRowCount",
    method: "get",
  },
  GetSubsystemSettingsMainClassificationById: {
    url: "/SubsytemSettingsMainClassification/GetById",
    method: "getById",
  },
  PostSubsystemSettingsMainClassification: {
    url: "/SubsytemSettingsMainClassification",
    method: "post",
  },
  PutSubsystemSettingsMainClassificationById: {
    url: "/SubsytemSettingsMainClassification",
    method: "putById",
  },
  PutSubsystemSettingsMainClassificationSequence: {
    url: "/SubsytemSettingsMainClassification/PutSubsytemSettingsMainClassificationSquence",
    method: "put",
  },
  DeleteSubsystemSettingsMainClassification: {
    url: "/SubsytemSettingsMainClassification",
    method: "delete",
  },
  PutSubsystemSequence: {
    url: "/SubsytemSettings/PutSubsystemSquence",
    method: "put",
  },
  getAllSubSystemMainLookUP: {
    url: "/SubsytemSettings/GetAllSubsytemMainLookup",
    method: "get",
  },
  PostSSOSecuritySetting: {
    url: "/SSOSecuritySetting/PostSSOSecuritySetting",
    method: "postByParamsWithBody",
  },
  PutSSOSecuritySetting: {
    url: "/SSOSecuritySetting/PutSSOSecuritySetting",
    method: "putByQueryWithBody",
  },
  DeleteSSOSecuritySetting: {
    url: "/SSOSecuritySetting/DeleteSSOSecuritySetting",
    method: "deleteByQuery",
  },
  GetAllSSOSecuritySetting: {
    url: "/SSOSecuritySetting/GetAllSSOSecuritySetting",
    method: "get",
  },
  GetSubsytemSettingsByMainClassificationId: {
    url: "/SubsytemSettingsMainClassification/GetSubsytemSettingsByMainClassificationId",
    method: "getById",
  },
  GetComponentData: {
    url: "/SubsytemSettings/GetComponentData",
    method: "get",
  },
};

const WorkspaceBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_SubSystemSetting_Url
}/api/`;

export const WorkspaceConsume = initializeConsume(
  WorkspaceBaseUrl,
  WorkspaceEndpoints
);
