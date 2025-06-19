import { User } from "../../types/User";

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
  }
  