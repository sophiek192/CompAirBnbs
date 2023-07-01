import fs from 'fs';

let dataStore = {
    users: [],
    trips: [],
}


// reads from dataStore file
const save = () => {
    const jsonstr = JSON.stringify(data);
    fs.writeFileSync('./database.json', jsonstr);
  };
  
// Use getData() to access the data
function getData() {
    return dataStore;
}
  
function setData(dataStore) {
    data = dataStore;
    save();
  }

export { getData, setData };