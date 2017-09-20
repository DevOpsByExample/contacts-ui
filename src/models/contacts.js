import axios from 'axios';

const fetch = () => {
  return new Promise((resolve, reject) => {
    axios.get('/contacts')
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
  });
}

const add = (contact) => {
  return new Promise((resolve, reject) => {
    axios.put('/contacts', contact)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
  })
}

export { fetch, add };
