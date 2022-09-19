import { configureStore } from "@reduxjs/toolkit";
import { uAuthSlice, contentSlice, selectTabSlice, sidebarStateSlice, uMenuSlice } from "./slice"

const store = configureStore({
  reducer: {
    uMenu: uMenuSlice.reducer,
    uAuth: uAuthSlice.reducer,
    content: contentSlice.reducer,
    selectTab: selectTabSlice.reducer,
    sidebarState: sidebarStateSlice.reducer,
  }
})

export default store;