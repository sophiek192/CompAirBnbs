import React, { useState, useEffect } from "react";
import { Button, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText,Select,Checkbox, Menu } from '@mui/material'

import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { get, post } from '../helpers'
import TripCard from "../components/tripCard";
import CreateTripForm from "../components/createTripForm"
import { useParams } from "react-router-dom";

function Trip() {
  let { tripId } = useParams()
  const [users, setUsers] = useState([])
  const [trip, setTrip] = useState({})
  const [nonAttendees, setNonAttendees] = useState([])
  const [inviteIds, setInviteIds] = useState([])
  const [personName, setPersonName] = React.useState([]);
  const handleClick = () => {
    console.log(inviteIds)
    inviteIds.forEach((inviteId) => {
      console.log(inviteId)
      post('/trip/invite', {
        userId: inviteId,
        tripId: tripId
      })
    })
  }
  const handleCheck = (e, i) => {
    if (e.target.checked) {
      setInviteIds([...inviteIds, nonAttendees[i].userId])
    } else {
      const newInviteIds = inviteIds
      newInviteIds.splice(newInviteIds.indexOf(nonAttendees[i].userId), 1)
      setInviteIds(newInviteIds)
    }}

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
  useEffect(() => {
    const trip = get(`/trip?tripId=${tripId}`)
    .then(res => {
      setTrip(res.trip)
      return res.trip
    })
    const users = get('/users')
    .then(res => {
      setUsers(res.users)
      return res.users
    })
    Promise.all([trip, users]).then((res) => {
      const trip = res[0]
      const users = res[1]
      setNonAttendees(users.filter(user => !trip.attendees.map(x => x.userId).includes(user.userId)))
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
      {nonAttendees.map((attendee,i) => (
      <MenuItem key={i} value={attendee.nameFirst}  >
        <Checkbox checked={personName.indexOf(attendee.nameFirst) > -1}
        onChange={(e) => handleCheck(e, i)}
         />
        <ListItemText primary={attendee.nameFirst} />
      </MenuItem>))}
    </Select>
    <Button onClick={handleClick}>Invite!</Button>
    </>
  )
}

export default Trip;