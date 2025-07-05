const axios = require('axios');

async function fetchRate() {
  const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
  return response.data.rates.INR;
}

module.exports = fetchRate;
