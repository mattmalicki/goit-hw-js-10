import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_adGnUxbWYcxTxUSSgRxrxWJV9G0w4frkcy3lrXvrHaFFioNggB6zhcIsWKnL74ip';

async function fetchBreeds() {
  try {
    return await axios
      .get(`https://api.thecatapi.com/v1/breeds`)
      .then(function (response) {
        return response.data;
      });
  } catch (error) {
    onError(error);
  }
}

async function fetchCatByBreed(breedId) {
  try {
    return await axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(function (response) {
        return response.data[0];
      });
  } catch (error) {
    onError(error);
  }
}

function onError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export { fetchBreeds, fetchCatByBreed };
