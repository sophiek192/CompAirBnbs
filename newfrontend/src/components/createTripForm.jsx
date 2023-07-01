import React, { useState } from "react";
import { Stack, Box, Button,  Container, Link, TextField, Typography } from "@mui/material"
import { post } from "../helpers"
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';

function CreateTripForm() {
  const [numPeople, setNumPeople] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [links, setLinks] = useState([])

  const createTripFormStyle = {
    height:"500px", width:"800px", background: 'rgba(256,256,256,0.7)',
    border:"1px grey", borderRadius:"20px", marginTop:"100px",
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  }
  const handleSubmit = () => {
    // post('/trip/create', {
    //   numPeople: numPeople,
    //   location: location,
    //   links: links,
    //   date: [startDate, endDate]
    // })
    window.open("/","_self")
  }

  const handleAddLink = () => {
    if (!link) {
      return
    }
    setLinks([...links, link]);
    console.log(links);
    setLink('');
  }

  return (
    <>
      <Box sx={createTripFormStyle}>
        <Container sx={{width: '80%', display:'flex', flexDirection:'column',justifyContent:'space-between', height:'60%'}}>
          <Typography sx={{margin: '0', fontSize:'25px'}} className="Title" variant='p'>Create a new Trip!</Typography>
          <TextField
            sx={{margin: '0 auto', fontSize:'25px'}}
            required fullWidth
            label="Expected No. People"
            onChange={(e) => {setNumPeople(e.target.value)}}
            margin="dense"
            type="number"
          />
          <TextField 
            sx={{margin: '0 auto', fontSize:'25px'}}
            required fullWidth    
            label="Location" 
            onChange={(e) => {setLocation(e.target.value)}} 
            margin="dense"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <Box sx = {{display: 'flex'}}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="DD/MM/YYYY"
                  value={startDate}
                  onChange={(value) => {
                    setStartDate(value)
                  }}
                  renderInput={(params) => <TextField name="start-date-input" {...params} />}
                />
                <Typography sx = {{m: 2}}> to </Typography>
                <MobileDatePicker
                  label="End Date"
                  inputFormat="DD/MM/YYYY"
                  value={endDate}
                  onChange={(value) => {
                    setEndDate(value)
                  }}
                  renderInput={(params) => <TextField name="end-date-input" {...params} />}
                />
              </Box>
              </Stack>
          </LocalizationProvider>
          <Box sx={{display:'flex'}}>
            <TextField 
              sx={{margin: '0 auto', fontSize:'25px'}}
              required fullWidth
              value={link}
              label="Link to Airbnb Listing" 
              onChange={(e) => {setLink(e.target.value)}} 
              margin="dense"
            />
            <Button
              color="primary"
              type="submit"
              onClick={handleAddLink}
              >
              Add Listing
            </Button>
          </Box>

          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Typography sx={{margin: '0', fontSize:'18px'}} className="Title" variant='p'>Added Airbnbs:</Typography>
            {links.map((link,i) => 
            (<Typography sx={{margin: '0', fontSize:'15px'}} className="Title" variant='p'>{link}</Typography>)
            )}
          </Box>
          <Button
            color="primary"
            type="submit"
            name="submit"
            onClick={handleSubmit}
            >
            Submit
          </Button>
        </Container>
      </Box>
    </>
  )
}

export default CreateTripForm;