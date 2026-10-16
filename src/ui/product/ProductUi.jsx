import React from 'react';
import { Rating, Typography, Box, Link, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductUi({ product }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const gradientBackground = `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, #F1A9D6 100%)`;
  const { mutate: addToCart, isPending: AddToCartPending } = useAddToCart();

  const handle = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    fn?.();
  };

  return (
    <Link component={RouterLink} to={`/Products/${product.id}`} underline="none" sx={{ color: 'inherit', display: 'block', height: '100%' }} >
      <Card
        sx={{
          position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper', borderRadius: '20px',
          textAlign: 'start', boxShadow: (t) => `0 4px 16px ${t.palette.info.main}26`,
          transition: 'transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s cubic-bezier(.4,0,.2,1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: (t) => `0 16px 32px ${t.palette.info.main}55`,
          },
          '&:hover .product-img-wrap': { bgcolor: 'background.paper' },
          '&:hover .product-img': { transform: 'scale(1.06)' },
          '&:hover .add-to-cart-btn': { opacity: 1, transform: 'translateY(0)' },
          '&:hover .add-to-cart-btn:hover': { transform: 'translateY(0) scale(1.1)' },
        }}
      >
        <Box className="product-img-wrap" sx={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 5', bgcolor: 'background.default', transition: 'background-color .35s ease', }} >
          <CardMedia component="img" className="product-img" image={product.image} alt={t(product.name)}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform .6s ease', }} />

          <Box component="button" type="button" className="add-to-cart-btn" aria-label="add to cart"
            disabled={AddToCartPending}
            onClick={handle(() => addToCart({ productId: product.id, count: 1 }))}
            sx={{
              position: 'absolute', bottom: 14, insetInlineEnd: 14, width: 48, height: 48, p: 0,
              border: 'none', outline: 'none', borderRadius: '50%', display: 'flex', color: 'secondary.contrastText',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: gradientBackground, transition: 'opacity .3s ease, transform .3s ease',
              boxShadow: (t) => `0 6px 16px ${t.palette.secondary.main}80`, opacity: 0, transform: 'translateY(10px)',
              '&:disabled': { cursor: 'not-allowed', filter: 'grayscale(0.4)' },
              '@media (hover: none)': { opacity: 1, transform: 'translateY(0)' },
            }}
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
          </Box>
        </Box>

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
            <Typography variant="h3" sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.4 }}>
              {t(product.name)}
            </Typography>
            <Typography component="span" sx={{ fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.6, color: 'info.main', flexShrink: 0, whiteSpace: 'nowrap' }}> ${product.price} </Typography>
          </Box>

          <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, }} >
            <Rating size="small" value={product.rate} precision={0.5} readOnly
              sx={{
                color: 'info.main', fontSize: '1rem', gap: '2px', flexShrink: 0,
                '& .MuiRating-iconEmpty': { color: 'text.secondary' },
              }}
            />
            <Link component={RouterLink} to={`/Products/${product.id}`} underline="none"
              sx={{
                color: 'inherit', display: 'block', height: '100%', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                whiteSpace: 'nowrap', color: 'text.secondary', cursor: 'pointer', transition: 'color .2s ease',
                '&:hover': { color: 'text.primary' },
              }}
            >
              {t('Quick view')}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Link >
  )
}