
// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    searchAddress: null,
    selectedBedsNo: null,
    activeBed: null,
    selectedPropertyType: 'Buy',
    activePropertyType: 'Buy',
}
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        searchAddress(state, action) {
            state.searchAddress = action.payload
        },
        selectBed(state, action) {
            state.selectedBedsNo = action.payload
        },
        activeBed(state, action) {
            state.activeBed = action.payload
        },
        resetBeds(state) {
            state.selectedBedsNo = null
            state.activeBed = null
        },
        selectPropertyType(state, action) {
            state.selectedPropertyType = action.payload
        },
        activePropertyType(state, action) {
            state.activePropertyType = action.payload
        },
        resetPropertyType(state) {
            state.selectedPropertyType = 'Buy'
        }

    }
})

// const reducer = (state = initialState, action) => {
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1
//         }
//     }
//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1
//         }
//     }
//     return state

// }

const store = configureStore({
    reducer: filterSlice.reducer
})
export const filterSliceActions = filterSlice.actions;
export default store;