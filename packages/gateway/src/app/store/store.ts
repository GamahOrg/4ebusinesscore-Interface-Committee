import { configureStore } from "@reduxjs/toolkit";
import PlatformSlice from "../features/platform-settings/platformSettings";
import authSlice from "../features/user/auth";
import { useDispatch } from "react-redux";
import userLoginSlice from "../features/user/user-login-slice";
import SubsystemSettingsClassification from "../features/header/subsytemSettingsMainClassification";
import subsytemSettingsMainClassificationAggSlice from "../features/header/subsytemSettingsMainClassificationSlice";
import notifiactionsSlice from "@4eplatform/connect/src/app/features/notifiactionsSlice";
import requestsSlice from "@4eplatform/connect/src/app/features/requests-slice";
import userViewSlice from "../features/user-profile/user-view-slice";
const store = configureStore({
  reducer: {
    login: authSlice,
    Platform: PlatformSlice,
    userLogin: userLoginSlice,
    SubSystemClassificationByRowCount: SubsystemSettingsClassification,
    subsytemSettingsMainClassificationAggSlice:
      subsytemSettingsMainClassificationAggSlice,
    notifications: notifiactionsSlice,
    requests: requestsSlice,
    userView: userViewSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
