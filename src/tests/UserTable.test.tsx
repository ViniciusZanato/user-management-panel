import { render, screen } from "@testing-library/react";
import UserTable from "../components/UserTable";
import { Provider } from "react-redux";
import { store } from "../app/store";

test("renders user table", () => {
  render(
    <Provider store={store}>
      <UserTable />
    </Provider>,
  );

  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Email/i)).toBeInTheDocument();
});
