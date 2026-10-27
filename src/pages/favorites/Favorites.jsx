import { Box,Typography ,Container} from '@mui/material'
import React from 'react'
import { useTranslation } from "react-i18next";

export default function Favorites() {
      const { t } = useTranslation();
    
    return (
        <>
            <Box sx={{ height: '50vh' ,py:5}} >
                <Container>
                    <Typography variant="h2">{t("favorites")}</Typography>
                    <Typography variant="body1">{t("favoritesDescription")}</Typography>
                </Container>
            </Box>
        </>
    )
}
