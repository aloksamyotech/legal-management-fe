import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
} from "@mui/material";
import AddClient from "./AddClient";
import { DataGrid } from "@mui/x-data-grid";
import UpdateClient from "./updateClient";


const Profile = () => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const clientCases = [
        {
            id: "01",
            case: "Court Case",
            Date: "20/10/2024"
        },
        {
            id: "02",
            case: "Crimnal offense",
            Date: "20/10/2024"
        },
        {
            id: "03",
            case: "Robery",
            Date: "20/10/2024"
        }
    ];

    const column = [
        {
            field: 'id',
            headerName: '#',
            flex: 0.5,
            cellClassName: 'name-column--cell--capitalize'
        },
        {
            field: 'case',
            headerName: 'Case',
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
            Client
        </Typography>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            View
        </Typography>,
    ];

    return (
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
                        <Typography variant="h4">Profile</Typography>
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
                                    <Typography mb={.7}>Profile</Typography>
                                </Box>} />

                            <Tab value={1} label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography mr={1} fontSize="1.5rem"                       >
                                        <ArticleIcon></ArticleIcon>
                                    </Typography>
                                    <Typography mb={.7}>Cases</Typography>
                                </Box>} />
                            <Tab value={2} label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography mr={1} fontSize="1.5rem"                      >
                                        <SettingsIcon />
                                    </Typography>
                                    <Typography mb={.7}>Setting</Typography>
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
                                            <Box sx={{ textAlign: "center", mb: 2 }}>
                                                <Avatar
                                                    src="https://randomuser.me/api/portraits/men/1.jpg"
                                                    alt="Profile Picture"
                                                    sx={{ width: 80, height: 80, margin: "0 auto" }}
                                                />
                                                <Typography variant="h4" sx={{ mt: 2 }}>
                                                    John Doe
                                                </Typography>
                                                <Divider
                                                    sx={{ mt: "10px", borderColor: "grey.300" }}
                                                />
                                            </Box>
                                            <Typography variant="body1">
                                                <strong>Email:</strong> John@gmail.com
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Phone:</strong> 12345679976
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Location:</strong> Melbourne
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
                                                <Typography variant="h4">About Me</Typography>

                                            </Box>
                                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                                Hello, I am Deependra Creative Graphic Designer & User
                                                Experience Designer based in Website, I create digital products
                                                a more beautiful and usable place.
                                            </Typography>

                                            <Typography variant="h4" sx={{ mt: 3 }}>
                                                Personal Details
                                            </Typography>
                                            <Typography sx={{ mt: 1 }}>
                                                <strong>Full Name:</strong> Sandeep
                                            </Typography>
                                            <Typography sx={{ mt: 1 }}>
                                                <strong>Fathers Name:</strong> Mr. Deependra Raj
                                            </Typography>
                                            <Typography sx={{ mt: 1 }}>
                                                <strong>Address:</strong> Street 110-, Kalians Bag, Dewan, M.P, INDIA
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}


                        {tabValue === 1 && (
                            <Box padding={2} border={"none"}>
                                <Typography variant="h5">Cases</Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <DataGrid

                                        rowHeight={40}
                                        checkboxSelection
                                        rows={clientCases}
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

                        {tabValue === 2 && (
                            <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} padding={2}>
                                <Box width="80%" mt={4}>

                                <UpdateClient></UpdateClient>
                                </Box>


                            </Stack>
                        )}
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default Profile;
