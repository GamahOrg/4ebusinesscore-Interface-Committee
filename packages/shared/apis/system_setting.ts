import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const PlatformEndpoints: { [key: string]: Endpoint } = {
  getAllPlatform: { url: "getPlatformSettingsMainInfo", method: "get" },
  postMainSettings: { url: "PostPlatformSettings", method: "post" },
  postMainSites: { url: "PostPlatformSettingsSites", method: "post" },
  getAllSites: { url: "GetPlatformSettingsSites", method: "get" },
  postPlatformIcon: {
    url: "PostPlatformSettingsDepartmentIcons",
    method: "post",
  },
  postPlatformDepartment: {
    url: "PostPlatformSettingsDepartmentItems",
    method: "post",
  },
  getSitesDepartment: { url: "GetPlatformSettingssDepartment", method: "get" },
  putPlatformSettings: { url: "PutPlatformSettings", method: "put" },
  deleteSite: { url: "DeletePlatformSettingsSites", method: "delete" },
  editMainSettingsIsTheme: { url: "PutMainSettingsIsThem", method: "put" },
  putMainSettingHeaders: { url: "PutMainSettingHeaders", method: "put" },
  putMainSettingLogin: { url: "PutMainSettingLogin", method: "put" },
  deleteMainSettingLogin: { url: "DeleteMainSettingLogin", method: "delete" },
  deleteMainSettingHeaders: {
    url: "DeleteMainSettingHeaders",
    method: "delete",
  },
};

export const PlatformRootUrl =
  (window as any)._env_?.REACT_APP_API_PlatForm_Url + "/";
export const PlatformBaseUrl = `${PlatformRootUrl}api/platformSettings/`;

export const PlatformConsume = initializeConsume(
  PlatformBaseUrl,
  PlatformEndpoints
);
