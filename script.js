const API_KEY = '256f8010472d22b6b9c3fdc4'; // Replace with your API key
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('error').textContent = 'Please enter a valid amount.';
    return;
  }

  if (fromCurrency === toCurrency) {
    document.getElementById('result').textContent = `Converted Amount: ${amount} ${toCurrency}`;
    document.getElementById('error').textContent = '';
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
    const data = await response.json();

    if (response.ok) {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      document.getElementById('result').textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
      document.getElementById('error').textContent = '';
    } else {
      document.getElementById('result').textContent = '';
      document.getElementById('error').textContent = 'Conversion failed. Please try again.';
    }
  } catch (error) {
    document.getElementById('result').textContent = '';
    document.getElementById('error').textContent = 'Error connecting to the server.';
  }
}
