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
import { useTranslation } from 'react-i18next';
import rowData from "./DocumentViewData";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation, useParams } from 'react-router';
import {
    Divider,
    Breadcrumbs,
    Container,
    Stack,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Card,
    CardContent,
    Grid,
    Tab,
    Tabs,
    Typography,
    Button,
    Tooltip,
    CardMedia,
} from "@mui/material";
import { useState } from "react";
import DocumentEdit from "./DocumentEdit";

const DocumentView= () => {
    const { id } = useParams();
    const location = useLocation();
    const rowData = location.state;
 console.log(rowData);
    const { t } = useTranslation();
    const [tabValue, setTabValue] = React.useState(0);
    const [openAdd, setOpenAdd] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const breadcrumbs = [
        <Link underline="hover" key="1" color="secondary" href="/">
            <HomeIcon sx={{ marginTop: "2px" }} fontSize="small" />
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
            Dashboard
        </Link>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            Document
        </Typography>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            Document View
        </Typography>,
    ];

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    return (
        <Container>
            <DocumentEdit  open={openAdd} handleClose={handleCloseAdd} id={id}/>

            <Stack direction="column" alignItems="center" mb={3}>
                <Card style={{ width: "100%" }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        padding={3}
                    >
                        <Typography variant="h4">Document</Typography>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </Card>
            </Stack>


            <Box width="100%" >
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
                                    <Typography mb={.7}>Document Details</Typography>
                                </Box>} />

                            <Tab value={1} label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography mr={1} fontSize="1.5rem"                       >
                                        <ArticleIcon></ArticleIcon>
                                    </Typography>
                                    <Typography mb={.7}>Documents</Typography>
                                </Box>} />

                        </Tabs>
                        <Divider sx={{ borderColor: "grey.300" }} />

                        {tabValue === 0 && (

                            <Grid item xs={12} md={12}>

                                <Card sx={{
                                    margin: "15px",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}>
                                    <CardContent>
                                        <Box sx={{ textAlign: "left", mb: 2 }}>                  
                                            <Typography variant="h4" sx={{ mt: 2 }}>
                                            {rowData
                                                ?.Title}
                                        </Typography>
                                            <Divider
                                                sx={{ mt: "10px", borderColor: "grey.300" }}
                                            />
                                        </Box>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            <strong>{t("Case")}:</strong> {rowData?.Case}
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            <strong>{t("CreatedAt")}:</strong> {rowData
                                              ?.CreatedAt}
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            <strong>{t("Description")}:</strong> {rowData
                                              ?.Note}
                                        </Typography>
                                      <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                gap: 2,
                                                mt: 4,
                                            }}
                                        >
                                            <Tooltip title="Edit">
                                                <Button onClick={handleOpenAdd} variant="outlined" color="secondary" >
                                                    <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>Edit</Typography>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button variant="contained" color="error">
                                                    <DeleteOutlineIcon></DeleteOutlineIcon>
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>

                            </Grid>
                        )}


                        {tabValue === 1 && (
                            <Box padding={2} border={"none"}>
                                <Grid item xs={12} md={8.5}>
                                    <Card
                                        sx={{
                                            border: "1px solid",
                                            borderColor: "divider",
                                        }}
                                    >
                                        <CardContent>
                                            <List>
                                                {rowData
                                                    ?.Attachment?.map((item, index) => (<>
                                                        <ListItem
                                                            key={index}
                                                            button
                                                            onClick={() => window.open(`http://localhost:7200${item.url}`,"_blank")}
                                                            sx={{
                                                                borderBottom: "1px solid",
                                                                borderColor: "divider",
                                                            }}
                                                        ><Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                                            <Grid display={'flex'} item xs={12} sm={8} md={8}>
                                                            <ListItemIcon>
                                                                <DescriptionIcon color="primary" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.name} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4} md={4}>
                                                            <ListItemText secondary={item.type} />
                                                            </Grid>
                                                        </Grid>
                                                        </ListItem>

                                                    </>)
                                                    )}
                                            </List>


                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Box>
                        )}

                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default DocumentView;



