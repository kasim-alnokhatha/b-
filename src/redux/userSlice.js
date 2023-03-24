import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name: "",
  email_verified: ""
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.email_verified = action.payload.email_verified
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.email_verified = action.payload.email_verified
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer