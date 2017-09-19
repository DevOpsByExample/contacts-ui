import axios from 'axios';

const fetch = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/contacts')
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
  });
}

const add = (contact) => {
  return new Promise((resolve, reject) => {
    axios.put('http://localhost:3000/contacts', contact)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
  })
}

export { fetch, add };
