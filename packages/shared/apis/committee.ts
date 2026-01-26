import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const CommitteeEndpoints: { [key: string]: Endpoint } = {
  addCommittee: { url: "Committee/PostCommittee", method: "post" },
  getAllCommittees: {
    url: "Committee/GetAllCommitteesPaginated",
    method: "get",
  },
  getCommitteeById: { url: "Committee/GetCommitteeById", method: "getById" },
  getCommitteeTimeTable: {
    url: "Committee/GetCommitteeTimeTable",
    method: "getById",
  },
  editCommittee: { url: "Committee/PutCommittee", method: "putById" },
  changeCommitteeStatus: {
    url: "Committee/ChangeCommitteeStatus",
    method: "putById",
  },
  editAssignWorkflowToCommittee: {
    url: "Committee/AssignWorkflowToCommittee",
    method: "put",
  },
  editProceedingMemberAttendence: {
    url: "Committee/PutProceedingMemberAttendence",
    method: "put",
  },
  editProceedingMemberAcceptance: {
    url: "Committee/PutProceedingMemberAcceptance",
    method: "put",
  },
  deleteCommittee: { url: "Committee/DeleteCommittee", method: "delete" },
  addMeeting: { url: "Committee/PostMeeting", method: "post" },
  addProceeding: { url: "Committee/PostProceeding", method: "post" },
  addProceedingMembers: {
    url: "Committee/PostProceedingMembers",
    method: "post",
  },
  getAllOutputsByCommitteeId: {
    url: "Output/GetOutputsByCommitteeId",
    method: "getById",
  },
  addOutput: { url: "Committee/PostOutput", method: "post" },
  OutputType: { url: "Output/PostOutputType", method: "post" },
  getAllOutputTypes: { url: "Output/GetAllOutputTypes", method: "get" },
  editOutputType: { url: "Output/PutOutputType", method: "putById" },
  deleteOutputType: { url: "Output/DeleteOutputType", method: "delete" },
  addPermission: { url: "Permission/PostPermission", method: "post" },
  getAllPermissions: { url: "Permission/GetAllPermissions", method: "get" },
  editPermission: { url: "Permission/PutPermission", method: "putById" },
  deletePermission: { url: "Permission/DeletePermission", method: "delete" },
  getAllMeetings: {
    url: "/Committee/GetMeetingsByCommitteeId",
    method: "getById",
  },
  getProceedingsByCommitteeId: {
    url: "/Committee/GetProceedingsByCommitteeId",
    method: "getById",
  },
  getMeetingById: { url: "/Committee/GetMeetingById", method: "getById" },
  putProceeding: { url: "/Committee/PutProceeding", method: "put" },
};

export const CommitteeRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Committee_Url
}/`;
const CommitteeBaseUrl = `${CommitteeRootUrl}api/v1/`;

export const CommitteeConsume = initializeConsume(
  CommitteeBaseUrl,
  CommitteeEndpoints
);
