import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UniversalBreadcrumbs = ({ items }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography key={index} sx={{ color: 'text.primary' }}>
              {t(item.label)}
            </Typography>
          );
        }

        return (
          <Link
            key={index}
            underline="hover"
            color={item.color || 'inherit'}
            onClick={() => navigate(item.path)}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {item.icon && <item.icon sx={{ marginRight: '4px' }} fontSize="small" />}
            {t(item.label)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default UniversalBreadcrumbs;
