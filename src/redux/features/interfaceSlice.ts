import { createSlice } from "@reduxjs/toolkit";

const interfaceSlice = createSlice({
  name: "interface",
  initialState: {
    theme: "light",
    page: 1,
    isAdminSidebarOpen: false,
    isProductListView: false,
    isProductFilterSidebarOpen: false,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    toggleProductListView: (state) => {
      state.isProductListView = !state.isProductListView;
    },
    toggleProductFilterSidebar: (state) => {
      state.isProductFilterSidebarOpen = !state.isProductFilterSidebarOpen;
    },
    toggleAdminSidebar: (state) => {
      state.isAdminSidebarOpen = !state.isAdminSidebarOpen;
    },
  },
});
export const {
  changePage,
  changeTheme,
  toggleAdminSidebar,
  toggleProductListView,
  toggleProductFilterSidebar,
} = interfaceSlice.actions;
export default interfaceSlice.reducer;
