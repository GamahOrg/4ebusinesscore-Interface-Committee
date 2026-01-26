import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import notifiactionsSlice from "../features/notifiactionsSlice";
import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";

const store = storeRegistry.createStore({
  notifications: notifiactionsSlice,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
