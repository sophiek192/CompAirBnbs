import express, { json } from 'express';
import morgan from 'morgan';
//import config from './config.json'; //assert { type: "json" }; 
import cors from 'cors';
import request from 'sync-request';
import HTTPError from 'http-errors';
import fs from 'fs';
import { authLogin, authRegister } from './auth.js';
import { createTrip, tripsList } from './trip.js';
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


app.post('/create/trip', (req, res) => {
    const { userId, numPeople, airBnbLinks, date, location } = req.body;
    res.json(createTrip(userId, numPeople, airBnbLinks, date, location));
})

app.get('/trips/list', (req, res) => {
    const userId = String(req.query.userId);
    res.json(tripsList(token, parseInt(userId)));
})

app.get('/trips/details', (req, res) => {
    const tripId = String(req.query.tripId);
    res.json(createTrip(token, parseInt(tripId)));
})

app.listen(PORT, HOST, () => {
    // DO NOT CHANGE THIS LINE
    console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});