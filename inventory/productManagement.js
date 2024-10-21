// Product class
class Product {
    constructor(name, code, price, image) {
        this.name = name;
        this.code = code;
        this.price = price;
        this.image = image;
    }
}

// Retrieve products from local storage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Save products to local storage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Add product
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const code = document.getElementById('productCode').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        const newProduct = new Product(name, code, price, reader.result);
        const products = getProducts();
        products.push(newProduct);
        saveProducts(products);
        alert('Product added successfully!');
        window.location.href = 'view-products.html'; // Redirect to view products page
    };

    if (image) {
        reader.readAsDataURL(image);
    } else {
        const newProduct = new Product(name, code, price, null);
        const products = getProducts();
        products.push(newProduct);
        saveProducts(products);
        alert('Product added successfully!');
        window.location.href = 'view-products.html'; // Redirect to view products page
    }

    document.getElementById('productForm').reset();
}

// Display products in the table (for view products page)
function displayProducts() {
    const products = getProducts();
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const imgCell = document.createElement('td');
        imgCell.innerHTML = product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 50px;">` : '';

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;

        const codeCell = document.createElement('td');
        codeCell.textContent = product.code;

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price.toFixed(2)}`;

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>`;

        row.appendChild(imgCell);
        row.appendChild(nameCell);
        row.appendChild(codeCell);
        row.appendChild(priceCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

// Delete product
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    displayProducts();
}
