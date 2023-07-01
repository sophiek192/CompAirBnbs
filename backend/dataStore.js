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
  
  // Use set(newData) to pass in the entire data object, with modifications made
  // - Only needs to be used if you replace the data store entirely
  // - Javascript uses pass-by-reference for objects... read more here: https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference
  // Hint: this function might be useful to edit in iteration 2
  function setData(dataStore) {
    data = dataStore;
    save();
  }

export { getData, setData };