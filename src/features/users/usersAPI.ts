import { api } from "../../services/api";
import type { User } from "../../types/User";

interface APIUser {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<APIUser[]>("/users");

  return response.data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    status: "active",
  }));
};
