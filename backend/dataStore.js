import fs from 'fs';

let data = {
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
    return data;
}
  
function setData(newData) {
    data = newData;
    save();
  }

export { getData, setData };