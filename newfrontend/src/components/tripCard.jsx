import React, { useState } from "react";
import {Card, Grid, CardActions, CardMedia, CardContent, Box, Button,  Container, TextField, Typography } from "@mui/material"
import {Link} from 'react-router-dom'
function TripCard({ trip }) {
  const dateString = () => {
    let startDate = new Date(trip.date[0])
    let endDate = new Date(trip.date[1])
    startDate = startDate.toDateString().split(' ').slice(0,3).join(' ')
    endDate = endDate.toDateString().split(' ').slice(0,3).join(' ')
    return `${startDate} to ${endDate}`
  }


  return (
    <>
      <Grid item xs={4}>
      <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRVjwyJzQ0jxdllxt45j7kNE6aQGA74Hizy9WGzubTOqZideIg3WFaW2SwUByIBI1QIzkod9hmwCuAIdMJKfkTMrz0bFQ"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {trip.name}
        </Typography>
        <Typography variant="body2">
          {trip.location && `${trip.location} from `}{dateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/trip/${trip.tripId}`}>More Details</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>
    </>
  )
}

export default TripCard;
