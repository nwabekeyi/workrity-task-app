import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import tasksReducer, { tasksMiddleware } from "../components/Dashboard/Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import userReducer from "./User.strore"; // ✅ fix filename typo if needed

// Persist config for tasks
const tasksPersistConfig = {
  key: "tasks",
  storage,
  whitelist: ["tasks"], // specify state parts to persist
};

// Persist config for user
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

// Combine reducers
const rootReducer = combineReducers({
  tasks: persistReducer(tasksPersistConfig, tasksReducer),
  modal: modalReducer,
  menu: menuReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(tasksMiddleware),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
