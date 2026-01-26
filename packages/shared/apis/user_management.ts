import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const UserManagmentEndpoints: { [key: string]: Endpoint } = {
  getAllJobNames: { url: "/Lookup/GetAllJobNames", method: "get" },
  getAllJobRoles: { url: "/Lookup/GetAllJobRole", method: "get" },
  getAllJobDegree: { url: "/Lookup/GetAllJobDegree", method: "get" },
  getHomeSettings: {
    url: "v1/UserProfile/GetAllHomeSettingForUser",
    method: "get",
  },
  getHomeFormLanguageSettings: {
    url: "v1/UserProfile/GetAllLanguageFormForUser",
    method: "get",
  },
  getLanguagesLookup: {
    url: "v1/LK_LanguageForm/GetAllLK_LanguageForm",
    method: "get",
  },
  postHomeSetting: { url: "v1/UserProfile/PostHomeSetting", method: "post" },
  putLanguageForm: { url: "v1/UserProfile/PutLanguageForm", method: "put" },
  putQuickAccess: { url: "v1/QuickAccess", method: "putById" },
  patchLanguageForm: {
    url: "v1/UserProfile/PatchLanguageForm",
    method: "patch",
  },
  getUserLoggin: { url: "v1/User/GetLoggedInUser", method: "get" },
  getBasicInfo: { url: "v1/UserProfile/GetBasicInformation", method: "get" },
  getUserExperiencebyId: {
    url: "v1/UserProfile/GetUserExperienceById",
    method: "getById",
  },
  PostUserExperience: {
    url: "v1/UserProfile/PostUserExperience",
    method: "post",
  },
  PutUserExperience: {
    url: "v1/UserProfile/PutUserExperience",
    method: "putById",
  },
  DeleteUserExperience: {
    url: "v1/UserProfile/DeleteUserExperience",
    method: "delete",
  },
  PutUserBasicInfo: {
    url: "v1/UserProfile/PutUserBasicInformation",
    method: "put",
  },
  getUserRequestsDelegation: {
    url: "v1/UserDelegation/GetAllDelegationRequests",
    method: "get",
  },
  getAllDelegationByUserId: {
    url: "v1/UserDelegation/GetAllDelegationsByUserIdWithPagination",
    method: "get",
  },
  postUserDelegation: { url: "v1/UserDelegation", method: "post" },
  postUserDelegationFromAdmin: {
    url: "v1/UserDelegation/PostUserDelegationFromAdmin",
    method: "post",
  },
  updateUserDelegationFromAdmin: {
    url: "v1/UserDelegation/UpdateUserDelegationFromAdmin",
    method: "post",
  },
  getAllDelegationFromUserByUserId: {
    url: "v1/UserDelegation/GetAllDelegationFromUserByUserId",
    method: "getByIdParams",
  },
  getAllDelegationToUserByUserId: {
    url: "v1/UserDelegation/GetAllDelegationToUserByUserId",
    method: "getByIdParams",
  },
  addUserDelegation: {
    url: "v1/UserDelegation/PostUserAlternativeByVerb",
    method: "post",
  },
  approveRejectDelegation: {
    url: "v1/UserDelegation/ApprovedAndRejectDelegation",
    method: "put",
  },
  activateDeactivateDelegation: { url: "v1/UserDelegation", method: "put" },
  getAllUsers: { url: "v1/User/", method: "get" },
  getAllUserDelegationRoles: {
    url: "v1/UserDelegation/GetRolePermissionForUserDelegation",
    method: "get",
  },
  getDelegationDetails: {
    url: "v1/UserDelegation/GetDelegationUserById",
    method: "get",
  },
  getDelegationDetailsById: {
    url: "v1/UserDelegation/GetDelegationById",
    method: "getById",
  },
  getAllRoles: { url: "v1/Role/GetAllPaginationRoles", method: "get" },
  getRols: { url: "v1/Role", method: "get" },
  getDetailsRoleById: { url: "v1/Role", method: "getById" },
  create: { url: "v1/Role", method: "post" },
  editRole: { url: "v1/Role", method: "putById" },
  getAllRolesCategory: { url: "Lookup/GetAllRoleCategory", method: "get" },
  GetUserByRoleId: { url: "v1/Role/GetUserByRoleId", method: "getByIdParams" },
  DeleteUserRole: { url: "v1/Role/DeleteUserRole", method: "deleteByBody" },
  GetUsersNoInRole: {
    url: "v1/Role/GetUsersWithNoRoleId",
    method: "getByIdParams",
  },
  AddUsersToRole: { url: "v1/Role/PostUserRole", method: "post" },
  GetGroupByRoleId: { url: "v1/Role/GetGroupByRoleId", method: "getById" },
  GetGroupsNoInRole: { url: "v1/Role/GetGroupWithNoRoleId", method: "getById" },
  DeleteGroupRole: { url: "/v1/Role/DeleteGruopRole", method: "deleteByBody" },
  AddGroupsToRole: { url: "/v1/Role/PostGroupToRole", method: "post" },
  editUserSummary: { url: "/v1/User/PutUserSummary", method: "putById" },
  deleteGroup: { url: "/v1/Group", method: "delete" },
  getAllGroups: { url: "/v1/Group/GetAllPaginationGroups", method: "get" },
  getAllDomains: { url: "/v1/Domain", method: "get" },
  getDomainbyId: { url: "/v1/Domain", method: "getById" },
  addDomain: { url: "/v1/Domain", method: "post" },
  editDomain: { url: "/v1/Domain", method: "putById" },
  deleteDomain: { url: "/v1/Domain/DeleteDomain", method: "putById" },
  getAllRequestsUsers: { url: "/v1/User/GetAllRequestsUsers", method: "get" },
  getRequestByUserId: { url: "/v1/User/GetRequestByUserId", method: "getById" },
  deleteUserRequest: { url: "/v1/User/DeleteUserRequest", method: "delete" },
  deleteUser: { url: "/v1/User/DeleteUser", method: "delete" },
  putUser: { url: "/v1/User/AllowExternalUserAccess", method: "put" },
  putUserPicture: { url: "/v1/User/ProfilePicture", method: "putById" },
  getAllUserRoles: { url: "/v1/User/GetRolesByUserId", method: "getById" },
  addRoleToUser: { url: "/v1/User/PostUserRole", method: "post" },
  deleteRoleFromUser: {
    url: "/v1/User/DeleteRoleFromUser",
    method: "deleteByBody",
  },
  editUserPassword: { url: "/v1/User/ChangeUserPassword", method: "putById" },
  addLoginPermission: {
    url: "/v1/User/PostUserLoginPermission",
    method: "postById",
  },
  editLoginPermission: { url: "/v1/User/PutUserPermission", method: "putById" },
  addGroup: { url: "v1/User/PostGroup", method: "post" },
  editGroup: { url: "v1/User/PutGroup", method: "putById" },
  getPermission: { url: "v1/User/GetLoginPermission", method: "getById" },
  getStatisticsCount: { url: "v1/Common/GetStatisticsCount", method: "get" },
  login: { url: "v1/Account/Login", method: "post" },
  auth: { url: "v1/Account/Auth", method: "post" },
  getBasicInformationByUserId: {
    url: "v1/User/GetBasicInformationByUserId",
    method: "getById",
  },
  getUserExperienceByUserId: {
    url: "v1/User/ GetUserExperienceByUserId",
    method: "getById",
  },
  logintoMursalat: {
    url: "v1/Integration/MursalatAuthentication",
    method: "post",
  },
  getUserBasicInformationById: {
    url: "v1/User/GetBasicInformationByUserId",
    method: "getById",
  },
  getAllDelegationToUser: {
    url: "v1/UserDelegation/GetAllDelegationToUser",
    method: "get",
  },
  getAllDelegationFromUser: {
    url: "v1/UserDelegation/GetAllDelegationFromUser",
    method: "get",
  },
  addNewUserDelegation: {
    url: "v1/UserDelegation/PostUserDelegation",
    method: "post",
  },
  updateUserDelegationToApproved: {
    url: "v1/UserDelegation/UpdateUserDelegationToApproved",
    method: "post",
  },
  updateUserDelegationFromApproved: {
    url: "v1/UserDelegation/UpdateUserDelegationFromApproved",
    method: "post",
  },
  deleteDelegation: {
    url: "v1/UserDelegation/DeleteDelegation",
    method: "delete",
  },
  logout: {
    url: "v1/Account/Logout",
    method: "post",
  },
};

export const UserManagmentRootUrl =
  (window as any)._env_?.REACT_APP_API_User_Url + "/";
export const UserManagmentBaseUrl = `${UserManagmentRootUrl}api/`;

export const UserManagmentConsume = initializeConsume(
  UserManagmentBaseUrl,
  UserManagmentEndpoints
);
