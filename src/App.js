import "./App.css";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import UserList from "./components/UserList";

import { UserListContext } from "./utils/UserListContext";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  if (!githubUserList.length) {
    return (
      <Box justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <UserListContext.Provider value={{ githubUserList, setGithubUserList }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </UserListContext.Provider>
  );
}

export default App;
