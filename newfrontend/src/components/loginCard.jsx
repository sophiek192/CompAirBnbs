import React, { useState } from "react";
import { Box, Button,  Container, Link, TextField, Typography } from "@mui/material"
import { post } from "../helpers"
function LoginCard() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginCardStyle = {
    height:"500px", width:"800px", background: 'rgba(256,256,256,0.7)',
    border:"1px grey", borderRadius:"20px", marginTop:"100px",
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  }

  const handleSubmit = () => {
    // post('/auth/login', {
    //   email: email,
    //   password: password
    // })
  }


  return (
    <>
      <Box sx={loginCardStyle}>
          <Typography sx={{margin: '40px auto 0 auto', fontFamily:'Playfair Display', fontSize:'40px', textDecoration:'underline', textDecorationThickness:'2px', textUnderlineOffset:'3px'}} variant='h2'>Welcome to CompAirbnb</Typography>        <Container sx={{width: '80%', display:'flex', flexDirection:'column',justifyContent:'space-between', height:'60%'}}>
          <Typography sx={{margin: '0', fontSize:'25px'}} className="Title" variant='p'>Login</Typography>
          <TextField
            sx={{margin: '0 auto', fontSize:'25px'}}
            required fullWidth
            id="email-input"
            label="Email"
            onChange={(e) => {setEmail(e.target.value)}}
            margin="dense"
            aria-label="Input email to login"
          />
          <TextField 
            sx={{margin: '0 auto', fontSize:'25px'}}
            required fullWidth
            id="password-input"          
            label="Password"
            type="password"
            onChange={(e) => {setPassword(e.target.value)}} 
            margin="dense"
            aria-label="Input password to login"
          />
          <Button
            color="primary"
            type="submit"
            name="submit"
            onClick={handleSubmit}
            >
            Submit
          </Button>
        </Container>
        <Container sx={{width: '80%', display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
          <Typography sx={{ fontSize:'15px', marginBottom:'10px'}} variant='p'>New around here?
            <Link sx={{marginLeft:"4px"}} href="/register" color="primary">
            Create account.
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default LoginCard;
