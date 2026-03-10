import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import { fetchUsers as fetchUsersAPI } from "./usersAPI";

interface UsersState {
  users: User[];
}

const loadUsers = (): User[] => {
  try {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch (error) {
    console.error("Error loading users from localStorage:", error);
    return [];
  }
};

const initialState: UsersState = {
  users: loadUsers(),
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    return await fetchUsersAPI();
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (state.users.length === 0) {
        state.users = action.payload;
      }
    });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
