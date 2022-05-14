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
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': 'ec6d2bb011mshfb28ffd4979b16bp1ced94jsne9cfec7e9f7a'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}