import React, { useState } from 'react';
import { Box, TextField, Typography, Divider, Radio, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { useTranslation } from 'react-i18next';
import useCheckout from '../../hooks/useCheckOut';

export default function Checkout() {
  const { t } = useTranslation();
  const theme = useTheme();
    const { mutate: checkout, isPending: checkoutPending } = useCheckout();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState(state?.form ?? { fullName: '', street: '', city: '', postal: '' });
  const [paymentMethod, setPaymentMethod] = useState(state?.paymentMethod ?? 'Cash');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('../review', { state: { form, paymentMethod } });
    checkout({ paymentMethod });
  };

  return (
    <Box component="form" id="checkout-form" onSubmit={handleSubmit}>
      <Typography sx={{ fontSize: 24, fontWeight: 500, color: 'text.primary', mb: 4 }}>
        {t('Delivery & Payment Details')}
      </Typography>

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 6, p: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'primary.main', mb: 2.5 }}>{t('Shipping Address')}</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          <Box sx={{ gridColumn: 'span 2' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.primary', mb: 0.75 }}>{t('Full Name')}</Typography>
            <TextField
              required fullWidth value={form.fullName} placeholder={t('Enter your full name')}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3, fontSize: 12, bgcolor: 'background.paper', '& input': { py: 1.4 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                },
              }}
            />
          </Box>

          <Box sx={{ gridColumn: 'span 2' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.primary', mb: 0.75 }}>{t('Street Address')}</Typography>
            <TextField
              required fullWidth value={form.street} placeholder={t('Apt, Suite, Building...')}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3, fontSize: 12, bgcolor: 'background.paper', '& input': { py: 1.4 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                },
              }}
            />
          </Box>

          <Box sx={{ gridColumn: 'span 1' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.primary', mb: 0.75 }}>{t('City')}</Typography>
            <TextField
              required fullWidth value={form.city} placeholder={t('City')}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3, fontSize: 12, bgcolor: 'background.paper', '& input': { py: 1.4 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                },
              }}
            />
          </Box>

          <Box sx={{ gridColumn: 'span 1' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.primary', mb: 0.75 }}>{t('Postal Code')}</Typography>
            <TextField
              required fullWidth value={form.postal} placeholder={t('Zip/Postal')}
              onChange={(e) => setForm({ ...form, postal: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3, fontSize: 12, bgcolor: 'background.paper', '& input': { py: 1.4 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                },
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'primary.main', mb: 2.5 }}>{t('Payment Method')}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box
            component="label" onClick={() => setPaymentMethod('cash')}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, borderRadius: 3, cursor: 'pointer',
              border: `1px solid ${paymentMethod === 'cash' ? `${theme.palette.primary.main}99` : `${theme.palette.text.secondary}40`}`,
              bgcolor: paymentMethod === 'cash' ? `${theme.palette.primary.main}1A` : 'background.paper',
            }}
          >
            <Radio size="small" checked={paymentMethod === 'Cash'} value="Cash" sx={{ '&.Mui-checked': { color: 'primary.main' } }} />
            <PaymentsOutlinedIcon sx={{ fontSize: 20, color: 'text.primary' }} />
            <Typography sx={{ fontSize: 12, fontWeight: paymentMethod === 'Cash' ? 700 : 400, color: 'text.primary' }}>{t('Cash on Delivery')}</Typography>
          </Box>

          <Box
            component="label" onClick={() => setPaymentMethod('Visa')}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, borderRadius: 3, cursor: 'pointer',
              border: `1px solid ${paymentMethod === 'Visa' ? `${theme.palette.primary.main}99` : `${theme.palette.text.secondary}40`}`,
              bgcolor: paymentMethod === 'Visa' ? `${theme.palette.primary.main}1A` : 'background.paper',
            }}
          >
            <Radio size="small" checked={paymentMethod === 'Visa'} value="Visa" sx={{ '&.Mui-checked': { color: 'primary.main' } }} />
            <CreditCardOutlinedIcon sx={{ fontSize: 20, color: 'text.primary' }} />
            <Typography sx={{ fontSize: 12, fontWeight: paymentMethod === 'Visa' ? 700 : 400, color: 'text.primary' }}>{t('Credit / Debit Card')}</Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}