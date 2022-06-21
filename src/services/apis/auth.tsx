import { doFetch } from "../fetcher";

// request types
declare type LoginRequest = {
  email: string;
  password: string;
}

// response types

export declare type LoginResponse = {
  token?: string
  error?: string
}

export default {
  loginUser: (data: LoginRequest) => doFetch('https://reqres.in/api/login', "POST", data)
}