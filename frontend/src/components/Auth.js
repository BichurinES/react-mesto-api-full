import { BASE_URL } from '../utils/constants';

export function register({password, email}) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({password, email}),
    credentials: 'include',
  })
    .then((res) => {
      return res.json();
    })
}

export function login({password, email}) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({password, email}),
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }

      return res;
    })
}
