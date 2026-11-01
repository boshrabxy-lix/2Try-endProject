import React, { useMemo, useState } from 'react'
import useProducts from '../../hooks/useProducts'
import { Box, Container, InputBase, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/loader/Loader';
import Product from '../../ui/product/ProductUi';
import FilterSlide from '../../components/filterSlide/FilterSlide';
import SearchIcon from "@mui/icons-material/Search";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

function sortProduct(products, sortBy, order) {
  return [...products].sort((a, b) => {
    let result;
    if (sortBy === "price") result = a.price - b.price;
    else if (sortBy === "rating") result = a.rate - b.rate;
    else result = a.name.localeCompare(b.name);
    return order === "asc" ? result : -result;
  });
}

export default function ProductsPage() {
  const { t } = useTranslation();
  const { data, isLoading, error, isError } = useProducts(100);
  const [currentCategory, setCurrentCategory] = useState({ id: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  const [applied, setApplied] = useState({
    min: -Infinity,
    max: Infinity,
    sortBy: "price",
    order: "asc",
  });

  const visibleProducts = useMemo(() => {
    if (!data) return [];
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const inRange = data.response.data.filter((product) => {
      const matchesCategory = currentCategory.id === 'all' || product.categoryId === currentCategory.id;
      const matchesPrice = product.price >= applied.min && product.price <= applied.max;
      const matchesQuery = !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesPrice && matchesQuery;
    });

    return sortProduct(inRange, applied.sortBy, applied.order);
  }, [data, currentCategory, applied, searchTerm]);

  if (isLoading) return <Loader />
  if (isError) return <Box color={'red'}>{error.message}</Box>

  return (
    <>
      <Box className="productsSection" sx={{ py: 2, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }} >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', }}>
            <Typography component={'h2'} variant='h2' sx={{ gap: 4 }}> {t('Products')}</Typography>
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f4fd', border: '1px solid #c3ddef', borderRadius: '999px', px: 3, height: 50,
                width: '100%', maxWidth: 300, boxSizing: 'border-box', transition: 'border-color .2s, box-shadow .2s',
                '&:focus-within': {
                  boxShadow: '0 0 0 3px rgba(159, 205, 240, 0.35)', borderColor: 'info.main',
                },
              }}
            >
              <SearchIcon sx={{ color: '#6b7a8a', fontSize: 22 }} />
              <InputBase
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('Search for luxury essentials...')}
                sx={{ flex: 1, color: '#1f2937', fontSize: '0.9rem', '& input::placeholder': { color: 'info.main', opacity: 1, }, }}
              />
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item size={{ xs: 12, sm: 4, lg: 3 }}>
              <FilterSlide
                currentCategory={currentCategory}
                onCategoryChange={setCurrentCategory}
                onApply={setApplied} />
            </Grid>

            <Grid item size={{ xs: 12, sm: 8, lg: 9 }}>
              <Grid container spacing={2}>
                {visibleProducts.length === 0 ? (
                  <Typography variant='h6' className="no-results" color="error">
                    <DoNotDisturbAltIcon fontSize='small' />
                    {t('No products match these filters.')}
                  </Typography>
                ) : (
                  visibleProducts.map((product) => (
                    <Grid item size={{ xs: 6, sm: 6, md: 3 }} key={product.id}>
                      <Product product={product} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container >
      </Box>
    </>
  )
}
