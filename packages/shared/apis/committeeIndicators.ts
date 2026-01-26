import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const CommitteeIndicatorsEndpoints: { [key: string]: Endpoint } = {
  getIndicatorsOverAll: {
    url: "CommitteeIndicators/IndicatorsOverAll",
    method: "get",
  },
  getMembersIndicator: {
    url: "CommitteeIndicators/MembersIndicator",
    method: "get",
  },
  getMeetingIndicators: {
    url: "CommitteeIndicators/MeetingIndicators",
    method: "get",
  },
  getAllCommitteeDataIndicators: {
    url: "CommitteeIndicators/AllCommitteeDataIndicators",
    method: "get",
  },
};

export const CommitteeIndicatorsRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Committee_Url
}/`;
const CommitteeIndicatorsBaseUrl = `${CommitteeIndicatorsRootUrl}api/v1/`;

export const CommitteeIndicatorsConsume = initializeConsume(
  CommitteeIndicatorsBaseUrl,
  CommitteeIndicatorsEndpoints
);
