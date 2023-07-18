
import { useState,useEffect } from 'react';
import axios from 'axios';

const Weather = ({country}) =>{

    const api_key = process.env.REACT_APP_API_KEY

    const [countryWeather,setCountryWeather] = useState({})

  

    const params = {
        access_key: api_key,
        query:country
    }



    useEffect(()=>{
        axios.get('http://api.weatherstack.com/current',{params})
            .then((response) =>{
                console.log(response.data)
            })


    },[])


    return(
        <div>
            <h1>The api key doesnt work...</h1>



        </div>
    )






}

export default Weather