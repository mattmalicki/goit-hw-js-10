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
    console.log(error);
  }
}

async function fetchCatByBreed(breedId) {
  try {
    return await axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(function (response) {
        console.log(response);
        return response.data[0];
      });
  } catch (error) {
    console.log(error);
  }
}

export { fetchBreeds, fetchCatByBreed };
