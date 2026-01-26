import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const CommitteeAggEndpoints: { [key: string]: Endpoint } = {
  getAllCommittees: {
    url: "Committee/GetAllCommittees",
    method: "get",
  },
  getAllCommitteeMembers: {
    url: "Committee/GetAllCommitteeMembers",
    method: "getByIdParams",
  },
  getAllCommitteeApprovals: {
    url: "CommitteeApproval/GetAllCommitteeApprovals",
    method: "get",
  },
  getCommitteeApprovalById: {
    url: "CommitteeApproval/GetCommitteeApprovalById",
    method: "getById",
  },
  getAllMeetingAttachments: {
    url: "Meeting/GetAllMeetingAttachments",
    method: "getById",
  },
  getOutputAttachments: {
    url: "Output/GetOutputAttachments",
    method: "getById",
  },
  getProceeding: { url: "Proceeding", method: "getById" },
  getCommitteeById: { url: "Committee/GetCommitteeById", method: "getById" },
  getOutputsByCommitteeId: {
    url: "Output/GetOutputsByCommitteeId",
    method: "getById",
  },
  getMeetingByCommitteeId: {
    url: "Meeting/GetMeetingByCommitteeId",
    method: "getById",
  },
  editAssignWorkflowToCommittee: {
    url: "Committee/AssignWorkflowToCommittee",
    method: "put",
  },
  fetchNotApprovedCommitteeById: {
    url: "Committee/GetNotApprovedCommitteeById",
    method: "getById",
  },
  getMeetingById: { url: "/Meeting/GetMeetingById", method: "getById" },
};

export const CommitteeAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Committee_Agg_Url
}/`;
const CommitteeAggBaseUrl = `${CommitteeAggRootUrl}api/`;

export const CommitteeAggConsume = initializeConsume(
  CommitteeAggBaseUrl,
  CommitteeAggEndpoints
);
