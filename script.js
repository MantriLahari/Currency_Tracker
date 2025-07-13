const baseSelect = document.getElementById('base');
const targetSelect = document.getElementById('target');
const resultDiv = document.getElementById('result');
const getRateBtn = document.getElementById('getRate');

// Replace with your actual API Key
const API_KEY = 'IGep2HNas2pc2nzGTbwFoX8AQ0R1JtTR';
const API_URL = 'https://api.apilayer.com/fixer';

// Load currency options
const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

function populateDropdowns() {
  currencies.forEach(currency => {
    const option1 = new Option(currency, currency);
    const option2 = new Option(currency, currency);
    baseSelect.appendChild(option1);
    targetSelect.appendChild(option2);
  });
  baseSelect.value = 'USD';
  targetSelect.value = 'INR';
}

async function getExchangeRate() {
  const base = baseSelect.value;
  const target = targetSelect.value;

  const response = await fetch(`${API_URL}/latest?base=${base}&symbols=${target}`, {
    method: 'GET',
    headers: {
      'apikey': API_KEY
    }
  });

  const data = await response.json();

  if (data.success) {
    const rate = data.rates[target];
    resultDiv.textContent = `1 ${base} = ${rate} ${target}`;
  } else {
    resultDiv.textContent = 'Error fetching data';
  }
}

getRateBtn.addEventListener('click', getExchangeRate);

// Initialize
populateDropdowns();
