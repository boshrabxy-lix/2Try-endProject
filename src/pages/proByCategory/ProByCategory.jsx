import React from 'react';
import useProByCategory from '../../hooks/useProByCategory'
import Loader from '../../components/loader/Loader';
import { Box, Typography, Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Product from '../../ui/product/ProductUi';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useTranslation } from 'react-i18next';

export default function ProByCategory() {
    const { id } = useParams();
    const { t } = useTranslation();
    const { data, isError, isLoading, error } = useProByCategory(id);
    console.log(data);

    if (isLoading) return <Loader />
    if (isError) return <Box color={'red'}>{error.message}</Box>
    return (
        <>
            <Box className="productsSection" sx={{ py: 5, backgroundColor: 'background.paper' }}>
                <Container maxWidth="lg">
                    <Typography component={'h2'} variant='h2' sx={{ mb: 3 }}>{t('Products')}</Typography>
                    <Grid container spacing={3}>
                        {data.response.length === 0 ? (
                            <Box sx={{ height: 100, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <Typography color='error' variant='h4'>
                                    <DoNotDisturbAltIcon fontSize='medium' />
                                    {t('Thier is no Product in this Category')}
                                </Typography>
                            </Box>
                        ) : (
                            data.response.map((product) => (
                                <Grid item size={{ xs: 12, sm: 6, md: 2.5 }} key={product.id}>
                                    <Product product={product} />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}