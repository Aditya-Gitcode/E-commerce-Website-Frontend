

   //DOM ELEMENTS

const productGrid = document.querySelector(".product-grid");


   //CLOSURE EXAMPLE
   //Cart Counter with Private State

const cartManager = () => {

  let cartCount = 0;

  return {

    addToCart() {
      cartCount++;
      console.log(`Cart Items: ${cartCount}`);
    },

    getCartCount() {
      return cartCount;
    }

  };

};

const cart = cartManager();


//   FETCH PRODUCTS FROM API
  // Async / Await + Fetch API

const API_URL = "https://fakestoreapi.com/products";


const fetchProducts = async () => {

  try {

    // Loading UI 

    productGrid.innerHTML = `
      <h2 style="color:white;text-align:center;width:100%;">
        Loading Products...
      </h2>
    `;

    // Fetch Data 

    const response = await fetch(API_URL);

    const products = await response.json();

    console.log(products);

    /* Render Products */

    renderProducts(products);

  }

  catch(error) {

    console.error("API Error:", error);

    productGrid.innerHTML = `
      <h2 style="color:red;text-align:center;width:100%;">
        Failed to load products.
      </h2>
    `;

  }

};


   //RENDER PRODUCTS
   //DOM Manipulation + Array Methods

const renderProducts = (products) => {

  /* Array Method: map() */

  const productCards = products.map(product => {

    return `

      <div class="card">

        <img src="${product.image}" alt="${product.title}">

        <div class="card-content">

          <h3>${product.title.substring(0, 20)}...</h3>

          <p class="price">$${product.price}</p>

          <button 
            class="btn add-cart"
            data-id="${product.id}"
          >
            Add To Cart
          </button>

        </div>

      </div>

    `;

  }).join("");

  productGrid.innerHTML = productCards;

};


   //EVENT DELEGATION
   //DOM Events

document.addEventListener("click", (e) => {

  if(e.target.classList.contains("add-cart")) {

    cart.addToCart();

    e.target.innerText = "Added ✓";

    setTimeout(() => {

      e.target.innerText = "Add To Cart";

    }, 1500);

  }

});


   //ARRAY METHODS EXAMPLES

const prices = [100, 200, 300, 400];

/* map() */

const discountedPrices = prices.map(price => price * 0.9);

console.log("Discounted:", discountedPrices);

/* filter() */

const expensive = prices.filter(price => price > 200);

console.log("Expensive:", expensive);

/* reduce() */

const total = prices.reduce((acc, curr) => acc + curr, 0);

console.log("Total:", total);


   //EVENT LOOP EXAMPLE

console.log("1");

setTimeout(() => {
  console.log("2 - From Event Loop");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise Microtask");
});

console.log("4");


   //INITIALIZE APP

fetchProducts();