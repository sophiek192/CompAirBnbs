import React, { useState, useMemo, useEffect, useRef } from 'react'
import BnbCard from "../components/BnbCard";
import {get, post} from "../helpers";
import { Container ,Box, IconButton, Button} from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import TinderCard from 'react-tinder-card'

function Tinder({ tripId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bnbs, setBnbs] = useState([])
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(bnbs.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  useEffect(() => {
    get(`/trip?tripId=${tripId}`).then(res => {
      setBnbs(res.trip.bnbs.filter(bnb => ! (bnb.leftSwipe.includes(userId)|| bnb.rightSwipe.includes(userId))))
      setCurrentIndex(bnbs.length - 1)
    })
  },[])


  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    console.log(direction);
    post('/trip/swipe',{
      userId: localStorage.getItem('userId'), 
      tripId: tripId, 
      bnbId: index,
      direction: direction
    })
    .then(res => console.log(res))
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir, index) => {
    post('/trip/swipe',{
      userId: localStorage.getItem('userId'), 
      tripId: tripId, 
      bnbId: index,
      direction: dir
    })
    if (!bnbs || canSwipe && currentIndex < bnbs.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const userId = localStorage.getItem('userId')

  return (<>
    {bnbs.length !== 0 &&
    <div style={{backgroundColor:'rgb(0,0,0,0.2)', width:'100%', height:'100%'}}>
      <Box sx={{ margin:'auto', width:'100%', height:'100%'}}>
      <div className='cardContainer'>
        {bnbs.map((bnb, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={index}
            onSwipe={(dir) => swiped(dir, index, index)}
            onCardLeftScreen={() => outOfFrame(index, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + bnb.image + ')' }}
              className='card'
            >
            <h3 style={{
              backgroundColor:'teal'}}>{bnb.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <Box sx={{display:'flex', justifyContent:'space-between', width:'330px', margin:'40px auto 0px auto',
    backgroundColor:'white', padding:'10px', borderRadius:'4px'}}>
        <Button variant="outlined" startIcon={<ArrowLeftIcon />} color="success" onClick={() => swipe('left', currentIndex)}>
          Swipe Left
        </Button>
        <Button variant="outlined" endIcon={<ArrowRightIcon />} color="error" onClick={() => swipe('right', currentIndex)}>
        Swipe Right
        </Button>
      </Box>
      </Box>
    </div>}</>
    
  );
}

export default Tinder;
