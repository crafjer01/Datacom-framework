import { users } from "../data/users";
import { UserType } from "../types";

export const getUserById = (id: number): UserType => {
  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new Error(`User with ID 1 not found`);
  }

  return user;
};
