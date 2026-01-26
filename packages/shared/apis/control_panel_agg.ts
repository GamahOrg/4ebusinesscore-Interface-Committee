import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const ControlPanelAggEndpoints: { [key: string]: Endpoint } = {
  getOrgManagerbyId: { url: "/Org/GeManger", method: "getById" },
  getAllOrgMembers: { url: "/Org/GeAllMember", method: "getById" },
  getAllManagers: { url: "/Org/GeAllManger", method: "getById" },
  postOrgManager: { url: "/Org/PostOrgHierarchyManger", method: "post" },
  postOrgMembers: { url: "/Org/PostOrgHierarchyMembers", method: "post" },
  getUserView: { url: "/User/UserView", method: "get" },
  getJobsInfo: { url: "/User/functionDataAllInformationJob", method: "get" },
  postJobInfo: {
    url: "/User/PutfunctionDataAllInformationJob",
    method: "post",
  },
  getAllWorkspacesByLoggedUserRoles: {
    url: "/SubsytemSettingsAggregator/GetAllWorkspacesByLoggedUserRoles",
    method: "get",
  },
  getAllExternalSubsystemAndWorkspacesByLoggedUserRoles: {
    url: "/SubsytemSettingsAggregator/GetAllExternalSubsystemAndWorkspacesByLoggedUserRoles",
    method: "get",
  },
  getUserQuickAcess: { url: "/User/GetUserQuickAcess", method: "get" },
  postFlagQuickAccess: { url: "/User/PostFlagQuickAcess", method: "post" },
  getActiveQuickAccess: { url: "/User/GetActiveQuickAcess", method: "get" },
  GetWorkspaceTreePermisionRoleId: {
    url: "/SubsytemSettingsAggregator/GetAllsubsystemTree",
    method: "get",
  },
  WorkspacePermissionForRole: {
    url: "/User/WorkspacePermissionForRole",
    method: "get",
  },
  PostPermisionRole: { url: "/User/PostPermissionToRole", method: "post" },
  getEmployee: { url: "/Org/GetOrg", method: "get" },
  getEmployeeByManagerId: {
    url: "/Org/GeAllMemebersByManagerId",
    method: "getById",
  },
  AddUser: { url: "/User/PostUser", method: "post" },
  GetAllUsers: { url: "/User/GetUsers", method: "get" },
  getUserbyId: { url: "/User/GetUser", method: "getById" },
  editUserSummary: { url: "/User/PutUserSummary", method: "putById" },
  getGroupById: { url: "/User/GetGroupById", method: "getById" },
  addGroup: { url: "/User/PostGroup", method: "post" },
  editGroup: { url: "/User/PutGroup", method: "putById" },
  PostPermissionToRoleByVerb: {
    url: "/User/PostPermissionToRoleByVerb",
    method: "post",
  },
  getMyWorkspaces: {
    url: "/SubsytemSettingsAggregator/GetAllMyParts",
    method: "get",
  },
  getAllWorkspaces: {
    url: "/SubsytemSettingsAggregator/GetWorkSpaces",
    method: "get",
  },
  GetWorkSpaceById: {
    url: "/SubsytemSettingsAggregator/GetWorkSpaceById",
    method: "getById",
  },
  getWorkSpaceComponent: {
    url: "/SubsytemSettingsAggregator/GetWorkSpaceBySubsystem",
    method: "getByIdParams",
  },
  editSubsystem: {
    url: "/SubsytemSettingsAggregator/PutSubsystem",
    method: "putById",
  },
  editSubsystemCard: { url: "/SubsytemSettingsAggregator", method: "putById" },
  AddWorkSpace: { url: "/SubsytemSettingsAggregator", method: "post" },
  AddCardsystems: {
    url: "/SubsytemSettingsAggregator/PostSubsystem",
    method: "post",
  },
  GetAllMyComponents: {
    url: "/SubsytemSettingsAggregator/GetAllMyComponents",
    method: "get",
  },
  GetAllHiddenWorkspaces: {
    url: "/HiddenWorkspace/GetAllLoggedUserHiddenWorkspaces",
    method: "get",
  },
  getFavouritesList: {
    url: "/Favorite/GetAllLoggedUserFavorites",
    method: "get",
  },
  addToFavourites: { url: "/Favorite/PostFavoriteWorkspace", method: "post" },
  postHiddenWorkspace: {
    url: "/HiddenWorkspace/PostHiddenWorkspace",
    method: "post",
  },
  deleteHiddenWorkspace: {
    url: "/HiddenWorkspace/DeleteHiddenWorkspace",
    method: "delete",
  },
  switchFavourites: {
    url: "/Favorite/PutFavoriteWorkspace",
    method: "putById",
  },
  deleteFromFavourites: {
    url: "/Favorite/DeleteFavoriteWorkspace",
    method: "delete",
  },
  getUsersWithOrgDetails: { url: "/User/GetUsers", method: "get" },
  getOrgCategory: { url: "/Org/GetOrganizationCategories", method: "get" },
  getOrg: { url: "/Org/GetOrg", method: "get" },
  getAllSubsytemSettingsbyMainClassificationid: {
    url: "/SubsytemSettingsAggregator/GetSubsytemSettingsMainClassificationById",
    method: "getById",
  },
  getAllSubSystemByLoggedUserRoles: {
    url: "/SubsytemSettingsAggregator/GetAllSubSystemByLoggedUserRoles",
    method: "get",
  },
  getSubsytemSettingsMainClassificationAgg: {
    url: "SubsytemSettingsAggregator/GetAllSubsytemSettingsMainClassification",
    method: "get",
  },
  UpdateSubsytemMainClassificationSequence: {
    url: "/SubsytemSettingsAggregator/UpdateSubsytemSettingsMainClassificationSequence",
    method: "post",
  },
  PostSubsytemSettingsMainClassificationSequence: {
    url: "/SubsytemSettingsAggregator/PutSubsytemSettingsMainClassificationSequence",
    method: "post",
  },
  getAllLoggedInUser: {
    url: "/User/GetAllUsersByMangerLoggedUser",
    method: "get",
  },
};

const ControlPanelAggBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_ControlPanel_Agg_Url
}/api/`;
export const ControlPanelAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_ControlPanel_Agg_Url
}/`;

export const ControlPanelAggConsume = initializeConsume(
  ControlPanelAggBaseUrl,
  ControlPanelAggEndpoints
);
