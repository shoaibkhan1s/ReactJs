import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit se createSlice function import kiya

// Initial state define kiya jo auth state ke liye use hoga
const initialState = {
  status: false, // Authentication status initially false
  userData: null, // User data initially null
};

// createSlice function se ek slice banaya jo authentication se related state aur actions handle karega
const authSlice = createSlice({
  name: "auth", // Slice ka naam 'auth'
  initialState, // Initial state jo upar define kiya
  reducers: {
    // Login action define kiya
    login(state, action) {
      state.status = true; // Status ko true set kiya
      state.userData = action.payload.userData; // User data ko action ke payload se set kiya
    },

    // LogOut action define kiya
    logout(state) {
      state.status = false; // Status ko false set kiya
      state.userData = null; // User data ko null set kiya
    },
  },
});

// Action creators export kiye jate hain jo components me use honge
export const { login, logout } = authSlice.actions;
// Reducer export kiya jata hai jo store me add kiya jayega
export default authSlice.reducer;
