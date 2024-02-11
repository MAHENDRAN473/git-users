import { createContext } from "react";

export const UserListContext = createContext({
  githubUserList: [],
  setGithubUserList: () => {},
});
