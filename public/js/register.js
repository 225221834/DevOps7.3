
// Handle registration form submission
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {// Send registration data to server
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    // Save token and redirect to login
    localStorage.setItem('token', data.token);
    M.toast({ html: 'Registration successful! Please log in.', classes: 'green' });
    setTimeout(() => window.location.href = '/login.html', 1000);
  } catch (error) {
    M.toast({ html: error.message, classes: 'red' });
  }
});