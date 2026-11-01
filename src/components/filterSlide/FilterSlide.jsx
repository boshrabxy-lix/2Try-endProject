import React, { useState } from 'react';
import { Box, Stack, TextField, FormControl, Select, MenuItem, Typography, Button, List, ListItemButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useCategories from '../../hooks/useCategories';
import Loader from '../loader/Loader';
import { useTranslation } from 'react-i18next';

export default function FilterSlide({ currentCategory, onCategoryChange, onApply }) {
  const { data: category, isError, isLoading, error } = useCategories(100);
  const { t } = useTranslation();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleApply = () => {
    const newFilter = {
      min: minPrice !== "" ? parseFloat(minPrice) : -Infinity,
      max: maxPrice !== "" ? parseFloat(maxPrice) : Infinity,
      sortBy,
      order,
    };
    onApply(newFilter);
  };

  const Colors = [
    { id: 'black', color: '#101B26' },
    { id: 'white', color: '#FFFFFF' },
    { id: 'pink', color: '#EBB0F5' },
    { id: 'blue', color: '#86E1FF' },
    { id: 'sage', color: '#A8BCB5' },
  ];
  const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

  // ===== ستايلات موحّدة =====
  const sectionLabelSx = {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'text.secondary',
    mb: 1.5,
  };

  const sectionSx = { mb: 4 };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: 13,
      bgcolor: 'background.default',
      color: 'text.primary',
      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'info.main' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'info.main', borderWidth: 1 },
    },
    '& input::placeholder': { color: 'text.secondary', opacity: 1 },
  };

  const selectSx = {
    borderRadius: '8px',
    fontSize: 13,
    bgcolor: 'background.default',
    color: 'text.primary',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'info.main' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'info.main', borderWidth: 1 },
    '& .MuiSelect-icon': { color: 'text.secondary' },
  };

  const countBadgeSx = {
    minWidth: 22,
    height: 20,
    px: '6px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '999px',
    bgcolor: 'background.default',
    color: 'text.secondary',
    fontSize: 10,
    fontWeight: 500,
  };

  const categoryItemSx = {
    borderRadius: '8px',
    py: 0.75,
    px: 1,
    mb: 0.25,
    justifyContent: 'space-between',
    color: 'text.primary',
    '& .item-name': { fontSize: 13 },
    '&:hover': { bgcolor: (t) => `${t.palette.primary.main}1F` },
    '&.Mui-selected': {
      bgcolor: (t) => `${t.palette.primary.main}33`,
      color: 'primary.dark',
      '& .item-name': { fontWeight: 600 },
      '&:hover': { bgcolor: (t) => `${t.palette.primary.main}4D` },
    },
  };

  if (isLoading) return <Loader />
  if (isError) return <Box color={'red'}>{error.message}</Box>

  return (
    <Box>
      {/* ===== العنوان ===== */}
      <Typography component="h2" sx={{ fontSize: 20, fontWeight: 500, color: 'text.primary', mb: 3 }}>
        {t('Refine')}
      </Typography>

      {/* ===== الفئات ===== */}
      <Box sx={sectionSx}>
        <Typography sx={sectionLabelSx}>{t('Category')}</Typography>
        <List disablePadding>
          <ListItemButton
            selected={currentCategory.id === 'all'}
            onClick={() => onCategoryChange({ id: 'all' })}
            sx={categoryItemSx}
          >
            <Typography className="item-name" component="span">{t('All Categories')}</Typography>
            {category.response.data.length > 0 && (
              <Box component="span" sx={countBadgeSx}>
                {category.response.data.reduce((sum, c) => sum + (c.count ?? c.productsCount ?? 0), 0) || ''}
              </Box>
            )}
          </ListItemButton>

          {category.response.data.map((cat) => {
            const isItemActive = cat.id === currentCategory.id;
            const count = cat.count ?? cat.productsCount;
            return (
              <ListItemButton
                key={cat.id}
                selected={isItemActive}
                onClick={() => onCategoryChange(isItemActive ? { id: 'all' } : cat)}
                sx={categoryItemSx}
              >
                <Typography className="item-name" component="span">{cat.name}</Typography>
                {count !== undefined && <Box component="span" sx={countBadgeSx}>{count}</Box>}
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* ===== الألوان ===== */}
      <Box sx={sectionSx}>
        <Typography sx={sectionLabelSx}>{t('Palette')}</Typography>
        <Stack direction="row" spacing={1.5}>
          {Colors.map(({ id, color }) => {
            const selected = colors.includes(id);
            return (
              <Box
                key={id}
                role="button"
                tabIndex={0}
                aria-label={id}
                aria-pressed={selected}
                onClick={() => toggle(colors, setColors, id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(colors, setColors, id)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: color,
                  border: '1px solid',
                  borderColor: id === 'white' ? 'info.main' : 'transparent',
                  cursor: 'pointer',
                  outline: '2px solid',
                  outlineColor: selected ? 'primary.dark' : 'transparent',
                  outlineOffset: 2,
                  transition: 'outline-color .15s, transform .15s',
                  '&:hover': { transform: 'scale(1.08)' },
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* ===== المقاسات ===== */}
      <Box sx={sectionSx}>
        <Typography sx={sectionLabelSx}>{t('Size')}</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
          {SIZES.map((size) => {
            const selected = sizes.includes(size);
            return (
              <Button
                key={size}
                disableElevation
                onClick={() => toggle(sizes, setSizes, size)}
                sx={{
                  minWidth: 0,
                  height: 32,
                  borderRadius: '6px',
                  fontSize: 12,
                  fontWeight: 500,
                  color: selected ? 'primary.dark' : 'text.primary',
                  bgcolor: selected ? (t) => `${t.palette.primary.main}33` : 'transparent',
                  border: '1px solid',
                  borderColor: selected ? 'primary.main' : 'info.main',
                  '&:hover': { bgcolor: (t) => `${t.palette.primary.main}26`, borderColor: 'primary.main' },
                }}
              >
                {size}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* ===== السعر / الترتيب / تطبيق ===== */}
      <Box>
        <Typography sx={sectionLabelSx}>{t('Filters')}</Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <TextField
              type="number"
              placeholder={t('Min Price')}
              size="small"
              fullWidth
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              sx={fieldSx}
            />
            <TextField
              type="number"
              placeholder={t('Max Price')}
              size="small"
              fullWidth
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              sx={fieldSx}
            />
          </Stack>

          <FormControl fullWidth size="small">
            <Typography sx={{ ...sectionLabelSx, mb: 0.75 }}>{t('Sort By')}</Typography>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              <MenuItem value="price">{t('Price')}</MenuItem>
              <MenuItem value="name">{t('Name')}</MenuItem>
              <MenuItem value="rating">{t('Rate')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <Typography sx={{ ...sectionLabelSx, mb: 0.75 }}>{t('Order')}</Typography>
            <Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              <MenuItem value="asc">{t('Ascending')}</MenuItem>
              <MenuItem value="desc">{t('Descending')}</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            onClick={handleApply}
            variant="contained"
            disableElevation
            sx={{
              bgcolor: 'primary.dark',
              color: 'primary.contrastText',
              borderRadius: '8px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              py: 1.2,
              '&:hover': { bgcolor: 'primary.dark', filter: 'brightness(1.15)' },
            }}
          >
            {t('APPLY FILTER')}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}