import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const SLAEndpoints: { [key: string]: Endpoint } = {
  getAllSla: { url: "/SLA/GetAllSla", method: "get" },
  postSla: { url: "/SLA", method: "post" },
  putSla: { url: "/SLA", method: "put" },
  getSlaById: { url: "/SLA/GetSlaById", method: "getById" },
  deleteSLA: { url: "/SLA/DeleteSla", method: "delete" },
  addEscalationLevel: { url: "/EscalationLevel", method: "post" },
  deleteEscalationLevel: { url: "/EscalationLevel", method: "delete" },
  editEscalationLevel: { url: "/EscalationLevel", method: "putById" },
};

const SLABaseUrl = `${(window as any)._env_?.REACT_APP_API_SLA_Url}/api/`;

export const SLAConsume = initializeConsume(SLABaseUrl, SLAEndpoints);
