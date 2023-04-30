import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import { MovieApi } from "./services/MovieApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [MovieApi.reducerPath]: MovieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MovieApi.middleware),
});

setupListeners(store.dispatch);
