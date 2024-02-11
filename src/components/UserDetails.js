import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Octokit } from "octokit";
import { UserListContext } from "../utils/UserListContext";
import { Box, Container, Stack } from "@mui/system";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
import { Avatar, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ContainerItem = styled(Container)(({ theme }) => ({
  marginTop: "50px",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UserDetails = () => {
  let { id } = useParams();
  const octokit = new Octokit({});
  const userListContext = useContext(UserListContext);

  let matchingUser = userListContext.githubUserList.find(
    (user) => user.id == id
  );

  const [username, setUsername] = useState(matchingUser.login);
  const [rows, setRows] = useState([]);

  function createData(metric: string, value: string) {
    return { metric, value };
  }

  useEffect(() => {
    octokit
      .request("GET /users/{username}", {
        username: username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((result) => {
        const userDetails = result.data;
        let rows = [
          createData(
            "Username",
            userDetails.login ? userDetails.login : "Not provided"
          ),
          createData(
            "Name",
            userDetails.name ? userDetails.name : "Not provided"
          ),
          createData(
            "Company",
            userDetails.company ? userDetails.company : "Not provided"
          ),
          createData(
            "Email",
            userDetails.email ? userDetails.email : "Not provided"
          ),
          createData(
            "Followers",
            userDetails.followers ? userDetails.followers : "-"
          ),
          createData(
            "Following",
            userDetails.following ? userDetails.following : "-"
          ),
          createData(
            "No.of.Public Repos",
            userDetails.public_repos ? userDetails.public_repos : "-"
          ),
        ];

        setRows([...rows]);
      });
  }, []);

  if (!rows.length) {
    return <CircularProgress />;
  }

  return (
    <ContainerItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        alt={matchingUser.login}
        key={matchingUser.id}
        src={matchingUser.avatar_url}
        sx={{ width: 100, height: 100 }}
      />
      <Box sx={{ paddingTop: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Metric</StyledTableCell>
                <StyledTableCell align="center">Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.metric}</TableCell>
                  <TableCell align="center">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ContainerItem>
  );
};

export default UserDetails;
