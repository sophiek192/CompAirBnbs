import React, { useState } from "react";
import { Box } from "@mui/material"

function BnbCard() {


  // Framer animation hook
  // const animControls = useAnimation();

  // Some styling for the card
  // it is placed inside the card component
  // to make backgroundImage and backgroundColor dynamic
  const style = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundColor: 'blue',
      boxShadow: '5px 10px 18px #888888',
      borderRadius: 10,
      height: 300
  };



  return (
    <>
    <Box sx={{width:'30px',height:'700px'}}>
    </Box>
    </>
  )
}

export default BnbCard;
