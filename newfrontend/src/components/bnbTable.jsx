import React, { useState, useMemo, useEffect, useRef } from 'react'
import BnbCard from "../components/BnbCard";
import {get, post} from "../helpers";
import { Container ,Box, IconButton, Button, Grid, Item, Paper} from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { experimentalStyled as styled } from '@mui/material/styles';
import TinderCard from 'react-tinder-card'

function BnbTable({ tripId }) {
  const [data, setData] = useState([])
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    get(`/trip?tripId=${tripId}`).then(res => {
      const newData = [['name', 'total cost','star rating', 'wifi','bedrooms','beds','bathrooms','left swipes','right swipes']]
      for (let bnb of res.trip.bnbs) {
        let newRow = [bnb.name, bnb.totalCost,bnb.starRating, bnb.wifi ? 'WIFI' : 'NO WIFI',bnb.bedrooms,bnb.beds,bnb.bathrooms,bnb.leftSwipe.length,bnb.rightSwipe.length]
        newData.push(newRow)
      }
      console.log(newData)
      setData(newData);
    })
  },[])

  const userId = localStorage.getItem('userId')

  return (
    <Grid container spacing={2} columns={{}} sx={{position:'absolute', zIndex:'-2'}}>
      {data.map((row,i) => row.map((element,index) => (
        <Grid item key={index}>
          <Item>{element}</Item>
        </Grid>
      )))}
      
    </Grid>
    
  );
}

export default BnbTable;
