import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Link, Stack, Typography, Grid } from '@mui/material';
import useCategories from '../../hooks/useCategories';
import Loader from '../loader/Loader';
import Category from '../../ui/categoryUi/CategorySectionUi';

export default function CategorySection() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useCategories();
  if (isLoading) return <Loader />
  if (isError) return <Box color={'red'}>{error.message}</Box>

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Typography component={'h2'} variant='h4' sx={{ my: 1.5, fontWeight: 500, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>{t('Curated Realms')}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, alignItems: 'center', mb: 4, }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}> {t('Explore our meticulously crafted universes.')} </Typography>
          <Box sx={{ cursor: "pointer", alignItems: "center", }}>
            <Link
              component={RouterLink} to="collections" underline="none"
              sx={{
                fontSize: '0.8rem', fontWeight: 600, alignItems: "flex-end", letterSpacing: '0.04em', pb: '2px',
                color: "primary.dark", borderBottom: '1px solid currentColor', transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.7 },
              }}
            > {t('View All Categories')} </Link>
          </Box>
        </Box>

        <Grid container spacing={6}>
          {data.response.data.map((category, i) =>
            <Grid item size={{ xs: 6, sm: 6, md: 3 }} key={category.name} sx={{ my: 5, }}>
              <Category category={category} key={category.id} index={i} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}