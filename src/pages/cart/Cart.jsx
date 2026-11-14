import { useState } from 'react';
import { Box, IconButton, Button, Typography, useTheme, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import useClearCart from '../../hooks/useClearCart';
import Loader from '../../components/loader/Loader';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

export default function Cart() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isError, error, isLoading } = useCart();
  console.log('Cart data:', data);
  const { mutate: removeItem, isPending: removeItemPending } = useRemoveFromCart();
  const { mutate: updateItem, isPending: updateItemPending } = useUpdateCartItem();
  const { mutate: clearCart, isPending: clearPending } = useClearCart();

  const money = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);

  const handleUpdateQty = (productId, action) => {
    const item = data.items.find((i) => i.productId == productId);
    updateItem({ productId, count: action === '-' ? item.count - 1 : item.count + 1 });
  };

  const emptyAlert = () =>
    Swal.fire({
      title: t('Cart is Empty!'),
      text: t('Cart Is Already Empty!'),
      icon: 'warning',
      confirmButtonColor: theme.palette.primary.dark,
      confirmButtonText: t('Close'),
    });

  const handleRemove = (item) => {
    Swal.fire({
      title: t('Remove item?'),
      text: t('{{name}} will be removed from your cart', { name: item.productName }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      confirmButtonText: t('Yes, remove it'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(item.productId, {
          onSuccess: () =>
            Swal.fire({
              title: t('Removed!'),
              text: t('Item removed successfully'),
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }),
          onError: (err) =>
            Swal.fire({
              title: t('Something went wrong'),
              text: err?.message,
              icon: 'error',
            }),
        });
      }
    });
  };
  const handleClearCart = () => {
    if (data.items.length === 0) {
      emptyAlert();
      return;
    }
    Swal.fire({
      title: t('Clear cart?'),
      text: t('All items will be removed from your cart'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      confirmButtonText: t('Yes, clear it'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        data.items.forEach((item) => clearCart(item.productId));
      }
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <Alert variant="outlined" severity="error">{error?.message || error || t('Something went wrong')}</Alert>;

  return (
    <>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 'grow' }} sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Typography component="h1" sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 500, color: 'text.primary' }}>
              {t('Your Shopping Collection')}
            </Typography>

            <Button
              variant="outlined"
              disabled={clearPending}
              onClick={handleClearCart}
              startIcon={<DeleteSweepOutlinedIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                height: 33, minWidth: 0, px: '14px', py: 0, gap: 0, textTransform: 'none', fontWeight: 400, fontSize: 12,
                lineHeight: 1, color: 'text.primary', bgcolor: 'transparent', border: '1px solid', borderColor: 'divider',
                borderRadius: 99, cursor: 'pointer', transition: 'color .2s ease, border-color .2s ease',
                '& .MuiButton-startIcon': { mr: '8px', ml: 0 },
                '&:hover': {
                  color: 'error.dark', borderColor: 'error.dark', bgcolor: 'transparent',
                },
              }}
            >
              {t('Clear Cart')}
            </Button>
          </Box>

          {data.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                bgcolor: 'background.paper', borderRadius: 4, p: { xs: 2, sm: 3 }, mb: 2, boxShadow: `0 2px 12px ${theme.palette.primary.dark}0D`, position: 'relative',
                border: '1px solid transparent', transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)', boxShadow: `0 16px 36px ${theme.palette.primary.dark}2E`, borderColor: 'primary.main',
                },
              }}
            >
              <IconButton size="small" disabled={removeItemPending} onClick={() => handleRemove(item)}
                sx={{
                  position: 'absolute', top: 14, insetInlineEnd: 14, color: 'text.secondary', transition: 'all .25s ease',
                  '&:hover': {
                    color: 'error.main', bgcolor: `${theme.palette.error.main}1F`, transform: 'rotate(90deg)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <Typography sx={{ fontSize: 22, fontWeight: 600, color: 'text.primary', pe: 5 }}>{item.productName}</Typography>
              {item.description && (
                <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 0.5 }}>{item.description}</Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: 130, height: 40, px: 1, border: '1px solid', borderColor: 'divider', borderRadius: 99,
                  bgcolor: 'background.paper', transition: 'border-color .25s ease, box-shadow .25s ease',
                  '&:hover': {
                    borderColor: 'primary.dark', boxShadow: `0 0 0 3px ${theme.palette.primary.dark}1F`,
                  },
                }}
                >
                  <IconButton
                    size="small"
                    disabled={updateItemPending || item.count <= 1}
                    onClick={() => handleUpdateQty(item.productId, '-')}
                    sx={{ ml: 0.5, transition: 'all .2s ease', '&:hover': { bgcolor: 'primary.dark', color: 'primary.contrastText', transform: 'scale(1.1)' }, }} >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, textAlign: 'center', flex: 1 }}> {item.count} </Typography>

                  <IconButton
                    size="small"
                    disabled={updateItemPending}
                    onClick={() => handleUpdateQty(item.productId, '+')}
                    sx={{ mr: 0.5, transition: 'all .2s ease', '&:hover': { bgcolor: 'primary.dark', color: 'primary.contrastText', transform: 'scale(1.1)' }, }} >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>

                <Typography sx={{ fontSize: 22, fontWeight: 600, color: 'primary.dark' }}>{money(item.price * item.count)}</Typography>
              </Box>
            </Box>
          ))}

          {data.items.length === 0 && (
            <Button variant="text" onClick={() => navigate('/products')}
              sx={{ color: 'primary.dark', transition: 'all .25s ease', '&:hover': { bgcolor: `${theme.palette.primary.dark}1A` }, }} >
              {t('Continue Shopping')}
            </Button>
          )}
        </Grid>
      </Grid>

    </>
  );
}