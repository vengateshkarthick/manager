import { configureStore } from "@reduxjs/toolkit";
import { empStore } from "./store.ts";

export default configureStore({
    reducer: {
      employee: empStore.reducer,
    },
  });
  