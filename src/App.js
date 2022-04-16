import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
//import Map from './components/Map/Map';
import MyMap from './components/myMap';
import './styles.css';

const App =()=> {

    const mapIsReadyCallback = (map) => {
        console.log(map);
    };

    return (
        <>
            <CssBaseline />
            <Header />
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
                    <List />
                </Grid>
                <Grid 
                    item 
                    xs={12}
                    md={8}    
                >
                    {/* <Map />    */}
                    <div id="mapBox">
                        <MyMap mapIsReadyCallback={mapIsReadyCallback}/>
                    </div>
                    
                </Grid>
            </Grid>
        </>
    )
}

export default App;