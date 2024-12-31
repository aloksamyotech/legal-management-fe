import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  Grid,
  Stack,
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddCourt from "./AddCourt";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { urls } from "core/Constant/Urls";
import { deleteApi, getApi } from "core/APIs/ApiDocuments";
import imageSrc from "./vecteezy_law-firm-lawyer-justice-court_23477442.png";
import imageSrc1 from "./pexels-sora-shimazaki-5668473.jpg";
import DeleteConfirmationDialog from "core/deleteDialog";

const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: "2px" }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: "text.primary" }}>
    Court
  </Typography>,
];

const Court = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [courtData, setCourtData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState(null);

  const fetchCourtData = async () => {
    const response = await getApi(urls?.Court?.gettallcourt);
    const formattedData = response.data.map((court, index) => ({
      _id: court._id,
      Serial: index + 1,
      Title: court.Title,
      address: court.address,
      description: court.description,
      CreatedAt: new Date(court.CreatedAt).toLocaleDateString("en-GB"),
    }));
    setCourtData(formattedData || []);
  };

  useEffect(() => {
    fetchCourtData();
  }, []);

  const handleOpenEdit = (court) => {
    setEditData(court);
    setOpenAdd(true);
  };

  const handleOpenAdd = () => {
    setEditData(null);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(
        urls.Court.deletecourt.replace(":id", courtToDelete)
      );

      if (response.status === 200) {
        setCourtData((prevData) =>
          prevData.filter((court) => court._id !== courtToDelete)
        );
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting the court:", error);
      alert("An error occurred while deleting the court.");
    }
  };

  const openDeleteDialog = (courtId) => {
    setCourtToDelete(courtId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  return (
    <>
      <AddCourt
        open={openAdd}
        handleClose={handleCloseAdd}
        fetchCourtData={fetchCourtData}
        editData={editData}
      />
      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: "100%" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              padding={2}
            >
              <Typography variant="h4">Court</Typography>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Card>
        </Stack>

        <Box width="100%">
          <Card style={{ paddingTop: "15px" }}>
            <Stack
              sx={{ paddingRight: "1rem" }}
              direction="row"
              alignItems="center"
              justifyContent={"flex-end"}
              spacing={2}
            >
              <TextField
                variant="outlined"
                color="secondary"
                size="small"
                inputProps={{ maxLength: 30 }}
                sx={{ width: "20%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={handleOpenAdd}
                sx={{
                  marginBottom: "15px",
                  fontSize: "40px",
                  marginRight: "2rem",
                  backgroundColor: "#673ab7",
                  boxShadow: "none",
                  borderRadius: "15px",
                }}
              >
                <AddIcon color="white" fontSize="medium" />
              </Button>
            </Stack>
            <Grid container spacing={3} padding={"17px"}>
              {courtData.map((court) => (
                <Grid item xs={12} sm={6} md={4} key={court._id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: 3,
                      textAlign: "center",
                      p: 2,
                      backgroundColor: "#f5f5f5",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={imageSrc1}
                      alt={court.Title}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                      }}
                    />

                    <Avatar
                      alt={court.Title}
                      src={imageSrc}
                      sx={{
                        width: 80,
                        height: 80,
                        border: "3px solid #673ab7",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        background: "white",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    <Stack
                      direction="column"
                      alignItems="center"
                      spacing={2}
                      sx={{ pt: 30 }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {court.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center" }}
                      >
                        {court.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: court.address ? "green" : "gray" }}
                      >
                        {court.address || "No Address Provided"}
                      </Typography>
                      <Stack direction="row" spacing={2} mt={2}>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            sx={{
                              borderRadius: "50%",
                              backgroundColor: "#e8f5e9",
                              padding: "8px",
                            }}
                            onClick={() => handleOpenEdit(court)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            sx={{
                              borderRadius: "50%",
                              backgroundColor: "#ffebee",
                              padding: "8px",
                            }}
                            onClick={() => openDeleteDialog(court._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>
      </Container>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDelete}
       
      />
    </>
  );
};

export default Court;
