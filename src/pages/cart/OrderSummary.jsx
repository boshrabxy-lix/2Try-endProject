import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Divider, useTheme } from '@mui/material';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

export default function OrderSummary({ summaryRows, total, money, handleCheckout, updateItemPending, data, step = 1, onBack, placing = false, }) {
    const { t } = useTranslation();
    const [promo, setPromo] = useState('');
    const theme = useTheme();
    const isDetails = step === 2;
    const isReview = step === 3;
    const isLater = step >= 2;
  const gradientBackground = `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, #F1A9D6 100%)`;

    const buttonLabel = isReview
        ? (placing ? t('Finalizing...') : t('Place Order'))
        : isDetails ? t('Continue to Review') : t('Checkout');

    const mainButtonSx = isLater
        ? {
            py: 1.5, borderRadius: 3, color: '#fff', fontWeight: 700, fontSize: 13, textTransform: 'none',
            background:gradientBackground,
            boxShadow: `0 6px 18px ${theme.palette.secondary.light}80`,            transition: 'all .3s ease',

            '&:hover': {
                background:gradientBackground,  transform: 'translateY(-3px)',
                boxShadow: `0 12px 26px ${theme.palette.secondary.main}59`,
            }, '&.Mui-disabled': { color: '#fff', opacity: 0.6 },
        }
        : {
            py: 1.5, borderRadius: 3, color: 'secondary.contrastText', fontWeight: 700, textTransform: 'none', boxShadow: `0 6px 18px ${theme.palette.secondary.main}73`,
            background:gradientBackground, transition: 'all .3s ease',
            '&:hover': {
                background: theme.palette.secondary.dark, transform: 'translateY(-3px)', boxShadow: `0 12px 26px ${theme.palette.secondary.dark}59`,
            },
            '&.Mui-disabled': { color: 'secondary.contrastText', opacity: 0.6 },
        };

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 5, p: 3, boxShadow: `0 8px 30px ${theme.palette.primary.dark}14`, position: { md: 'sticky' }, top: { md: 24 }, }} >
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary', mb: 2 }}>{t('Order Summary')}</Typography>

                {summaryRows.map((row) => (
                    <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{row.label}</Typography>
                        <Typography sx={{ fontSize: 13, color: row.color }}>{row.value}</Typography>
                    </Box>
                ))}

                <Divider sx={{ my: 1.5, borderBottomWidth: isLater ? 1 : 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary' }}>{t('Total')}</Typography>
                    <Typography sx={{ fontSize: 28, fontWeight: 500, color: 'primary.dark' }}>{money(total)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <TextField
                        size="small" fullWidth placeholder={t('Promo Code')} value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2, fontSize: 12, bgcolor: 'background.paper', transition: 'box-shadow .25s ease', py: 0.5,
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.dark' },
                                '&:hover': { boxShadow: `0 0 0 3px ${theme.palette.primary.dark}1A` },
                            },
                        }}
                    />
                    <Button variant="text"
                        sx={{
                            color: 'primary.dark', fontWeight: 700, fontSize: 12, textTransform: 'none', minWidth: 'auto', transition: 'all .25s ease',
                            '&:hover': { bgcolor: 'primary.dark', color: 'primary.contrastText' },
                        }}
                    >
                        {t('Apply')}
                    </Button>
                </Box>

                <Button fullWidth disabled={updateItemPending || data.items.length === 0 || placing}
                 {...(isDetails ? { type: 'submit', form: 'checkout-form' } : { onClick: handleCheckout })}
                    sx={mainButtonSx}
                >
                    {buttonLabel}
                </Button>

                {isLater && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2.5 }}>
                   <Button variant="text" onClick={onBack} disabled={placing}
                           startIcon={ <ArrowBackIcon sx={{ fontSize: '14px !important', transform: theme.direction === 'rtl' ? 'scaleX(-1)' : 'none' }} /> }
                            sx={{ color: 'text.secondary', fontSize: 11, textTransform: 'none', fontWeight: 400, '&:hover': { bgcolor: 'transparent', color: 'primary.dark' } }}
                        >
                            {t('Back to Previous Step')}
                        </Button>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 3, color: 'text.secondary' }}>
                    <GppGoodOutlinedIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        {t('Secure Checkout System')}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}