import { render, screen, fireEvent } from "@testing-library/react";
import UserForm from "../components/UserForm";
import { Provider } from "react-redux";
import { store } from "../app/store";

test("creates a new user", () => {
  render(
    <Provider store={store}>
      <UserForm />
    </Provider>,
  );

  fireEvent.click(screen.getByText(/Add User/i));

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "john@test.com" },
  });

  fireEvent.click(screen.getByText(/Save/i));

  expect(store.getState().users.users.length).toBeGreaterThan(0);
});

test("save button works", () => {
  render(
    <Provider store={store}>
      <UserForm />
    </Provider>,
  );

  fireEvent.click(screen.getByText(/Add User/i));

  const saveButton = screen.getByText(/Save/i);

  expect(saveButton).toBeInTheDocument();
});
