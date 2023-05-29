// useFetchData.js
import { useState, useEffect } from 'react';
import { fetchData } from './data.js';

export const useFetchData = (name) => {
  const [data, setData] = useState(null);

  useEffect(() => {
      const getData = async () => {
      const response = await fetchData(name);
      setData(response);
    };

    getData();
  }, [name]);

  return data;
};
