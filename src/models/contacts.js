import axios from 'axios';


const extractError = (error) => {
  if (error.response) {
    const {response : {data:{message='Unable to reach server'}, status}} = error;
    return {status, message}
  } else if (error.request) {
    const {request} = error;
    return {status: 500, message: request}
  } else {
    const {message} = error;
    return {status: 500, message}
  }
}

const fetch = () => {
  return new Promise((resolve, reject) => {
    axios.get('/contacts')
    .then((response) => resolve(response.data))
    .catch((error) => reject(extractError(error)));
  });
}

const add = (contact) => {
  return new Promise((resolve, reject) => {
    axios.post('/contacts', contact)
    .then((response) => resolve(response.data))
    .catch((error) => reject(extractError(error)));
  })
}

export { fetch, add };
