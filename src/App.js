import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";

function App() {
  const octokit = new Octokit({});
  let [githubUserList, setGithubUserList] = useState([]);

  useEffect(() => {
    octokit
      .request("GET /users", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((result) => {
        setGithubUserList(result.data);
      });
  }, []);

  return <div></div>;
}

export default App;
