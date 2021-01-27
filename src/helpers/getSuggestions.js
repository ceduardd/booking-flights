import axios from 'axios';

export const getSuggestions = async searchTerm => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_EDESTINOS_API}/?query=${searchTerm}&locale=en_US`
  );

  // Format payload
  const airports = data.result.filter(data => data._type === 'airport');

  const suggestions = airports.map(airport => ({
    code: airport._source.code,
    name: airport._source.suggestion,
    city: airport._source.cityName,
    country: airport._source.countryName,
  }));

  return suggestions;
};
