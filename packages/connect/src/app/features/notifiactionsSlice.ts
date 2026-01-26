import { createSlice} from "@reduxjs/toolkit";
import { NotificationsAggConsume } from "@4eplatform/shared/apis/notification_agg";
import { sliceAction } from "@4eplatform/shared/assets/slices/sliceAction";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { NotificationModel } from "../models/Notification";
import { NotificationsConsume } from "@4eplatform/shared/apis/notification";

interface NotificationsState {
  notification: NotificationModel;
  notificationCount: number;
  countNotReaded: number;
  notifications: NotificationModel[];
  notificationsInNav: NotificationModel[];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: NotificationsState = {
  status: RequestStatus.idle,
  error: "",
  notificationCount: 0,
  countNotReaded: 0,
  notification: new NotificationModel(),
  notifications: [],
  notificationsInNav: [],
  pagination: new Pagination(),
};

export const getNotifications = sliceAction(
  "notifications/getNotifications",
  async (param: any) => await NotificationsAggConsume.receivedNotifcation(param)
);
export const getNotificationsNav = sliceAction(
  "notifications/getNotificationsNav",
  async (param: any) => await NotificationsAggConsume.receivedNotifcation(param)
);
export const markNotificationAsRead = sliceAction(
  "notifications/markNotificationAsRead",
  (id: string) =>
    NotificationsConsume.markNotificationAsRead({ notificationId: id })
);
export const resetNewNotificationCount = sliceAction(
  "notifications/resetNewNotificationCount",
  () => NotificationsConsume.markNotificationAsRead({})
);
export const deleteNotification = sliceAction(
  "notifications/deleteNotification",
  (id: string) => NotificationsConsume.deleteNotification(id)
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: any) {
      state.notifications.unshift(action?.payload);
      state.notificationsInNav.unshift(action?.payload);
      state.notificationCount++;
      state.countNotReaded++;
    },
    readNotification(state, action: any) {
      const notificationId = action?.payload;
      const notificationIndex = state.notificationsInNav.findIndex(
        (notification) => notification.id === notificationId
      );
      if (notificationIndex !== -1) {
        state.notificationsInNav[notificationIndex].readed = true;
        if(state.countNotReaded>0){
          state.countNotReaded--;
        }
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, action: any) => {
        state.notifications = action.payload?.result
          ?.receivedNotifications as NotificationModel[];
        state.pagination = action.payload as ResponseModel;
      })
      .addCase(getNotificationsNav.fulfilled, (state, action: any) => {
        state.notificationsInNav = action.payload?.result
          ?.receivedNotifications as NotificationModel[];
        state.countNotReaded = action.payload?.result?.countNotReaded as number;
        state.notificationCount = action.payload?.result
          ?.notificationCount as number;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action: any) => {
        const notificationId = action.payload?.result;
        state.notifications = state.notifications.map((notification) => {
          if (notification.id === notificationId) {
            return { ...notification, readed: true };
          } else {
            return notification;
          }
        });
       
      })
      .addCase(deleteNotification.fulfilled, (state, action: any) => {
        const notificationId = action.payload?.result;
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== notificationId
        );
      }).addCase(resetNewNotificationCount.fulfilled, (state, action: any) => {
        
        state.notificationCount =0
      });
  },
});

export const {
  addNotification,
  readNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
