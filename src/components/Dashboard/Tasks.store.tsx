// src/components/Dashboard/Tasks.store.ts
import {
  Action,
  createSlice,
  Dispatch,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Task } from "../../interfaces";

const initialState: {
  tasks: Task[];
  loading: boolean;
  error: string | null;
} = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNewTask(state, action: PayloadAction<Task>) {
      state.tasks = [action.payload, ...state.tasks];
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    markAsImportant(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.importance = !task.importance;
      }
    },
    editTask(state, action: PayloadAction<Task>) {
      const taskId = action.payload.id;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    },
    toggleTaskCompleted(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteAllData(state) {
      state.tasks = [];
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const nextAction = next(action);

    if (action.type.startsWith("tasks/")) {
      const tasksList = store.getState().tasks.tasks;
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    }

    if (tasksActions.deleteAllData.match(action)) {
      localStorage.removeItem("tasks");
      localStorage.removeItem("darkmode");
    }

    if (tasksActions.removeTask.match(action)) {
      const tasksList = store.getState().tasks.tasks;
      if (tasksList.length === 0) {
        localStorage.removeItem("tasks");
      } else {
        localStorage.setItem("tasks", JSON.stringify(tasksList));
      }
    }

    return nextAction;
  };