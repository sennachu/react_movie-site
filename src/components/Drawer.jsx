import React, { useState } from "react";
import { UserButton } from "@clerk/clerk-react"
import {Drawer,IconButton,List,ListItemButton,ListItemIcon,ListItemText,} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

  const pages = ["Aksiyon", "Komedi", "Dram","Favoriler", "Çıkış Yap"];
  const DrawerComp = ({ searchParam, handleSearch }) => {
  const [openDrawer, setOpenDrawer] = useState(false); // drawwerın açık veya kapalı olma durumunu tutar
  

return ( 
    //anchor özelliği ile drawer sol taraftan açılır. open özelliği ile açık/kapalı durumu kontrol edilir.
    //Menü içeriği, pages dizisindeki sayfa isimleri ile oluşturulur. List ve ListItemButton kullanılarak her bir sayfa için bir liste öğesi oluşturulur.
    //IconButton, menünün açılıp kapanmasını sağlar. Tıklama olayı ile openDrawer durumu değişir.
    //Arama çubuğu, handleSearch fonksiyonu ile arama yapmayı sağlar. onChange ile input değiştiğinde bu fonksiyon tetiklenir. value ise arama değerini gösterir.
    //clerkin sağladığı UserButton, kullanıcıyı sisteme giriş veya çıkış yapmaya yönlendirir.
    <React.Fragment>
      
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
      <div class="wrap">
              <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="Arama.."
                onChange={handleSearch}
                value={searchParam}
              />
              </div>
              </div>
      <UserButton/>
    </React.Fragment>
  );
};

export default DrawerComp;