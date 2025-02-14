import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import caseViewData from './caseviewData';
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
  Tooltip
} from '@mui/material';
import { styled } from '@mui/system';
import AddHearing from './CaseHearing/Index';
import AddEvidence from './CaseEvidence/Index.js';
import AddDocument from './CaseDocument/Index';
import AddInvoice from './CaseInvoice/Index';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import EditCase from './editCase';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import { enums } from 'core/Statuscode/constant';
import { useTranslation } from 'react-i18next';

const StatusButton = styled(Button)(({ theme, status }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: status === enums.Open ? '#94e396' : '#eb665c',
  color: 'white',
  fontSize: 'small',
  padding: '1px',
  '&:hover': {
    backgroundColor: status === enums.Open ? '#3ae156' : '#f25347'
  }
}));

const breadcrumbsData = [
  { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
  { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
  { label: 'Case', path: '/dashboard/cases', color: 'inherit' },
  { label: 'Case View', path: null }
];
const CaseView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [casesToDelete, setCasesToDelete] = useState(null);
  const [rowData, setrowdata] = useState({});
  const fetchCaseData = async () => {
    try {
      const response = await getApi(urls?.Case?.getcase.replace(':id', id));
      const cases = response.data;

      const formattedData = {
        _id: cases?._id,
        Title: cases?.Title,
        Matter: cases?.Matter,
        Client: cases?.Client,
        Advocate: cases?.Advocate,
        Fir: cases?.Fir,
        Judge: cases.Judge,
        Court: cases.Court,
        CaseStatus: cases.CaseStatus,
        description: cases?.description,
        internalNote: cases?.internalNote,
        PoliceStation: cases?.PoliceStation,
        Date: new Date(cases?.Date).toLocaleDateString('en-GB')
      };
      setrowdata(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.Case.deletecases.replace(':id', casesToDelete));

      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        toast.success(Messages.Case.delete_success);
        navigate(`/dashboard/cases`);
      }
    } catch (error) {
      console.error('Error deleting the cases:', error);
      toast.error(Messages.Case.delete_failed);
    }
  };

  const openDeleteDialog = (casesId) => {
    setCasesToDelete(casesId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <Container>
        <EditCase open={openAdd} handleClose={handleCloseAdd} id={id} rowData={rowData} fetchCaseData={fetchCaseData}></EditCase>
        <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
              <Typography variant="h4">{t("Case Details")}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <Box width="100%">
          <Card style={{ height: 'auto', paddingTop: '5px' }}>
            <Grid container padding={2} spacing={3}>
              <Grid item xs={12} md={3.5}>
                <Card
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ textAlign: 'left', mb: 2 }}>
                      <Typography variant="h4">{rowData?.Title}</Typography>
                      <Divider sx={{ mt: '10px', borderColor: 'grey.300' }} />
                    </Box>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Client")}:</strong> {rowData?.Client?.Name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Date")}:</strong> {rowData?.Date}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Matter")}:</strong>
                      {rowData?.Matter?.Title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Advocate")}:</strong> {rowData?.Advocate?.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Court")}:</strong> {rowData?.Court?.Title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Judge")}:</strong> {rowData?.Judge?.Title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("CaseStatus")}:</strong>
                      <StatusButton status={rowData?.CaseStatus}>{rowData?.CaseStatus}</StatusButton>
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t("Police Station")}:</strong> {rowData?.PoliceStation?.Title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8.5}>
                <Card
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h4">{t("Description")}</Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {rowData?.description}
                    </Typography>
                    <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography mt={2} variant="h4">
                        {t("Internal Note")}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {rowData?.internalNote}
                    </Typography>
                    <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography mt={2} variant="h4">
                        {t("FIR")}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {rowData?.Fir}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 4
                      }}
                    >
                      <Tooltip title="Edit">
                        <Button variant="outlined" color="secondary" onClick={handleOpenAdd}>
                          <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>{t("Edit")}</Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button variant="contained" color="error" onClick={() => openDeleteDialog(rowData._id)}>
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
      <AddHearing id={id} caseData={rowData}></AddHearing>
      <AddEvidence caseId={id} caseData={rowData}></AddEvidence>
      <AddDocument caseId={id} caseData={rowData}></AddDocument>
      <AddInvoice id={id} caseData={rowData}></AddInvoice>
    </>
  );
};

export default CaseView;
