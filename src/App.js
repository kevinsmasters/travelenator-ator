import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData, getWeatherData } from './api'
const App =()=> {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({}); //{lat: 29.9012, lng: -81.3124}
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(( {coords: {latitude, longitude}}) => {
            setCoordinates({ lat: latitude, lng: longitude})
        })
    }, []);

    useEffect(()=> {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);
            //console.log("coords, bounds:", coordinates, bounds)

        getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data));

        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data)=> {
                //console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            });
        }
        
        
    }, [type, bounds]);

    console.log("places: ", places);
    console.log("filtered places: ",filteredPlaces);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid 
                container 
                spacing={3}
                style={{ width: '100%'}}
            >
                <Grid 
                    item 
                    xs={12}
                    md={4}    
                >
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid 
                    item 
                    xs={12}
                    md={8}    
                >
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />   
                </Grid>
            </Grid>
        </>
    )
}

export default App;