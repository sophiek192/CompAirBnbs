import validator from 'validator';
import { getData, setData } from '../dataStore.js';
//import * as config from './config.json';

export function authRegister(email, password, nameFirst, nameLast) {
    const data = getData();
    //  const errorCheck = isRegisterValid(email)


    //Check that the email hasen't already been created
    for (const currUser of data.members) {
        if (currUser.email === email) {
       // throw HTTPError(400, 'email entered already exists!');
            console.log('email entered already exists!');
        }
    }


    const errorCheck = isRegisterValid(email, password, nameFirst, nameLast);
    if (errorCheck.isError) {
       // throw HTTPError(400, errorCheck.error);
       console.log(errorcheck.error);
    }


    const id = data.users.length + 1;

    const newMember = {
        userId: id,
        pasword,
        nameFirst: nameFirst,
        nameLast: nameLast,
        email: email,
        organiser: [],
        attending: []
    }

    data.users.push(newMember);
    setData(data);

    return {
        userId: id
    };
}

export function authLogin(email) {
    const data = getData();

    for (const currUser of data.users) {
        if (currUser.email === email && currUser.password == password) {
            return {
                userId: currUser.uId,
            };
        }
    }
    
  //  throw HTTPError(400, 'Invalid email or password!');
}


function isRegisterValid(email, password) {
    const errorCheck = {
      isError: false,
      error: ''
    };
  
    if (!(validator.isEmail(email))) {
        errorCheck.isError = true;
        errorCheck.error = 'invalid email!';
    } else if (password.length < 6) {
        errorCheck.isError = true;
        errorCheck.error = 'password too short!';
    } else if (nameFirst.length < 1 || nameFirst.length > 50) {
        errorCheck.isError = true;
        errorCheck.error = 'invalid name length!';
    } else if (nameLast.length < 1 || nameLast.length > 50) {
        errorCheck.isError = true;
        errorCheck.error = 'invalid name length!';
    }
  
    return errorCheck;
  }
  