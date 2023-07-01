import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LoginCard from "../components/loginCard";
import RegisterCard from "../components/registerCard";

function Login({ isLogin }) {
  const [image, setImage] = useState('null');

  const login = {
    display: "flex",
    margin: "auto auto",
    justifyContent: "center",
  }

  useEffect(() => {
    // const ACCESS_KEY = '-c5pj-wdBYnrAk7V6nLCo_kqIi7xGDAGvnfcpCQiM2g'
    // const image = fetch(`https://api.unsplash.com/photos/random`, {
    //     method: 'get',
    //     headers : {
    //         'Content-type': 'application/json',
    //         'Authorization': `Client-ID ${ACCESS_KEY}`
    //     },
    //   }
    // )
    // .then((response) => {
    //   return response.json()})
    // .then((json) => {
    //   if ("error" in json) {
    //     return Promise.reject(json.error);
    //   }
    //   console.log(json)
    //   setImage(json.urls.full)
    // })
    setImage('https://images.unsplash.com/photo-1564032236772-dfc27a12feda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')
  }, []);


  
  return (
    <div style={{width: "100%", height:"100%", position:"fixed", backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
    }} >
    <Box sx={login}>
    {isLogin ? <LoginCard /> : <RegisterCard />}
    </Box> 
    </div>
  )
}

export default Login;
