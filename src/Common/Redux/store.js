import { configureStore } from "@reduxjs/toolkit";
import { uAuthSlice, contentSlice, selectTabSlice, sidebarStateSlice, dataSearchSlice, uMenuSlice, uSearchSlice, uDomainSlice } from "./slice"

const store = configureStore({
  reducer: {
    uDomain: uDomainSlice.reducer,
    uMenu: uMenuSlice.reducer,
    uSearch: uSearchSlice.reducer,
    uAuth: uAuthSlice.reducer,
    content: contentSlice.reducer,
    selectTab: selectTabSlice.reducer,
    sidebarState: sidebarStateSlice.reducer,
    dataSearch: dataSearchSlice.reducer,
  }
})

export default store;