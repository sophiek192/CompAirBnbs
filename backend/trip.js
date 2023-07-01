import { getData, setData } from './dataStore.js';
import HTTPError from 'http-errors';


export function createTrip(name, userId, numPeople, airBnbLinks, date, location) {
    const data = getData();
    const id = data.trips.length + 1;

    const newTrip = {
        name: name,
        tripId: id,
        numPpl: numPeople,
        date: date,
        organisers: [userId],
        attendees: [{
            userId,
            notifications:[]
          }],
        airBnbLinks,
        location,
        bnbs: [],
    }

    data.trips.push(newTrip),
    setData(data);
    return {
        tripId: id
    };
}

export function tripsList(userId) {
    let returnArray = [];
    if (userId == '') {
        throw HTTPError(400, 'User is not valid')
    }

    const data = getData();
    for (let trip of data.trips) {
        if (trip.attendees.map(attendee => parseInt(attendee.userId)).includes(userId)) {
            returnArray.push({
                name: trip.name,
                tripId: trip.tripId,
                numPeople: trip.numPeople,
                location: trip.location,
                date: trip.date
            });
        }
    }
    console.log(returnArray)
    return { 
        trips: returnArray
    }
}

export function tripDetails(tripId) {
    if (tripId == '') {
        throw HTTPError(400, 'Trip is not valid');
    }
    
    const index = data.users.findIndex(x => x.tripId === tripId);
    const tripIdIndex = data.users[index].sessions.indexOf(tripId);
    data.users[index].sessions.splice(tripIdIndex, 1);    
    setData(data);
    return {};
}

export function inviteToTrip(userId, tripId) {
    if (tripId == '') {
        throw HTTPError(400, 'Trip is not valid');
    }
    
    const user = data.users.find(x => x.userId === userId);
    const trip = data.users.find(x => x.tripId === tripId);

    // user already in trip
    if (user.attending.includes(tripId)) {
      return;
    }

    user.attending.push(tripId)
    trip.attendees.push({
        "userId": userId,
        "notifications": trip.bnbs
    })
  
    setData(data);
    return {};
}