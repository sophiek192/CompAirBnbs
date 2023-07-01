import React, { useState, useMemo, useRef } from 'react'
import BnbCard from "../components/BnbCard";
import { Container ,Box, IconButton, Button} from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import TinderCard from 'react-tinder-card'

function Tinder() {
  const cards = [
      {
          image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
          color: '#55ccff'
      },
      {
          image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
          color: '#e8e8e8'
      },
      {
          image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
          color: '#0a043c'
      },
      {
          image: 'https://img.icons8.com/color/452/GeeksforGeeks.png',
          color: 'black'
      }
  ];
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1)
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(cards.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }


  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
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

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cards.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }


  return (
    <div style={{backgroundColor:'blue', width:'100%', height:'100%'}}>
      <Box sx={{ margin:'auto', width:'100%', height:'100%'}}>
      <div className='cardContainer'>
        {cards.map((card, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={index}
            onSwipe={(dir) => swiped(dir, index, index)}
            onCardLeftScreen={() => outOfFrame(index, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + card.image + ')' }}
              className='card'
            >
              <h3>{card.color}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <Box sx={{display:'flex', justifyContent:'space-between', width:'350px', margin:'40px auto 0px auto'}}>
        <Button variant="outlined" startIcon={<ArrowLeftIcon />} color="success" onClick={() => swipe('left')}>
          Swipe Left
        </Button>
        <Button variant="outlined" endIcon={<ArrowRightIcon />} color="error" onClick={() => swipe('right')}>
        Swipe Right
        </Button>
      </Box>
      </Box>
    </div>
  );
}

export default Tinder;
