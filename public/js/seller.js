// Handle add product form submission
document.getElementById('add-product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
    // Get auth token
  const token = localStorage.getItem('token');
  if (!token) {// Redirect to login if not authenticated
    M.toast({ html: 'Please login first', classes: 'red' });
    window.location.href = '/login.html';
    return;
  }
    // Get product details from form
  const product = {
    name: document.getElementById('name').value,
    slug: document.getElementById('slug').value,
    price: parseFloat(document.getElementById('price').value),
    category: document.getElementById('category').value,
    image: document.getElementById('image').value,
    description: document.getElementById('description').value
  };

  try {// Send request to add product
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    // Handle response
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add product');
    }

    M.toast({ html: 'Product added successfully!', classes: 'green' });
    // Optionally reset form or redirect
  } catch (error) {
    M.toast({ html: error.message, classes: 'red' });
  }
});