import express, { json } from 'express';
import morgan from 'morgan';
//import config from './config.json'; //assert { type: "json" }; 
import cors from 'cors';
import request from 'sync-request';
import HTTPError from 'http-errors';
import fs from 'fs';
import { authLogin, authRegister } from './auth.js';
import { createTrip, tripsList, inviteToTrip, tripDetails, tripSwipe } from './trip.js';
import { usersList } from './user.js';
import { setData } from './dataStore.js';
import errorHandler from 'middleware-http-errors';



// Set up web app
const app = express();
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());


const PORT = parseInt(process.env.PORT || 8080);
const HOST = process.env.IP || 'localhost';

if (fs.existsSync('./database.json')) {
  const dbstr = fs.readFileSync('./database.json');
  setData(JSON.parse(String(dbstr)));
}

// // Example get request
// app.get('/echo', (req, res, next) => {
//     const data = String(req.query.echo);
//     return res.json(echo(data));
//   });
  
app.use(errorHandler());

  

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    res.json(authLogin(email, password));
})

app.post('/auth/register', (req, res) => {
    const { email, password, nameFirst, nameLast} = req.body;
    res.json(authRegister(email, password, nameFirst, nameLast));
})


app.post('/trip/create', (req, res) => {
    const { name, userId, numPeople, airBnbLinks, date, location } = req.body;
    res.json(createTrip(name, userId, numPeople, airBnbLinks, date, location));
})

app.post('/trip/invite', (req, res) => {
  const { userId, tripId } = req.body;
  res.json(inviteToTrip(userId, tripId));
})

app.get('/trips', (req, res) => {
    const userId = String(req.query.userId);
    res.json(tripsList(userId));
})

app.get('/trip', (req, res) => {
  const tripId = String(req.query.tripId);
  res.json(tripDetails(tripId));
})

app.post('/trip/swipe', (req, res) => {
  const { userId, tripId, bnbId, direction } = req.body;
  res.json(tripSwipe(userId, tripId, bnbId, direction));
})

app.get('/users', (req, res) => {
  res.json(usersList());
})

app.listen(PORT, HOST, () => {
    // DO NOT CHANGE THIS LINE
    console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});