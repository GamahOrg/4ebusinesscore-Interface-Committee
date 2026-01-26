import { showSuccessAlert } from "./services/helper";
import FormData from "./assets/forms/FormData";
const setToken = (value: any) => {
  localStorage.setItem("token", value);
};
const getToken = () => {
  return localStorage.getItem("token");
};

const setNotification = (value: any) => {
  localStorage.setItem("notyId", value);
};
const getNotification = () => {
  return localStorage.getItem("notyId");
};

const setWorkspaceKey = (value: any) => {
  localStorage.setItem("workspaceKey", value);
};

const getWorkspaceKey = () => {
  return localStorage.getItem("workspaceKey");
};

export {
  setWorkspaceKey,
  getWorkspaceKey,
  setToken,
  getToken,
  showSuccessAlert,
  FormData,
  setNotification,
  getNotification,
};
export const MainBaseUrl = `${(window as any)._env_?.REACT_APP_API_Base_Url}`;
