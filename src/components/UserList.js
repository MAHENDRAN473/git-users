import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Pagination } from "@mui/material";
import { UserListContext } from "../utils/UserListContext";
import { useNavigate } from "react-router";

const UserList = (props) => {
  let startIndex = 0;
  let limitPerPage = 28;
  let endIndex = limitPerPage;

  const navigate = useNavigate();

  const userListContext = useContext(UserListContext);
  let userList = userListContext.githubUserList;

  const [displayList, setDisplayList] = useState(
    userList.slice(startIndex, limitPerPage)
  );

  const [currentPage, setCurrentPage] = useState(1);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.black,
  }));

  const ContainerItem = styled(Container)(({ theme }) => ({
    marginTop: "50px",
  }));

  function handlePageChange(event, value) {
    startIndex = (value - 1) * limitPerPage;
    endIndex = startIndex + limitPerPage;
    setDisplayList(userList.slice(startIndex, endIndex));
    setCurrentPage(value);
  }

  function onUserClick(userDetails) {
    navigate("/user-details/" + userDetails.id);
  }

  return (
    <ContainerItem fixed>
      <Stack justifyContent="center" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {displayList.map((userDetails) => (
              <Grid item xs={3}>
                <Item
                  onClick={() => {
                    onUserClick(userDetails);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Stack
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      alt={userDetails.login}
                      key={userDetails.id}
                      src={userDetails.avatar_url}
                    />

                    <div style={{ color: "white", marginTop: "5px" }}>
                      Username:
                      <span style={{ paddingLeft: "10px" }}>
                        {userDetails.login}
                      </span>
                    </div>
                  </Stack>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginTop: "40px" }}>
          <Pagination
            count={3}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </ContainerItem>
  );
};

export default UserList;
