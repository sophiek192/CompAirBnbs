import React, { useState, useEffect } from "react";
import { Box,Button, Menu, MenuItem, StyledMenu, IconButton, Typography} from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { get, post } from '../helpers'
import { useParams } from "react-router-dom";
import BnbTable from "../components/bnbTable";
import Tinder from "../components/tinder";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Trip() {
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
  let { tripId } = useParams()
  const [users, setUsers] = useState([])
  const [trip, setTrip] = useState({})
  const [nonAttendees, setNonAttendees] = useState([])
  const [inviteIds, setInviteIds] = useState([])
  const [personName, setPersonName] = React.useState([]);
  const handleInvite = (user) => {
    console.log(user)
    post('/trip/invite', {
      userId: user.userId,
      tripId: tripId
    })
    .then(() => {
      const copy = nonAttendees;
      copy[copy.indexOf(user)] = {...user, invited:true}
      setNonAttendees(copy)
    })
  }

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
      setNonAttendees(users
        .filter(user => !trip.attendees.includes(user.userId))
        .map(user => {return {...user, invited:false}}))
    })
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const InviteButton = (<><Button
    id="demo-customized-button"
    aria-controls={open ? 'demo-customized-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    variant="contained"
    disableElevation
    onClick={handleClick}
    sx={{marginLeft:'20px'}}
    endIcon={<KeyboardArrowDownIcon />}
    >
      Invite
    </Button>
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {nonAttendees.map(x => 
      (<MenuItem onClick={() => handleInvite(x)} disableRipple>
        <Box sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
        {x.nameFirst}
        <IconButton  size="small" >
          {x.invited ? <CheckCircleIcon /> : <SendIcon /> }
        </IconButton>
        </Box>
      </MenuItem>
      )
    )}
    </StyledMenu></>)

  const dateString = () => {
    if (!trip.date) {
      return ''
    }
    let startDate = new Date(trip.date[0])
    let endDate = new Date(trip.date[1])
    startDate = startDate.toDateString().split(' ').slice(0,3).join(' ')
    endDate = endDate.toDateString().split(' ').slice(0,3).join(' ')
    return `${startDate} to ${endDate}`
  }

  
  
  return (
    <>
      <Box sx= {{margin:'30px 60px'}}>
      <Box>
        <Typography sx={{ fontColor:'black', fontFamily:'Playfair Display', fontSize:'50px', textDecoration:'underline', textDecorationThickness:'2px', textUnderlineOffset:'3px', }} variant='h2'>{trip.name}</Typography>
        <Box sx= {{ display:'flex', }}>
        <Typography sx={{ fontColor:'#5A5A5A', fontFamily:'Playfair Display', fontSize:'20px'}}>{trip.location && `${trip.location} from `}{dateString()}</Typography>
        {InviteButton}
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', margin:'auto'}}>
        <Tinder tripId={tripId}/>
        <BnbTable tripId={tripId}/>
      </Box>
      </Box>
    </>
  )
}

export default Trip;