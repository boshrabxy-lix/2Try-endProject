import { useMemo, useState } from "react";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import { useTimer } from "react-timer-hook";
import Tilt from "react-parallax-tilt";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";

const pad = (n) => String(n).padStart(2, "0");

export default function LimitedEditionSection({ endDate }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const gradientBackground = `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, #F1A9D6 100%)`;

  const [imgFailed, setImgFailed] = useState(false);
  const target = useMemo(
    () => endDate ?? Date.now() + ((2 * 24 + 14) * 60 + 35) * 60 * 1000,
    [endDate]
  );

  const { days, hours, minutes } = useTimer({
    expiryTimestamp: new Date(target),
  });

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 18 }, backgroundColor: "background.paper", }} >
      <Container maxWidth="lg" >
        <Grid container spacing={{ xs: 6, md: 7 }}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: "100%" }}>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "primary.dark", textTransform: "uppercase", mb: 1.5, }} > {t("Limited Edition")} </Typography>
                <Typography component="h2" sx={{ fontSize: { xs: 30, md: 48 }, fontWeight: 700, lineHeight: 1.1, mb: 2.5, }} > {t("Solaris Timepiece")} </Typography>
                <Typography sx={{ fontSize: 18, lineHeight: 1.8, color: "text.secondary", maxWidth: 480, mb: 3.5, }} > {t("A celestial masterpiece limited to 50 numbered pieces worldwide. Crafted with moon-phase precision and ethereal aesthetics.")}
                </Typography>

                <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
                  {[
                    [days, t("DAYS")],
                    [hours, t("HOURS")],
                    [minutes, t("MINS")],
                  ].map(([value, label]) => (
                    <Box key={label} sx={{ textAlign: "left", minWidth: 56,}}>
                      <Typography sx={{ fontSize: 32, fontWeight: 500, lineHeight: 1.1, color: "primary.dark",mb: "1px", fontVariantNumeric: "tabular-nums", }} > {pad(value)} </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", color: "text.secondary", mt: 0.5, }} > {label} </Typography>
                    </Box>
                  ))}
                </Box>

                <Button sx={{
                  px: 7, py: 2, borderRadius: 999, textTransform: "none", fontSize: 14, letterSpacing: "0.7px",
                  fontWeight: 300, color: "#fff", background: "linear-gradient(135deg, #D4AAFE 0%, #E8AEF2 100%)", boxShadow: "0 6px 20px rgba(208, 169, 254, 0.4)",
                  transition: "transform .3s ease, box-shadow .3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 28px rgba(208, 169, 254, 0.6)",
                  },
                }}
                > {t("Secure Yours")} </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", justifyContent:"center" }} >
              <Tilt
                tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.04} transitionSpeed={800} gyroscope={true}
                glareEnable={true} glareMaxOpacity={0.25} glareColor="#fff" glarePosition="all" glareBorderRadius="32px"
                style={{ borderRadius: 32, width: "100%", maxWidth: 530 }}
              >
                <Box
                  component="img"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7DYl5lk7GjUKtuusOfSmCRNOBu7vgyjCsUzVrUXhvJv1REYIHQrxVVYcEWYgcrLjBpV3Fus6hSrSLScGE8x06YQeTTdVKA-YBtBiMB42XWZlwrQ4VM_N6a5cTQTJPgQOcL_S7TFgcybHZL715NomdcTzMfLMoYhcL8v5cbLo1xuVWe6Vivu8DoThb0yVurN-C5hDcgyCFdeglHWgLx3VWzuigCr3RHZFc-9xFLXT1zMl4f1LU_ebbgfGERv1SIpq4jbIESkoV8Q"
                  alt={t("Solaris Timepiece")}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  onLoad={() => setImgFailed(false)}
                  sx={{
                    display: "block", width: "100%", aspectRatio: "1 / 1",
                    objectFit: "cover", borderRadius: "32px", opacity: imgFailed ? 0.6 : 1,
                    background:
                      "linear-gradient(160deg, #1b1030 0%, #8F72C4 100%)",
                    boxShadow: "0 30px 60px rgba(27, 16, 48, 0.25)",
                  }}
                />
              </Tilt>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}