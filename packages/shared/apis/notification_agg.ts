import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const NotificationsEndpoints: { [key: string]: Endpoint } = {
  receivedNotifcation: {
    url: "/api/ReceivedNotifcation/GetAllReceivedNotification",
    method: "get",
  },
  sendNotification: {
    url: "/api/ReceivedNotifcation/POstNotification",
    method: "post",
  },
  getAllNotificationsSettings: {
    url: "/NotificationSettings/GetAllNotificationSettings",
    method: "get",
  },
};
const NotificationsBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Notification_Agg_Url
}`;

export const NotificationsAggConsume = initializeConsume(
  NotificationsBaseUrl,
  NotificationsEndpoints
);
