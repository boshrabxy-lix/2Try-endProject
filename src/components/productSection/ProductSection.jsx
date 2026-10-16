import React from 'react';
import useProducts from '../../hooks/useProducts';
import { Grid, Box, Button, Typography, Container } from '@mui/material';
import Loader from '../loader/Loader';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Product from '../../ui/product/ProductUi';

export default function ProductsSection() {
    const { t } = useTranslation();
    const { data, isError, isLoading, error } = useProducts(3);
    if (isLoading) return <Loader />
    if (isError) return <Typography color='error'>{error?.message || t('Something went wrong')}</Typography>

    return (
        <Box className='products' component="section" sx={{ py: 5, my: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography component={'h2'} variant='h4' sx={{ fontSize: 38, fontWeight: 700 }}>{t('Products')}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}> {t('The most loved items this month.')} </Typography>
                    </Box>
                    <Button
                        component={RouterLink} variant='outlined' to='/products'
                        sx={{ borderRadius: "90px", fontSize: 12, textDecoration: 'none', color: 'info.main' }}
                    > {t('All Products')}
                        <ChevronRightIcon sx={{ fontSize: 16 }} />
                    </Button>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {data.response.data.map(product =>
                        <Grid item size={{ xs: 6, md: 3 }} key={product.id}>
                            <Product product={product} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    )
}