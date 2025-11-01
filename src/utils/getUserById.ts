import { users } from "../data/users";
import { UserType } from "../types";

export const getUserById = (id: number): UserType | undefined => {
  return users.find((u) => u.id === id);
};
