export const BASE_URL = 'https://auth.nomoreparties.co';

export function register({password, email}) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    try {
      return response.json();
    } catch(err) {
      return err;
    }
  })
  .then((res) => {return res})
}

export function login({password, email}) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    try {
      return response.json();
    } catch(err) {
      return err;
    }
  })
  .then((res) => {return res})
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  })
  .then((response) => {
    try {
      return response.json();
    } catch(err) {
      return err;
    }
  })
  .then((res) => {return res})
}
