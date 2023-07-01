import validator from 'validator';
import { getData, setData } from './dataStore.js';
//import * as config from './config.json';
import HTTPError from 'http-errors';

export function authRegister(email, password, nameFirst, nameLast) {
    const data = getData();
    //  const errorCheck = isRegisterValid(email)


    //Check that the email hasen't already been created
    for (const currUser of data.users) {
        if (currUser.email === email) {
            console.log('email entered already exists!');
            throw HTTPError(400, 'email entered already exists!');
        }
    }


    // const errorCheck = isRegisterValid(email, password, nameFirst, nameLast);
    // if (errorCheck.isError) {
    //     console.log(errorCheck.error);
    //     throw HTTPError(400, errorCheck.error);
    // }

    const id = data.users.length + 1;
    const newMember = {
        userId: id,
        password: password,
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

    // Error: Invalid email
    if (!data.users.some(x => x.email === email) || email === '') {
        throw HTTPError(400, 'Invalid Email');
    }
    // Retrieve user information
    const user = data.users.find(x => x.email === email);

    // Error: Invalid password
    if (user.password !== password) {
        throw HTTPError(400, 'Invalid Password');
    }

    for (const currUser of data.users) {
        if (currUser.email === email && currUser.password == password) {
            return {
                userId: currUser.uId,
            };
        }
    }
    throw HTTPError(400, 'Invalid email or password!');
}


// function isRegisterValid(email, password) {
//     const errorCheck = {
//       isError: false,
//       error: ''
//     };
// function isRegisterValid(email, password, nameFirst, nameLast) {
//     const errorCheck = {
//       isError: false,
//       error: ''
//     };
  
//     if (!(validator.isEmail(email))) {
//         errorCheck.isError = true;
//         errorCheck.error = 'invalid email!';
//     } else if (password.length < 6) {
//         errorCheck.isError = true;
//         errorCheck.error = 'password too short!';
//     } else if (nameFirst.length < 1) {
//         errorCheck.isError = true;
//         errorCheck.error = 'invalid first name length!';
//     } else if (nameLast.length < 1) {
//         errorCheck.isError = true;
//         errorCheck.error = 'invalid last name length!';
//     }
  
//     return errorCheck;
//   }
//}

