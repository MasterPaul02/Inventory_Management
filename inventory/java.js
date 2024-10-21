
function updateProductTable() {
  const productTableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

  existingProducts.forEach((product, index) => {
      const row = productTableBody.insertRow();
      row.insertCell(0).innerHTML = `<img class="product-image" src="${product.image || 'https://via.placeholder.com/50'}" alt="${product.name}">`;
      row.insertCell(1).textContent = product.name;
      row.insertCell(2).textContent = product.code;
      row.insertCell(3).textContent = `$${product.price.toFixed(2)}`;
      row.insertCell(4).innerHTML = `
          <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
      `;
  });
}

// Function to delete a product
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1); // Remove product from the array
  localStorage.setItem('products', JSON.stringify(products)); // Update local storage
  location.reload(); // Refresh the page
}

// Function to edit a product (You can implement this as needed)
function editProduct(index) {
  alert('Edit functionality not implemented yet.'); // Placeholder for edit functionality
}

// Load additional products from local storage
updateProductTable();
// Get all buttons with the modal target
const openModalButtons = document.querySelectorAll('[data-modal-target]');
// Get all close buttons inside modals
const closeModalButtons = document.querySelectorAll('[data-close-button]');
// Get the overlay element
const overlay = document.getElementById('overlay');

// Add click event to open modal buttons
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);  // Open the modal
  });
});

// Close the modal when the overlay is clicked
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);  // Close each modal
  });
});

// Add click event to close buttons inside modals
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);  // Close the modal
  });
});

// Function to open the modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');  // Add the 'active' class to show the modal
  overlay.classList.add('active');  // Show the overlay
}

// Function to close the modal
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');  // Remove the 'active' class to hide the modal
  overlay.classList.remove('active');  // Hide the overlay
}
