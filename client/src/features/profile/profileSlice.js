import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";


const initialState = {
  profile: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createProfile = createAsyncThunk(
  "profile/create",
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const createdProfile =  await profileService.createprofile(profileData, token);
      return createdProfile

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk("profile/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const profile = await profileService.getprofile(token);
    return profile;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.updateprofile(id, updatedData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (!Array.isArray(state.profile)) {
          state.profile = [];
        }
        state.profile.push(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (!Array.isArray(state.profile)) {
          state.profile = [];
        }

        const updatedProfileIndex = state.profile.findIndex(
          (m) => m._id === action.payload.id
        );

        if (updatedProfileIndex !== -1) {
          const updatedProfile = {
            ...state.profile[updatedProfileIndex],
            ...action.payload.updatedData,
          };

          state.profile.splice(updatedProfileIndex, 1, updatedProfile);
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.profile = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;