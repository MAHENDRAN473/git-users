import "./App.css";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import UserList from "./components/UserList";

import { UserListContext } from "./utils/UserListContext";





function App() {
  const octokit = new Octokit({});
  let [githubUserList, setGithubUserList] = useState([]);

  useEffect(() => {
    octokit
      .request("GET /users", {
        per_page: 140,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((result) => {
        setGithubUserList(result.data);
      });
  }, []);

  return (
    <UserListContext.Provider value={{ githubUserList, setGithubUserList }}>
       {githubUserList.length && <UserList userList={githubUserList}></UserList>}
    </UserListContext.Provider>
  );
}

export default App;
