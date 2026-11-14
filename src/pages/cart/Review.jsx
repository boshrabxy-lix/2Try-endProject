import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useTranslation } from 'react-i18next';

export default function Review() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { state } = useLocation();
  if (!state?.form) return <Navigate to="../checkout" replace />;
  const DELIVERY = 'Premium Express (2-3 Days)';
  const { form } = state;
  
  const rows = [
    { label: 'Shipping to:', value: `${form.fullName}, ${form.city}` },
    { label: 'Delivery:', value: DELIVERY },
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: 24, fontWeight: 500, color: 'text.primary', mb: 4 }}> {t('Final Review')} </Typography>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 6, p: { xs: 3, md: 5 }, textAlign: 'center' }}>
        <Box sx={{ width: 72, height: 72, mx: 'auto', mb: 3, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'primary.light', color: 'primary.dark', }} >
          <VerifiedOutlinedIcon sx={{ fontSize: 34 }} />
        </Box>
        <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary', mb: 1.5 }}> {t('Everything looks perfect.')} </Typography>

        <Typography sx={{ fontSize: 12, color: 'text.secondary', maxWidth: 260, mx: 'auto', mb: 3, lineHeight: 1.7 }}>
          {t('Please review your items and shipping information before finalizing your bespoke order.')}
        </Typography>

      <Box sx={{ maxWidth: 340, mx: 'auto', p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: `${theme.palette.info.main}33`, }} >
          {rows.map((row) => (
            <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{t(row.label)}</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.primary', textAlign: 'end' }}>
                {row.label === 'Delivery:' ? t(row.value) : row.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}