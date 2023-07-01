import React, { useState } from "react";
import {Card, Grid, CardActions, CardMedia, CardContent, Box, Button,  Container, Link, TextField, Typography } from "@mui/material"
function TripCard() {
  return (
    <>
      <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRVjwyJzQ0jxdllxt45j7kNE6aQGA74Hizy9WGzubTOqZideIg3WFaW2SwUByIBI1QIzkod9hmwCuAIdMJKfkTMrz0bFQ"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>
    </>
  )
}

export default TripCard;
