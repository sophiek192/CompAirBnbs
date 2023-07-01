import fs from 'fs';

let dataStore = {
    users: [],
    trips: [],
}


// reads from dataStore file
const save = () => {
    const jsonstr = JSON.stringify(dataStore);
    fs.writeFileSync('./database.json', jsonstr);
  };
  
// Use getData() to access the data
function getData() {
    return dataStore;
}
   
function setData(newData) {
    dataStore = newData;
    save();
  }

export { getData, setData };