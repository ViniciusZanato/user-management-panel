import usersReducer, { addUser } from "../features/users/usersSlice";

test("should add a user to state", () => {
  const initialState = { users: [] };

  const newUser = {
    id: 1,
    name: "Test",
    email: "test@test.com",
    status: "active",
  };

  const state = usersReducer(initialState, addUser(newUser));

  expect(state.users.length).toBe(1);
});
