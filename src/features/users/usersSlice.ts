import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/User";

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

const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify([...users]));
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      saveUsers(state.users);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        saveUsers(state.users);
      }
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      saveUsers(state.users);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
