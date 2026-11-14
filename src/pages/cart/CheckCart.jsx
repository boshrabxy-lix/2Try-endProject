import { useState } from 'react'; // NEW
import { Box, Container, Grid, Typography, Alert, useTheme } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import OrderSummary from './OrderSummary';
import Loader from '../../components/loader/Loader';
import useCart from '../../hooks/useCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';

export default function CheckCart() {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const { pathname, state } = useLocation(); 
    const [placing, setPlacing] = useState(false);
    const steps = [t('Cart'), t('Details'), t('Review')];
    const { data, isError, error, isLoading } = useCart();
    const { isPending: updateItemPending } = useUpdateCartItem();

    const activeStep = pathname.includes('/review')
        ? 3 : pathname.includes('/checkout') ? 2 : 1;
    const money = (n) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);

    const subtotal = data?.cartTotal ?? data?.items.reduce((s, i) => s + i.price * i.count, 0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;
    const summaryRows = [
        { label: t('Subtotal'), value: money(subtotal), color: 'text.primary' },
        { label: t('Shipping'), value: t('Complimentary'), color: 'primary.dark' },
        { label: t('Estimated Tax'), value: money(tax), color: 'text.primary' },
    ];

    const emptyAlert = () =>
        Swal.fire({
            title: t('Cart is Empty!'),
            text: t('Cart Is Already Empty!'),
            icon: 'warning',
            confirmButtonColor: theme.palette.primary.dark,
            confirmButtonText: t('Close'),
        });

   const handleCheckout = async () => {
    if (data.items.length === 0) {
        emptyAlert();
        return;
    }

    if (activeStep === 3) {
        setPlacing(true);
        try {
            await Swal.fire({
                title: t('Order placed!'),
                text: t('Thank you for your order'),
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
            });
            navigate('/', { replace: true });
        } catch (err) {
            setPlacing(false);
            Swal.fire({
                title: t('Something went wrong'),
                text: err?.message,
                icon: 'error',
                confirmButtonColor: theme.palette.primary.dark,
            });
        }
        return;
    }

    navigate('checkout');
};

    const handleBack = () => (activeStep === 3 ? navigate('checkout', { state }) : navigate('.'));
    if (isLoading) return <Loader />;
    if (isError) return <Alert variant="outlined" severity="error">{error?.message || error || t('Something went wrong')}</Alert>;

    return (
        <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: 520, mx: 'auto', mb: 6 }}>
                    {steps.map((label, i) => {
                        const num = i + 1;
                        const isActive = num === activeStep;
                        const isDone = num < activeStep;
                        const filled = isActive || isDone;
                        return (
                            <Box key={label} sx={{ display: 'flex', alignItems: 'flex-start', flex: num === steps.length ? '0 0 auto' : 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    <Box
                                        sx={{
                                            width: 30, height: 30, borderRadius: '50%', boxSizing: 'border-box', fontSize: 12, fontWeight: 700, lineHeight: 1,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: filled ? 'primary.dark' : 'background.paper',
                                            color: filled ? 'primary.contrastText' : 'text.primary', border: filled ? 'none' : '1px solid', borderColor: 'divider',
                                            transition: 'all .3s ease',
                                        }}
                                    >
                                        {isDone ? <CheckIcon sx={{ fontSize: 16 }} /> : num}
                                    </Box>
                                    <Typography sx={{ fontSize: 11, letterSpacing: '0.6px', lineHeight: '14px', color: filled ? 'primary.dark' : 'text.secondary' }}>
                                        {label}
                                    </Typography>
                                </Box>

                                {num !== steps.length && (
                                    <Box
                                        sx={{
                                            flex: 1, height: 2, borderRadius: 1, mt: '14px', mx: 1.5, opacity: isDone ? 1 : 0.35,
                                            bgcolor: isDone ? 'primary.dark' : isActive ? 'primary.main' : 'background.paper',
                                            color: isDone ? 'primary.dark' : isActive ? 'primary.contrastText' : 'text.primary',
                                            border: filled ? 'none' : '1px solid', transition: 'all .3s ease',
                                        }}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>

                <Grid container spacing={4} alignItems="flex-start">
                    <Grid className="outlet-cart" size={{ xs: 12, md: 'grow' }} sx={{ minWidth: 0 }}>
                        <Outlet context={{ money }} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 'auto' }} sx={{ width: { xs: '100%', md: 360 } }}>
                        <OrderSummary
                            summaryRows={summaryRows}
                            total={total}
                            money={money}
                            handleCheckout={handleCheckout}
                            updateItemPending={updateItemPending}
                            data={data}
                            step={activeStep}
                            onBack={handleBack}
                            placing={placing} 
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}