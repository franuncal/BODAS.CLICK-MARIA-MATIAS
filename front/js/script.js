document.getElementById("payButton").addEventListener("click", function () {
  document.getElementById("paymentInfo").classList.toggle("hidden");
});

// Esta es la función que será llamada al hacer clic en el botón
function showAlertAndCloseModal() {
  Swal.fire({
    text: "Muchas Gracias por tu Regalo!",
    icon: "success",
    showConfirmButton: false,
    iconColor: "#dbc0cf",
    timer: 2000,
  });;
  closeModalC();
}

// Función para cerrar el modal
function closeModalC() {
  document.getElementById('myModal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");

  let cart = [];
  let products = [];

  // Fetch products from JSON
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts();
    })
    .catch((error) => console.error("Error al cargar los productos:", error));

  function renderProducts() {
    const cardContent = document.getElementById("card-content");
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
                  <img src=${product.image}>
                  <h3>${product.name}</h3>
                  <p>${product.price.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}</p>
                  <button onclick="addToCart(${
                    product.id
                  })">Agregar Regalo</button>
              `;
      cardContent.appendChild(productElement);
    });
  }

  // Agregar al carrito y Mostrar
  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
                  <span>${item.name} - ${item.price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })} x ${item.quantity}</span>
                  <span class="close" onclick="removeFromCart(${
                    item.id
                  })">&times;</span>
              `;
      cartItemsContainer.appendChild(itemElement);
      total += item.price * item.quantity;
      Swal.fire({
        text: "Regalo agregado al Carrito",
        icon: "success",
        showConfirmButton: false,
        iconColor: "#dbc0cf",
        timer: 2000,
      });
    });
    totalAmount.textContent = total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
    cartCount.textContent = cart.length;
  }

  window.addToCart = function (id) {
    const product = products.find((p) => p.id === id);
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  };

  window.removeFromCart = function (id) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity === 0) {
        cart.splice(itemIndex, 1);
      }
    }
    updateCart();
  };

  cartButton.addEventListener("click", () => {
    cartModal.style.display = "block";
  });

  closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
  });


  window.onclick = function (event) {
    if (event.target == cartModal) {
      cartModal.style.display = "none";
    }
  };
});
