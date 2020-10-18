import React, {useEffect} from 'react';
import {getWeather} from "./store/actions/weather.actions"
import getLocation from "../../utils/getLocation";
import {useDispatch, useSelector} from "react-redux";

const Weather = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        getLocation().then((position)=>{
            dispatch(getLocation(position.coords.latitude,     
                position.coords.longitude));
        })
    },[]);
    const weather= useSelector((state)=>state.home.weather.weather);
    return (
       <div>
             {weather!==-1&& "Weather"}
            {console.log(weather)}
        </div>
    );
};

export default Weather;