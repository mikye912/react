import { createSlice } from "@reduxjs/toolkit";

const initUserMenuState = new Array();
export const uMenuSlice = createSlice({
    name: 'uMenuSlice',
    initialState: initUserMenuState,
    reducers: {
        setUserMenu: (state, action) => {
            return action.payload
        }
    }
})

const initUserSearchState = new Array();
export const uSearchSlice = createSlice({
    name: 'uSearchSlice',
    initialState: initUserSearchState,
    reducers: {
        setUserSearch: (state, action) => {
            return action.payload
        }
    }
})

const initAuthStat = {};
export const uAuthSlice = createSlice({
    name: 'isAuthSlice',
    initialState: initAuthStat,
    reducers: {
        setAuthStat: (state, action) => {
            return action.payload
        },
        destroyAuth: (state) => {
            return initAuthStat
        }
    }
})

let initTabIndexState = 1;
export const contentSlice = createSlice({
    name: 'contentSlice',
    initialState: [{
        path: "sub_0000",
        name: "메인",
        index: 0
    }],
    reducers: {
        addTabs: (state, action) => {
            // state = state.push({
            //     name: action.payload.name,
            //     path: action.payload.path,
            //     index: initTabIndexState++
            // })
            return [...state, {
                name: action.payload.name,
                path: action.payload.path,
                index: initTabIndexState++
            }]
        },
        changeTabs: (state, action) => {
            return action.payload
        }
    }
});

export const selectTabSlice = createSlice({
    name: 'selectTabSlice',
    initialState: {
        selectTab: 0,
    },
    reducers: {
        addSelectTab: (state, action) => {
            state.selectTab = initTabIndexState - 1
        },
        changeSelectTab: (state, action) => {
            state.selectTab = action.payload.selectTab
        }
    }
});

export const sidebarStateSlice = createSlice({
    name: 'sidebarStateSlice',
    initialState: true,
    reducers: {
        changeSidebarState: (state, action) => {
            return action.payload;
        }
    }
});

const initDataSearchState = new Object();
export const dataSearchSlice = createSlice({
    name: 'dataSearchSlice',
    initialState: initDataSearchState,
    reducers: {
        destroySearch: () => {
            return initDataSearchState
        },
        changeInputs: (state, action) => {
            return {
                ...state, ...action.payload
            }
        }
    }
});