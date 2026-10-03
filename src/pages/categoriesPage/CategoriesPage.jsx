import Category from '../../ui/categoryUi/CategoryPageUi';
import { Box, Typography, Container, Grid } from '@mui/material';
import Loader from '../../components/loader/Loader';
import useCategories from '../../hooks/useCategories';
import { useTranslation } from "react-i18next";

export default function CategoriesPage() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useCategories(100);
  console.log(data);

  if (isLoading) return <Loader />
  if (isError) return <Box color={'red'}>{error.message}</Box>
  return (
    <Box className="categories" sx={{ py: 7 , backgroundColor: 'background.default'}} >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography component={'h2'} variant='h2' sx={{ mb: 3 }}> {t('Collections')}</Typography>
        <Grid container spacing={5}>
          {data.response.data.map((category, i) =>
            <Grid item size={{ xs: 6, md: 3 }} key={category.id}>
              <Category category={category} index={i} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  )
}