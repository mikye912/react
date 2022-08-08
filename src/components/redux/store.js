import { configureStore } from "@reduxjs/toolkit";
import { contentSlice, selectTabSlice, sidebarStateSlice, dateSearchSlice } from "./slice"

const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    selectTab: selectTabSlice.reducer,
    sidebarState: sidebarStateSlice.reducer,
    dateSearch: dateSearchSlice.reducer,
  }
})

export default store;