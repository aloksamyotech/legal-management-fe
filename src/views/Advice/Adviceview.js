import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoopIcon from '@mui/icons-material/Loop';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    Divider,
    Breadcrumbs,
    Container,
    Stack,
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Tab,
    Tabs,
    Typography,
    Button,
    Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteApi, getApi } from "core/APIs/ApiDocuments";
import { urls } from "core/Constant/Urls";
import UpdateAdvicedata from "./updateadvice";
import { useState } from "react";
import { useEffect } from "react";
import Advocate from "views/Advocate";
import { Messages } from "core/comman/comman";

const AdviceView = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const { id } = useParams();
   const navigate = useNavigate();
    const [rowData, setrowdata] = useState({});
    const fetchAdviceData = async () => {
        
          const response = await getApi(urls?.Advice?.getaadvice.replace(':id',id));
          const advice = response.data;
    const formattedData = {
      _id: advice._id,
      ClientId:advice.Client._id,
       Client: advice.Client?.Name || 'N/A',
       AdvocateId:advice.Advocate._id,
      Advocate: advice.Advocate?.name || 'N/A',
      Date: new Date(advice.Date).toLocaleDateString(),
      MatterId: advice.Matter._id,
      Matter: advice.Matter?.Title,
      Fee: advice.Fee,
      Status: advice.Status,
      Payment: advice.Payment,
      internalNote: advice.internalNote,
      description: advice.description,
    };

    setrowdata(formattedData);
      };
    
      useEffect(() => {
        fetchAdviceData();
      }, []);
    
    const handleDelete = async () => {
        try {
          const response = await deleteApi(urls?.Advice.deleteadvice.replace(':id',id));
          if (response.status === 200) {
            toast.success(Messages.Advice.delete_success);
            navigate(`/dashboard/advice`);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || Messages.Advice.delete_failed);
        }
      };
    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const clientInvoices = [
        {
            id: "01",
            InvoiceId: "TI01338",
            Date: "20/10/2024",
            Amount: "499",
            Status: "paid"
        },
    ]

    const column = [
        {
            field: 'InvoiceId',
            headerName: '#',
            flex: 1,
            cellClassName: 'name-column--cell--capitalize'
        },
        {
            field: 'Amount',
            headerName: 'Amount',
            flex: 1,
            cellClassName: 'name-column--cell--capitalize'
        },
        {
            field: 'Date',
            headerName: 'Date',
            flex: 1,
            cellClassName: 'name-column--cell--capitalize'
        },
        {
            field: 'Date',
            headerName: 'Date',
            flex: 1,
            cellClassName: 'name-column--cell--capitalize'
        },
        {
            field: 'Status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: 'name-column--cell--capitalize',
            renderCell: (params) => {
                if (params.value === "paid") {
                    return <Button variant="contained"
                        sx={{
                            backgroundColor: "#89eb8c33",
                            color: "green",
                            boxShadow: "none",
                            padding: "3px 3px",
                            fontSize: ".7rem",
                            "&:hover": {
                                color: "white",
                                backgroundColor: "#00e676"
                            }
                        }}
                    >{params.value}</Button>;
                } else {
                    return <Button variant="contained"
                        sx={{
                            backgroundColor: "#ef978e4d",
                            color: "#f02410",
                            boxShadow: "none",
                            padding: "3px 3px",
                            fontSize: ".7rem",
                            "&:hover": {
                                color: "white",
                                backgroundColor: "#f02410"
                            }
                        }}>{params.value}</Button>;
                }

            }
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="inherit"
                    size="small"
                    sx={{ fontSize: "40px", marginLeft: "-10px", "&:hover": { background: "none" } }}

                ><Link fontSize={0} color="inherit"
                    href="/dashboard/client/view">
                        <VisibilityIcon color='secondary' sx={{
                            "&:hover": {
                                color: 'green'
                            }
                        }} /></Link>
                </Button>)
        }
    ]

    const breadcrumbs = [
        <Link underline="hover" key="1" color="secondary" href="/">
            <HomeIcon sx={{ marginTop: "2px" }} fontSize="small" />
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
            Dashboard
        </Link>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            Advice
        </Typography>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            Advice View
        </Typography>,
    ];
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    return (
        <>
    <UpdateAdvicedata open={openAdd} handleClose={handleCloseAdd} id={id} rowData={rowData} fetchAdviceData={fetchAdviceData}></UpdateAdvicedata>
        <Container>

            <Stack direction="column" alignItems="center" mb={3}>
                <Card style={{ width: "100%" }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        padding={3}
                    >
                        <Typography variant="h4">Advice</Typography>
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
                <Card style={{ height: "auto", paddingTop: "5px" }}>
                    <Box sx={{ padding: 1 }}>

                        <Tabs
                            variant="scrollable"
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab value={0} label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography mr={1} fontSize="1.5rem"                             >
                                        <AccountCircleIcon ></AccountCircleIcon>
                                    </Typography>
                                    <Typography mb={.7}>Advice Details</Typography>
                                </Box>} />

                            <Tab value={1} label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography mr={1} fontSize="1.5rem"                       >
                                        <ArticleIcon></ArticleIcon>
                                    </Typography>
                                    <Typography mb={.7}>Invoice</Typography>
                                </Box>} />

                        </Tabs>
                        <Divider sx={{ borderColor: "grey.300" }} />

                        {tabValue === 0 && (
                            <Grid container padding={2} spacing={3}>
                                <Grid item xs={12} md={3.5}>
                                    <Card
                                        sx={{
                                            border: "1px solid",
                                            borderColor: "divider",
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ textAlign: "left", mb: 2 }}>
                                                <Typography variant="h4" sx={{ mt: 2 }}>
                                                    {rowData.Client}
                                                </Typography>
                                                <Divider
                                                    sx={{ mt: "10px", borderColor: "grey.300" }}
                                                />
                                            </Box>
                                            <Typography variant="body1">
                                                <strong>Date:</strong> {rowData.Date}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Matter:</strong> {rowData.Matter}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Fee:</strong> ${rowData.Fee}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Status:</strong> {rowData.Status}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Payment:</strong> {rowData.Payment}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={8.5}>

                                    <Card sx={{
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="h4">Description</Typography>
                                            </Box>
                                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                                {rowData.description}
                                            </Typography>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography mt={2} variant="h4">Internal Note</Typography>
                                            </Box>
                                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                                {rowData.internalNote}
                                            </Typography>

                                            <Typography variant="h4" sx={{ mt: 3 }}>
                                                Adviser/Advocate:
                                            </Typography>
                                            <Typography sx={{ mt: 1 }}>
                                                <strong>{rowData.Advocate}
                                                </strong>
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    gap: 2, 
                                                    mt: 4,
                                                }}
                                            >  <Tooltip title="Convert To Case">
                                                <Button variant="contained" color="primary">
                                                    <LoopIcon color="black"></LoopIcon>
                                                </Button>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                <Button variant="outlined" color="secondary" onClick={handleOpenAdd}>
                                                <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>Edit</Typography> 
                                                </Button>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                <Button variant="contained" color="error"  onClick={handleDelete}>
                                                   <DeleteOutlineIcon></DeleteOutlineIcon>
                                                </Button>
                                                    </Tooltip> 
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}


                        {tabValue === 1 && (
                            <Box padding={2} border={"none"}>
                                <Typography variant="h5">Invoice</Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <DataGrid

                                        rowHeight={40}
                                        checkboxSelection
                                        rows={clientInvoices}
                                        columns={column}
                                        getRowId={(row) => row.id}
                                        columnHeaderHeight={45}
                                        
                                        sx={{
                                            overflow: "auto",
                                            border: "none"
                                        }}
                                        />
                                </Typography>
                            </Box>
                        )}

                    </Box>
                </Card>
            </Box>
        </Container>
                        </>
    );
};

export default AdviceView;
