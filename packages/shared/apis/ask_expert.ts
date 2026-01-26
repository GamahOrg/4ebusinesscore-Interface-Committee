import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const AskExpertEndpoints: { [key: string]: Endpoint } = {
  getAllSpecializations: {
    url: "/Specialization/GetAllSpecializations",
    method: "get",
  },
  getAllExpertsWithoutPagination: {
    url: "/Expert/GetAllExperts",
    method: "get",
  },
  addExpertBasicInfo: { url: "/Expert/PostExpert", method: "post" },
  editExpertBasicInfo: { url: "/Expert/PatchExpert", method: "patchById" },
  getAllExperts: { url: "/Expert/GetAllExpertsPaginated", method: "get" },
  getExpertById: { url: "/Expert/GetExpertById", method: "getById" },
  addExperience: { url: "/Expert/PostExperience", method: "post" },
  putExperience: { url: "/Expert/PutExperience", method: "putById" },
  deleteExperience: { url: "/Expert/DeleteExperience", method: "delete" },
  addQuestion: { url: "/Question", method: "post" },
  questionAddComment: { url: "/Comment", method: "post" },
  questionRemoveComment: { url: "/Comment", method: "delete" },
  putRequestedQuestions: {
    url: "/Question/PutRequestedQuestion",
    method: "putById",
  },
  getExperienceByExpertId: {
    url: "/Expert/GetExperienceByExpertId",
    method: "getById",
  },
  getExpertsBySpecializationId: {
    url: "/Expert/GetExpertsBySpecializationId",
    method: "getById",
  },
  deleteExpert: { url: "/Expert/DeleteExpert", method: "delete" },
  deleteQuestion: { url: "/Question", method: "delete" },
  editQuestion: { url: "/Question", method: "put" },
};

const AskExpertBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_AskExpert_Url
}/api/v1/`;

export const AskExpertConsume = initializeConsume(
  AskExpertBaseUrl,
  AskExpertEndpoints
);
