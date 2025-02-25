// userSlice.js
import { createSlice,createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        addUser: (state, action) => {
         state.push(action.payload)
        },
        // clearUser: (state) => {
        //     state.name = '';
        //     state.email = '';
        //     state.age = null;
        // },
    },
});


export const getItemsSelector = createSelector(
    (state) => state.cart,
    (state) => state
  );
  

// Export actions
export const { addUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
