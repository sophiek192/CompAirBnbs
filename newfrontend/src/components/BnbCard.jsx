import React, { useState } from "react";
import { Box } from "@mui/material"
function BnbCard() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cardStyle = {
    height:"700px", width:"300px", background: 'brown',
    border:"1px grey", borderRadius:"20px", marginTop:"100px",
    display:'flex',
  }

  const handleSubmit = () => {
    // post('/auth/login', {
    //   email: email,
    //   password: password
    // })
  }


  return (
    <>
      <Box sx={cardStyle}>
        LOL
      </Box>
    </>
  )
}

export default BnbCard;
