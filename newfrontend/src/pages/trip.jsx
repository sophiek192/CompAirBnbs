import React, { useState, useEffect } from "react";
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText,Select,Checkbox, Menu } from '@mui/material'

import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { get } from '../helpers'
import TripCard from "../components/tripCard";
import CreateTripForm from "../components/createTripForm"
import { useParams } from "react-router-dom";

function Trip() {
  let { tripId } = useParams()
  const [users, setUsers] = useState([])
  const [trip, setTrip] = useState({})
  const [personName, setPersonName] = React.useState([]);
  const handleClick = () => {
    
  }

    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
        },
      },
    };
  useEffect(() => {
    get(`/trip?tripId?=${tripId}`)
    .then(res => {setTrip(res.trip)})
    .then(() => {
      get('/users')
      .then(res => {setUsers(res.users)
      console.log(res)
      })
    })
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <>
    <InputLabel id="multiple-checkbox">Select People</InputLabel>
    <Select
      labelId="multiple-checkbox"
      id="demo-multiple-checkbox"
      multiple
      fullWidth
      value={personName}
      onChange={handleChange}
      input={<OutlinedInput label="Tag" />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {users.map((user,i) => (
        <MenuItem key={i} value={user.nameFirst}>
          <Checkbox checked={personName.indexOf(user.nameFirst) > -1} />
          <ListItemText primary={user.nameFirst} />
        </MenuItem>
      ))}
    </Select>
    {/* <Button onClick={handleClick}>Invite!</Button> */}
    </>
  )
}

export default Trip;