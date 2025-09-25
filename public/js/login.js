// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
    // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {// Send login request
    const response = await fetch('/api/auth/login', {
      method: 'POST',// API endpoint for login
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    // Handle response
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    // Save token and redirect
    localStorage.setItem('token', data.token);
    M.toast({ html: 'Login successful!', classes: 'green' });
    window.location.href = '/seller.html';  // Redirect to dashboard
  } catch (error) {
    // Display error message
    M.toast({ html: error.message, classes: 'red' });
  }
});