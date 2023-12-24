import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {AppBar,Tab,Tabs,Toolbar,useMediaQuery,useTheme,} from "@mui/material";
import DrawerComp from "./Drawer";
import "../style/search.css";
import { blue, indigo } from "@mui/material/colors";
import { Link } from "react-router-dom";

const themer = createTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

const Navbar = ({ searchParam, handleSearch }) => {
  const theme = useTheme(); // mui temalarını kullanma
  const isMatch = useMediaQuery(theme.breakpoints.down("md")); // ekran boyutunu kontrol eder

  return (
      <AppBar sx={{ background: "#411124" }}>
        <Toolbar>
          {isMatch ? (
            <DrawerComp />
          ) : (
            //useTheme ve useMediaQuery kullanılarak, ekranın genişliğine göre (md boyutuna göre) bir kontrol yapılır ve küçük ekranlarda çekmece (Drawer) bileşeni gösterilir.
            //büyük ekranlarda tabs ve tab bileşenleri ile menü sekmesi oluşturulur ve her sekme, farklı bir sayfaya link ile yönlendirme yapar.
            // input ile oluşturulan arama çubuğu handleSearch fonksiyonu ile arama yapar ve sonuçlar gösterilir.
            //UserButton kullanıcının giriş/çıkış yapmasını veya hesabına erişmesini sağlar.
            <>
            
              <Tabs
                sx={{ marginRight: "auto" }}
                indicatorColor="secondary"
                textColor="error"
              >
                <Tab label="Ana Sayfa" component={Link} to="/Ana_Sayfa" />
                <Tab label="Aksiyon" component={Link} to="/Aksiyon" />
                <Tab label="Komedi" component={Link} to="/Komedi" />
                <Tab label="Dram" component={Link} to="/Dram" />
              </Tabs>  
              <ThemeProvider theme={themer}>
              </ThemeProvider>
              <form action="" className="search-bar">
                <input
                  type="search"
                  name="search"
                  autoComplete="off"
                  pattern=".*\S.*"
                  required
                  onChange={handleSearch}
                  value={searchParam}
                />
                <button className="search-btn" type="submit">
                  <span></span>
                </button>
              </form>
              <UserButton />
            </>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
