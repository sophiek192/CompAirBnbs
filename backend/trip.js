import { getData, setData } from './dataStore.js';
import HTTPError from 'http-errors';


export function createTrip(name, userId, numPeople, airBnbLinks, date, location) {
    const data = getData();
    const id = data.trips.length + 1;

    const newTrip = {
        name: name,
        tripId: String(id),
        numPpl: numPeople,
        date: date,
        organisers: [userId],
        attendees: [userId],
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
        if (trip.attendees.includes(userId)) {
            returnArray.push({
                name: trip.name,
                tripId: trip.tripId,
                numPeople: trip.numPeople,
                location: trip.location,
                date: trip.date
            });
        }
    }
    return { 
        trips: returnArray
    }
}

export function tripDetails(tripId) {
    if (tripId == '') {
        throw HTTPError(400, 'Trip is not valid');
    }
    const data = getData();
    const trip = data.trips.find(x => x.tripId === tripId);
    return {trip: trip};
}

export function inviteToTrip(userId, tripId) {
    if (tripId == '') {
        throw HTTPError(400, 'Trip is not valid');
    }
    const data = getData();
    const user = data.users.find(x => x.userId === userId);
    const trip = data.trips.find(x => x.tripId === tripId);

    // user already in trip
    console.log(user, trip)
    if (user.attending.includes(tripId)) {
      return { message: 'success' };
    }
    user.attending.push(tripId)
    trip.attendees.push(userId)
  
    setData(data);
    return {message: 'success'};
}

export function tripSwipe(userId, tripId, bnbId, direction) {
  const data = getData();
  const trip = data.trips.find(x => x.tripId === tripId);
  const bnb = trip.bnbs[bnbId]

  if (bnb.leftSwipe.includes(userId) || bnb.rightSwipe.includes(userId)){
    return { message: 'success'};
  }
  if (direction === 'left') {
    bnb.leftSwipe.push(userId)
  } else {
    bnb.rightSwipe.push(userId)
  }

  setData(data);
  return { message: 'success'};
}