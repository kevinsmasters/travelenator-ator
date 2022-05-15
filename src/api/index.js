import { EventNote } from '@material-ui/icons';
import axios from 'axios';
  

export const getPlacesData = async (type, sw, ne) => {
    try {
       const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
            'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
        }
      });
       return data;
    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: { lon: lng, lat: lat },
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_WHOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_WKEY
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}