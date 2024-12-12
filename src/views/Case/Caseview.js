import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import caseViewData from "./caseviewData";
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

import AddHearing from "./CaseHearing/Index";
import AddEvidence from "./CaseEvidence/Index.js";
import AddDocument from "./CaseDocument/Index";
import AddInvoice from "./CaseInvoice/Index";


const CaseView = () => {
   
    const breadcrumbs = [
        <Link underline="hover" key="1" color="secondary" href="/">
            <HomeIcon sx={{ marginTop: "2px" }} fontSize="small" />
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
            Dashboard
        </Link>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            Case
        </Typography>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            Case View
        </Typography>,
    ];

    return (<>
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
                        <Typography variant="h4">Case Details</Typography>
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
                                                {caseViewData?.Title}
                                                </Typography>
                                                <Divider
                                                    sx={{ mt: "10px", borderColor: "grey.300" }}
                                                />
                                            </Box>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Client:</strong> {caseViewData?.Client}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Date:</strong> {caseViewData?.Date}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Matter:</strong>{caseViewData?.Matter}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Advocate:</strong> {caseViewData?.Advocate}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Court:</strong> {caseViewData?.Court}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Judge:</strong>  {caseViewData?.Judge}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                <strong>Police Station:</strong>  {caseViewData?.PoliceStation}
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
                                            {caseViewData?.Description}
                                            </Typography>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography mt={2} variant="h4">Internal Note</Typography>
                                            </Box>
                                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                            {caseViewData?.internalNote}
                                                
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
                                                <Button variant="outlined" color="secondary">
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
                            </Grid>

                
                </Card>
            </Box>
        </Container>
           <AddHearing></AddHearing>
           <AddEvidence></AddEvidence>
           <AddDocument></AddDocument>
           <AddInvoice></AddInvoice>
           </>
    );
};

export default CaseView;
