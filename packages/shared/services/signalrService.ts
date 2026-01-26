import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { getToken } from "@4eplatform/shared/index";

const hubUrl =
  (window as any)._env_?.REACT_APP_API_Notification_Url + "/notification-hub";

let connection: HubConnection | null = null;

export const startSignalRConnection = (): HubConnection => {
  connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => getToken() || "",
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.None)
    .build();

  connection
    .start()
    .catch((err: any) => console.error("SignalR connection error: ", err));

  if (!connection) {
    throw new Error("SignalR connection not initialized");
  }

  return connection;
};

export const getConnection = (): HubConnection => {
  if (!connection) {
    throw new Error("SignalR connection not initialized");
  }

  return connection;
};
