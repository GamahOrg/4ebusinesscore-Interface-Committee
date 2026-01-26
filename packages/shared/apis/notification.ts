import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const NotificationsEndpoints: { [key: string]: Endpoint } = {
  putNotificationSettingsById: {
    url: "NotificationSettings",
    method: "putById",
  },
  sendNotification: {
    url: "Notification/SendNotification",
    method: "post",
  },
  markNotificationAsRead: {
    url: "Notification/UpdateReadNotification",
    method: "put",
  },
  deleteNotification: {
    url: "Notification/DeleteReceivedNotification",
    method: "delete",
  },
  sendHayakmNotification: {
    url: "Notification/SendHayakmNotification",
    method: "post",
  },
};
const NotificationBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Notification_Url
}/api/`;

export const NotificationsConsume = initializeConsume(
  NotificationBaseUrl,
  NotificationsEndpoints
);
