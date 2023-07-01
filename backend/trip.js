import { getData, setData } from './dataStore.js';


export function createTrip (userId, firstName, lastName, numPeople, airBnbLinks, date, location) {
    const data = getData();
    const id = data.trips.length + 1;

    // Testing input
    if (lastName === undefined || firstName === undefined || airBnbLinks === undefined) {
        throw HTTPError(400, 'Not enough input');
    }

    // Testing empty names
    if (nameFirst.length === 0 || nameLast.length === 0) {
        throw HTTPError(400, 'Name not valid');
    }

    const newTrip = {
        tripId: id,
        numPpl: numPeople,
        date,
        oragnisers: [{
            userId,
            firstName,
            lastName }],
        
        attendees: [{
            userId,
            firstName,
            lastName }],
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
    for (trips of data.trips) {
        if (trips.airbnbLinks.userId === userId) {
            returnArray.push({
                tripsId: trips.id,
                numPeople: trips.attendees.length,
                location: trips.location
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
    
    const index = data.users.findIndex(x => x.tripId === tripId);
    const tripIdIndex = data.users[index].sessions.indexOf(tripId);
    data.users[index].sessions.splice(tripIdIndex, 1);    
    setData(data);
    return {};
}