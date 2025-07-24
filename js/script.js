// Data Produk
const products = [
  {
    id: 1,
    name: "PUDCHEEZ",
    price: 5000,
    category: "makanan",
    image: "images/produck1.jpg",
    featured: true,
  },
];

// Function to load products
function loadAllProducts() {
  const productContainer = document.getElementById("product-list");

  if (!productContainer) {
    console.error("Product container not found!");
    return;
  }

  productContainer.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="col-md-4 mb-4 product-item" data-category="${
        product.category
      }">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${
      product.name
    }" onerror="this.src='https://via.placeholder.com/300'">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Rp ${product.price.toLocaleString("id-ID")}</p>
            <button class="btn btn-success btn-beli"
              data-product="${product.name}"
              data-price="${product.price}">
              <i class="fab fa-whatsapp me-2"></i>Pesan sekarang!
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeIcon = document.getElementById("darkModeIcon");
  const body = document.body;

  // Check for saved user preference
  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", function () {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  function enableDarkMode() {
    body.classList.add("dark-mode");
    darkModeIcon.classList.remove("bx-moon");
    darkModeIcon.classList.add("bx-sun");
    localStorage.setItem("darkMode", "enabled");
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    darkModeIcon.classList.remove("bx-sun");
    darkModeIcon.classList.add("bx-moon");
    localStorage.setItem("darkMode", "disabled");
  }
});

// Countdown Timer
function updateCountdowns() {
  document.querySelectorAll(".countdown").forEach((element) => {
    const launchDate = new Date(element.getAttribute("data-date"));
    const now = new Date();
    const diff = launchDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    element.textContent = `${days} days`;

    if (days <= 0) {
      element.innerHTML = '<span class="badge bg-success">TODAY!</span>';
    }
  });
}

// Notify Button
document.querySelectorAll(".btn-notify").forEach((button) => {
  button.addEventListener("click", function () {
    const productName =
      this.closest(".product-info").querySelector("h3").textContent;
    alert(`We'll notify you when "${productName}" launches! ✨`);
  });
});

// Run on load
document.addEventListener("DOMContentLoaded", function () {
  updateCountdowns();
  setInterval(updateCountdowns, 86400000); // Update daily
});

// Filter functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("filter-btn")) {
    const filter = e.target.getAttribute("data-filter");
    const items = document.querySelectorAll(".product-item");

    items.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
});

// WhatsApp order function
function setupWhatsAppOrder() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-beli")) {
      const productName = e.target.getAttribute("data-product");
      const productPrice = e.target.getAttribute("data-price");

      const message = `Halo EcoRech! Saya ingin memesan:\n\n*Produk:* ${productName}\n*Harga:* Rp ${productPrice}\n\nApakah masih tersedia?`;
      const encodedMessage = encodeURIComponent(message);

      window.open(
        `https://wa.me/62882006533693?text=${encodedMessage}`,
        "_blank"
      );
    }
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");
  loadAllProducts();
  setupWhatsAppOrder();
});
function setupWhatsAppOrder() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-beli")) {
      const productName = e.target.getAttribute("data-product");
      const productPrice = e.target.getAttribute("data-price");

      // Format pesan otomatis
      const message = `Halo DEA! Saya ingin memesan:\n\n*Produk:* ${productName}\n*Harga:* Rp ${productPrice}\n\nApakah masih tersedia?`;

      // Encode pesan untuk URL
      const encodedMessage = encodeURIComponent(message);

      // Redirect ke WhatsApp
      window.open(
        `https://wa.me/62882006533693?text=${encodedMessage}`,
        "_blank"
      );
    }
  });
}

// Update loadAllProducts() dan loadFeaturedProducts():
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById("featured-products");
  if (featuredContainer) {
    const featured = products.filter((p) => p.featured);
    featured.forEach((product) => {
      featuredContainer.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${
        product.name
      }">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Rp ${product.price.toLocaleString()}</p>
              <button 
                class="btn btn-success btn-beli"
                data-product="${product.name}"
                data-price="${product.price.toLocaleString()}"
              >
                <i class="fab fa-whatsapp me-2"></i>Pesan via WhatsApp
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }
}

// Jangan lupa panggil fungsi di DOMContentLoaded:
document.addEventListener("DOMContentLoaded", function () {
  loadFeaturedProducts();
  loadAllProducts();
  setInterval(updateCountdown, 1000);
  setupWhatsAppOrder(); // <-- Tambahkan ini
});
