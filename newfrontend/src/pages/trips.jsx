import React, { useState, useEffect } from "react";
import { Button, Box, Grid, Typography, Modal } from '@mui/material'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { get } from '../helpers'
import TripCard from "../components/tripCard";
import CreateTripForm from "../components/createTripForm"

function Trips() {
  const [open, setOpen] = React.useState(false);
  const [trips, setTrips] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    get(`/trips?userId=${localStorage.getItem('userId')}`)
    .then((res) => {
      setTrips(res.trips)
    })
  }, [])




  return (
    <>
      <Box sx={{margin:'30px 150px'}}>
        <Box sx={{margin: '40px auto 30px auto', display:'flex', justifyContent:'space-between'}}>
          <Typography sx={{fontFamily:'Playfair Display', fontSize:'40px'}} variant='h1'>My Trips</Typography>
          <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen} >
            Create Trip
          </Button>
        </Box>
      <Grid container spacing={8}>
        {trips.map((trip,i) => <TripCard trip={trip}/>)}
      </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <CreateTripForm />
        </Box>
      </Modal>
  );
    </>
  )
}

export default Trips;
