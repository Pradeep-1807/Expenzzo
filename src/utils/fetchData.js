import axios from 'axios';

// const axios = require('axios');

const BASE_URL = 'https://currency-converter-pro1.p.rapidapi.com'



const options = {
//   method: 'GET',
//   url: BASE_URL,
//   params: {
//     from: 'USD',
//     to: 'EUR',
//     amount: '100'
//   },
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_CURRENCY_COVERTER_API_KEY ,
    'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
  }
};


export const fetchData = async (url) =>{
        try{
            const {data} = await axios.get(`${BASE_URL}/${url}`,options)
            return data
        }
        catch (error) {
            console.error(error);
        }
}

	// const response = await axios.request(options);
	// console.log(response.data);