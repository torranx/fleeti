import { User } from "../user";
import { CommonResponse } from "./common";

export interface LoginResponse extends CommonResponse {
  user: User;
}
