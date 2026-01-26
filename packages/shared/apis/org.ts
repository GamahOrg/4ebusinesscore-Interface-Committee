import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const OrgEndpoints: { [key: string]: Endpoint } = {
  getAllOrgs: { url: "/OrgHierarchy/GetAll", method: "get" },
  getAllOrgCategory: { url: "/Lookup/GetAllLookup", method: "get" },
  post: { url: "/OrgHierarchy", method: "post" },
  update: { url: "/OrgHierarchy", method: "putById" },
  delete: { url: "/OrgHierarchy", method: "delete" },
  deleteMember: {
    url: "/OperationsUsers/DeleteOrgHierachyMembers",
    method: "deleteByBody",
  },
  getOrgPath: { url: "/OrgHierarchy/GetOrgPath", method: "get" },
  getOrganization: { url: "/OrgHierarchy/GetAll", method: "get" },
  getAllOrgWithMembersHierarchy: { url: "/OrgHierarchy/GetAll", method: "get" },
  getOrgCategory: { url: "/OrgHierarchy/GetOrgCategory", method: "get" },
  postLookUp: { url: "/Lookup", method: "post" },
  deleteLookUp: { url: "/Lookup", method: "delete" },
  putLookUp: { url: "/Lookup/PutLookup", method: "putById" },
  getAllOrgsBySearch: { url: "OrgHierarchy/GetAllOrgBySearch", method: "get" },
};

export const OrgRootUrl = (window as any)._env_?.REACT_APP_API_Org_Url;
export const OrgBaseUrl = `${OrgRootUrl}/api/`;

export const OrgConsume = initializeConsume(OrgBaseUrl, OrgEndpoints);
