import { createSlice } from "@reduxjs/toolkit";

export default {
    uAuthSlice : createSlice({
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
    }),
    contentSlice : createSlice({
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
    }),
    selectTabSlice : createSlice({
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
    }),
    sidebarStateSlice : createSlice({
        name: 'sidebarStateSlice',
        initialState: true,
        reducers: {
            changeSidebarState: (state, action) => {
                return action.payload;
            }
        }
    }),
    dataSearchSlice : createSlice({
        name: 'dataSearchSlice',
        initialState: initSearchState,
        reducers: {
            destroySearch: () => {
                return initSearchState
            },
            changeInputs: (state, action) => {
                return {
                    ...state, ...action.payload
                }
            }
        }
    })
}
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

const initSearchState = new Object();
export const dataSearchSlice = createSlice({
    name: 'dataSearchSlice',
    initialState: initSearchState,
    reducers: {
        destroySearch: () => {
            return initSearchState
        },
        changeInputs: (state, action) => {
            return {
                ...state, ...action.payload
            }
        }
    }
});