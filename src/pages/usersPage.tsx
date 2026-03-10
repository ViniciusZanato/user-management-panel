import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

export default function UsersPage() {
  return (
    <>
      <h1 className="page-title">User Management Panel</h1>
      <UserForm />
      <UserTable />
    </>
  );
}
