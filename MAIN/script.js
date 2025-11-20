document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hbm');
  const navLinks = document.querySelector('nav ul');
  const closeBtn = document.querySelector('.close-btn');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
    });
  }

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryLinks = document.querySelectorAll('.gallery-grid a');

    galleryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        lightbox.style.display = 'block';
        lightboxImg.src = link.href;
      });
    });

    closeLightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // Cart and Checkout Functionality
  const checkoutModal = document.getElementById('checkout-modal');
  if (checkoutModal) {
    const cartBtn = document.getElementById('cart-btn');
    const closeModal = checkoutModal.querySelector('.close-modal');
    const addToCartBtns = document.querySelectorAll('.ordr-btn');
    const cartCountEl = document.getElementById('cart-count');
    const totalItemsEl = document.getElementById('total-items');
    const totalAmountEl = document.getElementById('total-amount');
    const checkoutForm = document.getElementById('checkout-form');
    const addressInput = document.getElementById('address');
    const addressError = document.getElementById('address-error');

    let cartCount = 0;
    let totalAmount = 0;

    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        cartCount++;
        const priceText = btn.previousElementSibling.textContent.replace('₱', '').replace(',', '');
        const price = parseFloat(priceText);
        totalAmount += price;

        updateCartDisplay();

        // Optional: Animate cart button to give feedback
        cartBtn.style.transform = 'scale(1.3)';
        setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
      });
    });

    function updateCartDisplay() {
      cartCountEl.textContent = cartCount;
      totalItemsEl.textContent = cartCount;
      totalAmountEl.textContent = totalAmount.toLocaleString();
    }

    cartBtn.addEventListener('click', () => {
      checkoutModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
      checkoutModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
      }
    });

    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const address = addressInput.value.toLowerCase();

      if (!address.includes('cainta')) {
        addressError.style.display = 'block';
        addressInput.style.borderColor = 'red';
        return;
      }

      addressError.style.display = 'none';
      addressInput.style.borderColor = '#CD853F';

      alert(`Order placed successfully!\nTotal: ₱${totalAmount.toLocaleString()}\nWe will deliver to: ${addressInput.value}`);

      // Reset cart
      cartCount = 0;
      totalAmount = 0;
      updateCartDisplay();
      checkoutModal.style.display = 'none';
      checkoutForm.reset();
    });
  }
});