import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Divider, Container, Stack, Box, Card, Typography, Tabs, Tab } from '@mui/material';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import CasesReport from './Report';
import HearingReport from './HearingReport';

const Report = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Report', path: 'null' }
  ];

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">{t('Report')}</Typography>
            <UniversalBreadcrumbs items={breadcrumbsData} />
          </Stack>
        </Card>
      </Stack>

      <Box width="100%">
        <Card style={{ height: 'auto', paddingTop: '5px' }}>
          <Box sx={{ padding: 1 }}>
            <Tabs
              variant="scrollable"
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              scrollButtons="auto"
            >
              <Tab
                value={0}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <AccountCircleIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Cases Report')}</Typography>
                  </Box>
                }
              />
              <Tab
                value={1}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <DriveFolderUploadIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Hearings Report')}</Typography>
                  </Box>
                }
              />
            </Tabs>

            <Divider sx={{ borderColor: 'grey.300' }} />

            {/* Improved rendering */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
              {tabValue === 0 && (
                <Box width="100%">
                  <CasesReport />
                </Box>
              )}
              {tabValue === 1 && (
                <Box width="100%">
                  <HearingReport />
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Report;
