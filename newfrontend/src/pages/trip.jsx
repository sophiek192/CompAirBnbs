import React, { useState, useEffect } from "react";
import { Button, Box, Grid, Typography, Modal } from '@mui/material'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { get } from '../helpers'
import TripCard from "../components/tripCard";
import CreateTripForm from "../components/createTripForm"

function Trip() {
//   const handleClick = () => {
    
//   }

//   const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
  useEffect(() => {
    
  }, [])
// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];


//   const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };
  return (
    <>
    {/* <InputLabel id="multiple-checkbox">Select People</InputLabel>
    <Select
      labelId="multiple-checkbox"
      id="demo-multiple-checkbox"
      multiple
      value={personName}
      onChange={handleChange}
      input={<OutlinedInput label="Tag" />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {names.map((name) => (
        <MenuItem key={name} value={name}>
          <Checkbox checked={personName.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select> */}
    <Button onClick={handleClick}>Invite!</Button>
    </>
  )
}

export default Trip;