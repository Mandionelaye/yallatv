import axios from 'axios';

const API_BASE_URL = 'https://v3.football.api-sports.io';

export const fetchDataApi = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params,
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'x-rapidapi-host': "v3.football.api-sports.io"
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};




// pour scorebat resumé de match

export const fetchScorebatHighlights = async () => {
  try {
    const response = await axios.get('https://www.scorebat.com/video-api/v3/');
    return response.data.response;
  } catch (error) {
    console.error('Scorebat API Error:', error);
    return null;
  }
};