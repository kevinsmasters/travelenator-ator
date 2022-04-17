import { EventNote } from '@material-ui/icons';
import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

  

export const getPlacesData = async (sw, ne) => {
    try {
       const { data: { data } } = await axios.get(URL, {
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