import validator from 'validator';
import { getData, setData } from './dataStore.js';
//import * as config from './config.json';

export function authRegister(email, password, nameFirst, nameLast) {
    const data = getData();

    // Testing input
    if (nameLast === undefined) {
        throw HTTPError(400, 'Not enough input');
    }

    // Testing valid email
    if (validator.isEmail(email) === false) {
        throw HTTPError(400, 'Email invalid');
    }

    // Testing unique email
    for (const user of data.users) {
        if (user.email === email) {
        throw HTTPError(400, 'This email has already been registered');
        }
    }

    // Testing empty names
    if (nameFirst.length === 0 || nameLast.length === 0) {
        throw HTTPError(400, 'Name not valid');
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
    
}