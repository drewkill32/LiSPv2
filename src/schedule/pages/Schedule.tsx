import { useLineup } from "../lineup";
import { Box, Fab, Stack, Typography, Zoom } from "@mui/material";
import { Search } from "../components/Search";
import { FilterDays } from "../components/FilterDays";
import { FilterStared } from "../components/FilterStared";
import { SortOption } from "../components/SortOption";
import { ArtistList } from "../components/ArtistList";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function Schedule() {
  const { search, setSearch } = useLineup();
  return (
    <Box>
      <Stack gap={2} sx={{ margin: { xs: 2, sm: 6 } }}>
        <Search />
        <Stack
          gap={1}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            position: "sticky",
            top: 55,
            zIndex: 999,
            backgroundColor: "white",
          }}
        >
          <FilterDays />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <SortOption />
            <FilterStared />
          </Stack>
        </Stack>
        <ArtistList />
        {Boolean(search) && <Box sx={{ height: "20px" }}></Box>}
        <Zoom
          in={Boolean(search)}
          unmountOnExit
          {...(Boolean(search) ? { timeout: 500 } : {})}
        >
          <Fab
            sx={{ position: "fixed", right: "30px", bottom: "20px" }}
            size="small"
            aria-label="remove-filter"
            onClick={() => setSearch("")}
          >
            <FilterAltOffIcon />
          </Fab>
        </Zoom>
        <Typography variant="h1" textAlign="center">
          Powered By:
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            backgroundColor: "#e5e5e5",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
          }}
        >
          {imgData.map((item) => (
            <Box component="li" key={item.src}>
              <img {...item} loading="lazy" width={150} />
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

const imgData = [
  {
    src: "/imgs/sponsors/lost_logo.png",
    alt: "Lost in St. Pete",
  },
  {
    src: "/imgs/sponsors/dea_and_saint.png",
    alt: "Dea & Saint",
  },
  {
    src: "/imgs/sponsors/little_saint_nick.png",
    alt: "Little Saint Nick",
  },
  {
    src: "/imgs/sponsors/gobioff_foundation.png",
    alt: "Gobioff Foundation",
  },
  {
    src: "/imgs/sponsors/pcf-logo.png",
    alt: "Pinellas Community Foundation",
  },
  {
    src: "/imgs/sponsors/rgr-logo-2015-v2-black.png",
    alt: "Rock Garden Recording",
  },
  {
    src: "/imgs/sponsors/convicted_printing_logo_no_light.png",
    alt: "Convicted Printing",
  },
  {
    src: "/imgs/sponsors/bad_company.png",
    alt: "Bad Company Tech Solutions",
  },
  {
    src: "/imgs/sponsors/daddy_kool.png",
    alt: "Daddy Kool Records",
  },
  {
    src: "/imgs/sponsors/imagine360video_edge_logo_full.png",
    alt: "Imagine 360 Video",
  },
  {
    src: "/imgs/sponsors/symphonic_logo.png",
    alt: "Symphonic",
  },
  {
    src: "/imgs/sponsors/pizza_box_logo.png",
    alt: "Pizza Box",
  },
];
