import { createSlice } from "@reduxjs/toolkit";

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
            state = state.push({
                name: action.payload.name,
                path: action.payload.path,
                index: initTabIndexState++
            })
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
            console.log(action.payload)
            return action.payload;
        }
    }
});

export const dateSearchSlice = createSlice({
    name: 'dateSearchSlice',
    initialState: {
        sdate: '',
        edate: ''
    },
    reducers: {
        changeDateInputs: (state, action) => {
        }
    }
})