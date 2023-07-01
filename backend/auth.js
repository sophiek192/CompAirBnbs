//import validator from 'validator';
import { getData, setData } from './dataStore';

export function authRegister(email, nameFirst, nameLast) {
    const data = getData();
  //  const errorCheck = isRegisterValid(email)


  // Check that the email hasen't already been created
  for (const currUser of data.members) {
    if (currUser.email === email) {
      throw HTTPError(400, 'email entered already exists!');
    }
  }
    let id = data.users.length + 1;

    const newMember = {
        userId: id,
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
        if (currUser.email === email) {
            return {
                userId: currUser.uId,
            };
        }
    }
    
    throw HTTPError(400, 'Invalid email or password!');
}