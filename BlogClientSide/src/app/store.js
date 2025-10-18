import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "../features/auth/authSlicer";

  const store = configureStore({
    reducer:{
      auth : authSlice,
      // can add more slices, if we need that slice data in multiple pages like auth
    }
});

export default store;
 