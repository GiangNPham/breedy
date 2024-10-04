import axios from 'axios';

export const listAllBreedAPI = async () => {
  try {
    const res = await axios.get('https://dog.ceo/api/breeds/list/all');
    return res.data;
  } catch (err) {}
};

export const getSingleBreedAPI = async (breed, imageNum) => {
  try {
    const res = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random/${imageNum}`
    );
    return res.data;
  } catch (err) {}
};
