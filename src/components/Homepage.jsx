import React from 'react'
import {Button} from "@mui/material";
import '../style/home.css'

function Homepage() {
  return (
    <>
      <div className='header'>222016746 Sena Bezirkan Web Geliştirme Teknikleri Vize Projesine Hoş Geldiniz</div>
      <div className='inner'>
        <Button color="warning" variant="contained" >
          <a id='sign-in' href='/Ana_Sayfa'>Giriş Yap</a>
        </Button>
      </div>
    </>
  )
}

export default Homepage
