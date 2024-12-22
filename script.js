// script.js
let user = null;

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const accessToken = googleUser.getAuthResponse().access_token;

  user = {
    name: profile.getName(),
    email: profile.getEmail(),
    accessToken: accessToken,
  };

  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('input-section').classList.remove('hidden');
}

function fetchLoanSuggestion() {
  const sales = document.getElementById('sales').value;
  const goods = document.getElementById('goods').value;

  if (!sales || !goods) {
    alert('Please fill out all fields.');
    return;
  }

  fetch('http://localhost:5000/api/loan-suggestion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sales, goods, accessToken: user.accessToken }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result-section').classList.remove('hidden');
      document.getElementById('suggestion').textContent = `Loan Amount: $${data.amount}, Plan: ${data.plan}`;
    })
    .catch((error) => console.error('Error fetching loan suggestion:', error));
}
