
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TableStyle from '../../../ui-component/TableStyle';
import HearingData from 'views/Hearing/HearingData';
import { useNavigate } from 'react-router';
import HearingForm from './HearingForm';

// ----------------------------------------------------------------------



const AddHearing = () => {
    const navigate = useNavigate();
    const [openAdd, setOpenAdd] = useState(false);
    const handleViewClick = (row) => {
        navigate(`/dashboard/hearing/hearingview/${row.id}`, { state: row });
    };
    const columns = [
        {
            field: 'id',
            headerName: 'S.NO',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: ' name-column--cell--capitalize'
        },
        
        {
            field: 'Title',
            headerName: 'Title',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: ' name-column--cell--capitalize'
        },
        {
            field: 'Fees',
            headerName: 'Fees',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: ' name-column--cell--capitalize'
        },
        {
            field: 'Date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: 'name-column--cell--capitalize'
        },
        {
            field: 'JudgementStatus',
            headerName: 'Judgement Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: ' name-column--cell--capitalize'
        },
        {
            field: 'action',
            headerAlign: 'center',
            align: 'center',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="inherit"
                    size="small"
                    sx={{ fontSize: "40px", "&:hover": { background: "none" } }}
                    onClick={() => handleViewClick(params.row)}
                ><Link fontSize={0} color="inherit"

                >
                        <VisibilityIcon color='secondary' sx={{
                            "&:hover": {
                                color: 'green'
                            }
                        }} /></Link>
                </Button>)
        }
    ];

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    return (
        <><HearingForm open={openAdd} handleClose={handleCloseAdd} ></HearingForm>
            <Container sx={{ padding: "0%" }}>

                <TableStyle >

                    <Box mt={3}>
                        <Card style={{ height: '', paddingTop: '15px' }}>
                            <Stack
                                sx={{ paddingRight: "1rem", paddingLeft: "1rem" }}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography variant="h4">Hearings</Typography>


                                <Stack width={"100%"} direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                    <TextField
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        placeholder="Search"
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
                                        <AddIcon
                                            fontSize="medium"
                                            sx={{ color: "white" }}
                                        />
                                    </Button>
                                </Stack>
                            </Stack>

                            <DataGrid
                                rowHeight={42}
                                rows={HearingData}
                                columns={columns}
                                getRowId={(row) => row.id}
                                sx={{
                                    padding: "17px",
                                    border: "2px solid lightgray",
                                    "& .MuiDataGrid-columnHeaders": {

                                    },
                                    "& .MuiDataGrid-columnHeader": {
                                        border: "1px solid lightgray",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        border: "1px solid lightgray",

                                    },
                                }}
                            />
                        </Card>
                    </Box>
                </TableStyle>

            </Container>
        </>
    );
};

export default AddHearing;
