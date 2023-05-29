import axios from 'axios';

export const fetchData = async (name) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}