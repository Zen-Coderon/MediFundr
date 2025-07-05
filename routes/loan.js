const express = require('express');
const router = express.Router();
const calculateEMI = require('../utils/emiCalculator');
const fetchRate = require('../utils/fetchExchangeRate');

router.post('/calc', async (req, res) => {
  try {
    let { amount, rate, tenure, currency, downPayment } = req.body;
    if (!amount || !rate || !tenure) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    amount = parseFloat(amount) - parseFloat(downPayment || 0);

    if (currency === 'USD') {
      const inrRate = await fetchRate();
      amount *= inrRate;
    }

    const result = calculateEMI(amount, rate, tenure);
    res.json({ ...result, currency: 'INR' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
