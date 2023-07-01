import { getData, setData } from './dataStore.js';


export function createTrip (userId, firstName, lastName, numPeople, airBnbLinks, date, location) {
    const data = getData();
    const id = data.trips.length + 1;

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

}