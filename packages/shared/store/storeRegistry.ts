// shared/store/storeRegistry.ts
import { configureStore, Reducer } from "@reduxjs/toolkit";
import toolbarReducer from "./features/toolbarSlice";

interface StoreRegistry {
  [key: string]: Reducer;
}

class ModuleStoreRegistry {
  private reducers: StoreRegistry = {};

  registerReducer(name: string, reducer: Reducer) {
    this.reducers[name] = reducer;
  }

  getReducers() {
    return { ...this.reducers };
  }

  createStore(additionalReducers: StoreRegistry = {}) {
    const allReducers = {
      ...this.reducers,
      ...additionalReducers,
    };

    return configureStore({
      reducer: allReducers,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  }
}

// Global registry instance
export const storeRegistry = new ModuleStoreRegistry();

// Register shared reducers
storeRegistry.registerReducer("toolbar", toolbarReducer);

// Export types
export type RootState = ReturnType<
  ReturnType<typeof storeRegistry.createStore>["getState"]
>;
export type AppDispatch = ReturnType<
  typeof storeRegistry.createStore
>["dispatch"];
