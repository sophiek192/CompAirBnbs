import { getData, setData } from './dataStore.js';

export function usersList() {
    const data = getData();
    return {
      users: data.users
    }
}
