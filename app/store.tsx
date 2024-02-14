//DON’T USE THIS WAY OF ACCESSING THE STORE WITH SERVER-SIDE RENDERING!
//HOWEVER, IT"S FINE FOR US.
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers/reducers";

//Create our redux store, and connect to the devtools. :)
//The key here is to export the store.
const enable = process.env.ENABLE_REDUX_DEVTOOLS;

export const redux_store = configureStore({
  devTools: enable == "true",
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This was here because we had onClick's in our objects.
      // Now we have the onClick's in our components - this warning would be valid.
      // serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof redux_store.getState>;
export type AppDispatch = typeof redux_store.dispatch;
