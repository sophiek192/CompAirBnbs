import React, { useState, useMemo, useEffect, useRef } from 'react'
import BnbCard from "../components/BnbCard";
import {get, post} from "../helpers";
import { Container ,Box, IconButton, Button} from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import TinderCard from 'react-tinder-card'

function BnbTable({ tripId }) {
  const [data, setData] = useState([])

  useEffect(() => {
    get(`/trip?tripId=${tripId}`).then(res => {
      const newData = [['name', 'total cost','star rating', 'wifi','bedrooms','beds','bathrooms','left swipes','right swipes']]
      for (let bnb of res.trip.bnbs) {
        let newRow = [bnb.name, bnb.totalCost,bnb.starRating, bnb.wifi,bnb.bedrooms,bnb.beds,bnb.bathrooms,bnb.leftSwipes.length ,bnb.rightSwipes.length]
        newData.push(row)
      }
      setData(newData);
    })
  },[])

  const userId = localStorage.getItem('userId')

  return (<>
    </>
    
  );
}

export default BnbTable;
