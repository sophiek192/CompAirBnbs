import React, { useState } from "react";
import BnbCard from "../components/BnbCard";
import { Container } from "@mui/material"

function Tinder() {

  return (
    <>
      <Container sx={{height:'100%', width:'100%', backgroundColor:'grey'}}>
        <BnbCard />
      </Container>
    </>
  );
}

export default Tinder;
