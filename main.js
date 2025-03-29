document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    closeMobileMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Cart Toggle
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Product Quick View Modal
    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('close-modal');
    
    closeModal.addEventListener('click', function() {
        productModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modalOverlay.addEventListener('click', function() {
        productModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Price formatting function for Indian Rupees
    function formatPrice(price) {
        // Convert to Indian numbering system with ₹ symbol
        return '₹' + price.toLocaleString('en-IN');
    }
    
    // Sample product data with Indian prices
    const products = [
        {
            id: 1,
            title: "Diamond Solitaire Ring",
            category: "rings",
            price: 50000,
            originalPrice: 59999,
            material: ["gold", "diamond"],
            rating: 4.8,
            reviews: 124,
            image: "1.jpg",
            description: "A timeless solitaire ring featuring a brilliant-cut diamond set in 18k gold. The perfect symbol of eternal love.",
            inStock: true,
            badge: "Bestseller"
        },
        {
            id: 2,
            title: "Pearl Drop Earrings",
            category: "earrings",
            price: 5990,
            originalPrice: 7990,
            material: ["silver", "pearl"],
            rating: 4.6,
            reviews: 89,
            image: "2.jpg",
            description: "Elegant pearl drop earrings with sterling silver hooks. Each pearl is hand-selected for its perfect luster.",
            inStock: true,
            badge: "New"
        },
        {
            id: 3,
            title: "Gold Pendant Necklace",
            category: "necklaces",
            price: 12990,
            originalPrice: 14990,
            material: ["gold"],
            rating: 4.7,
            reviews: 67,
            image: "3.jpg",
            description: "A delicate 14k gold pendant necklace with a minimalist design. Perfect for everyday wear or special occasions.",
            inStock: true
        },
        {
            id: 4,
            title: "Tennis Bracelet",
            category: "bracelets",
            price: 34990,
            originalPrice: 39990,
            material: ["platinum", "diamond"],
            rating: 4.9,
            reviews: 42,
            image: "4.jpg",
            description: "A stunning tennis bracelet featuring round brilliant diamonds set in platinum. Total diamond weight: 2 carats.",
            inStock: true
        },
        {
            id: 5,
            title: "Hoop Earrings",
            category: "earrings",
            price: 3990,
            originalPrice: 4990,
            material: ["gold"],
            rating: 4.5,
            reviews: 112,
            image: "5.jpg",
            description: "Classic gold hoop earrings in three sizes. Made with 14k gold for lasting shine and durability.",
            inStock: true
        },
        {
            id: 6,
            title: "Engagement Ring Set",
            category: "rings",
            price: 38990,
            originalPrice: 42990,
            material: ["platinum", "diamond"],
            rating: 4.9,
            reviews: 56,
            image: "6.jpg",
            description: "A matching engagement ring and wedding band set in platinum with accent diamonds. Custom sizing available.",
            inStock: true,
            badge: "Popular"
        },
     
    ];
    
    // Display products
    const productsContainer = document.getElementById('products-container');
    const shownProductsCount = document.getElementById('shown-products');
    const totalProductsCount = document.getElementById('total-products');
    
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No products match your filters.</p>';
            shownProductsCount.textContent = '0';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-actions">
                        <button class="quick-view" data-id="${product.id}">
                            <i class="far fa-eye"></i>
                        </button>
                        <button class="add-to-wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="stars">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                            ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
        
        shownProductsCount.textContent = productsToDisplay.length;
        totalProductsCount.textContent = products.length;
        
        // Add event listeners to quick view buttons
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                showProductModal(product);
            });
        });
        
        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                if (this.disabled) return;
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }
    
    // Show product modal
    function showProductModal(product) {
        const modalContent = document.getElementById('modal-product-content');
        
        modalContent.innerHTML = `
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="modal-product-details">
                <h2 class="modal-product-title">${product.title}</h2>
                <div class="modal-product-price">
                    ${formatPrice(product.price)}
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <p class="modal-product-description">${product.description}</p>
                <div class="modal-product-meta">
                    <div class="meta-item">
                        <i class="fas fa-box"></i>
                        <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-star"></i>
                        <span>${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    </div>
                </div>
                <div class="modal-product-options">
                    <div class="option-group">
                        <h4 class="option-title">Material</h4>
                        <div class="option-values">
                            ${product.material.map(m => `
                                <span class="option-value active">${m.charAt(0).toUpperCase() + m.slice(1)}</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="option-group">
                        <h4 class="option-title">Size</h4>
                        <div class="option-values">
                            <span class="option-value">XS</span>
                            <span class="option-value">S</span>
                            <span class="option-value active">M</span>
                            <span class="option-value">L</span>
                            <span class="option-value">XL</span>
                        </div>
                    </div>
                </div>
                <div class="modal-product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="btn btn-primary modal-add-to-cart" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners to quantity buttons
        const minusBtn = modalContent.querySelector('.minus');
        const plusBtn = modalContent.querySelector('.plus');
        const quantityInput = modalContent.querySelector('.quantity-input');
        
        minusBtn.addEventListener('click', function() {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        
        // Add event listener to add to cart button
        const modalAddToCart = modalContent.querySelector('.modal-add-to-cart');
        if (modalAddToCart) {
            modalAddToCart.addEventListener('click', function() {
                if (this.disabled) return;
                const quantity = parseInt(quantityInput.value);
                addToCart(product, quantity);
                productModal.classList.remove('active');
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Show modal
        productModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Filter products
    const categoryLinks = document.querySelectorAll('.category-list a');
    const minPriceInput = document.getElementById('input-min');
    const maxPriceInput = document.getElementById('input-max');
    const minPriceSlider = document.getElementById('min-price');
    const maxPriceSlider = document.getElementById('max-price');
    const materialCheckboxes = document.querySelectorAll('input[name="material"]');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-by');
    
    let currentCategory = 'all';
    let currentMinPrice = 0;
    let currentMaxPrice = 100000;
    let currentMaterials = ['gold', 'silver', 'platinum', 'diamond'];
    let currentSort = 'featured';
    
    // Initialize price sliders and inputs
    minPriceSlider.min = 0;
    minPriceSlider.max = 100000;
    minPriceSlider.value = 0;
    maxPriceSlider.min = 0;
    maxPriceSlider.max = 100000;
    maxPriceSlider.value = 100000;
    
    minPriceInput.value = formatPrice(minPriceSlider.value);
    maxPriceInput.value = formatPrice(maxPriceSlider.value);
    
    minPriceSlider.addEventListener('input', function() {
        minPriceInput.value = formatPrice(this.value);
    });
    
    maxPriceSlider.addEventListener('input', function() {
        maxPriceInput.value = formatPrice(this.value);
    });
    
    minPriceInput.addEventListener('change', function() {
        const numericValue = parseInt(this.value.replace(/[^0-9]/g, ''));
        minPriceSlider.value = numericValue;
        this.value = formatPrice(numericValue);
    });
    
    maxPriceInput.addEventListener('change', function() {
        const numericValue = parseInt(this.value.replace(/[^0-9]/g, ''));
        maxPriceSlider.value = numericValue;
        this.value = formatPrice(numericValue);
    });
    
    // Category filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-category');
            filterProducts();
        });
    });
    
    // Material filter
    materialCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            currentMaterials = Array.from(materialCheckboxes)
                .filter(c => c.checked)
                .map(c => c.value);
        });
    });
    
    // Apply filters
    applyFiltersBtn.addEventListener('click', function() {
        currentMinPrice = parseInt(minPriceSlider.value);
        currentMaxPrice = parseInt(maxPriceSlider.value);
        filterProducts();
    });
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', function() {
        // Reset category
        document.querySelector('.category-list a[data-category="all"]').click();
        
        // Reset price
        minPriceSlider.value = 0;
        maxPriceSlider.value = 100000;
        minPriceInput.value = formatPrice(0);
        maxPriceInput.value = formatPrice(100000);
        
        // Reset materials
        materialCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        currentMaterials = ['gold', 'silver', 'platinum', 'diamond'];
        
        // Reset sort
        sortSelect.value = 'featured';
        currentSort = 'featured';
        
        filterProducts();
    });
    
    // Sort products
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        filterProducts();
    });
    
    // Filter and sort products
    function filterProducts() {
        let filteredProducts = [...products];
        
        // Filter by category
        if (currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
        }
        
        // Filter by price
        filteredProducts = filteredProducts.filter(product => 
            product.price >= parseInt(minPriceSlider.value) && 
            product.price <= parseInt(maxPriceSlider.value)
        );
        
        // Filter by material
        filteredProducts = filteredProducts.filter(product => 
            product.material.some(material => currentMaterials.includes(material))
        );
        
        // Sort products
        switch (currentSort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // Assuming newer products have higher IDs
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'popular':
                filteredProducts.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
                break;
            default:
                // 'featured' - keep original order
                break;
        }
        
        displayProducts(filteredProducts);
    }
    
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function addToCart(product, quantity = 1) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCart();
        showAddedToCartNotification(product.title);
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
    
    function updateCart() {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart sidebar
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.querySelector('.total-price');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <a href="#shop" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            cartTotal.textContent = formatPrice(0);
        } else {
            cartItemsContainer.innerHTML = '';
            
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            cartTotal.textContent = formatPrice(subtotal);
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === productId);
                    
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        removeFromCart(productId);
                    }
                    
                    updateCart();
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === productId);
                    item.quantity++;
                    updateCart();
                });
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }
    }
    
    function showAddedToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>${productName} has been added to your cart!</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Initialize cart on page load
    updateCart();
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) return;
            window.location.href = 'checkout.html';
        });
    }
    
    // Notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1200;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Initialize
    displayProducts(products);
    
    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send the email to a server
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }
});
// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentStep = 1;
    let shippingCost = 9.99; // Default standard shipping
    let taxRate = 0.08; // 8% tax rate
    let shippingMethod = 'standard';
    
    // Initialize checkout
    updateOrderSummary();
    updateProgressSteps();
    
    // Step Navigation
    const nextToPaymentBtn = document.getElementById('next-to-payment');
    const nextToReviewBtn = document.getElementById('next-to-review');
    const backToShippingBtn = document.getElementById('back-to-shipping');
    const backToPaymentBtn = document.getElementById('back-to-payment');
    const placeOrderBtn = document.getElementById('place-order');
    const cancelCheckoutBtn = document.getElementById('cancel-checkout');
    
    // Form elements
    const checkoutForm = document.getElementById('checkoutForm');
    const shippingForm = document.querySelector('.checkout-step[data-step="1"]');
    const paymentForm = document.querySelector('.checkout-step[data-step="2"]');
    const reviewForm = document.querySelector('.checkout-step[data-step="3"]');
    
    // Payment method toggles
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    // Billing address toggle
    const sameAsShippingCheckbox = document.getElementById('same-as-shipping');
    const billingAddressFields = document.getElementById('billing-address-fields');
    
    // Confirmation modal
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationOverlay = document.getElementById('confirmation-overlay');
    
    // Helper function to format currency
    function formatCurrency(amount) {
        return '₹' + amount.toFixed(2);
    }
    
    // Update order summary in sidebar
    function updateOrderSummary() {
        const sidebarItems = document.getElementById('sidebar-items');
        const orderItemsSummary = document.getElementById('order-items-summary');
        
        // Calculate totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * taxRate;
        const total = subtotal + shippingCost + tax;
        
        // Update sidebar items
        sidebarItems.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="order-item-details">
                    <h4 class="order-item-title">${item.title}</h4>
                    <p class="order-item-price">${formatCurrency(item.price)}</p>
                    <p class="order-item-quantity">Qty: ${item.quantity}</p>
                </div>
            `;
            sidebarItems.appendChild(itemElement);
        });
        
        // Update order review items
        orderItemsSummary.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="order-item-details">
                    <h4 class="order-item-title">${item.title}</h4>
                    <p class="order-item-price">${formatCurrency(item.price)}</p>
                    <p class="order-item-quantity">Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-total">
                    ${formatCurrency(item.price * item.quantity)}
                </div>
            `;
            orderItemsSummary.appendChild(itemElement);
        });
        
        // Update totals
        document.getElementById('sidebar-subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('sidebar-shipping').textContent = formatCurrency(shippingCost);
        document.getElementById('sidebar-tax').textContent = formatCurrency(tax);
        document.getElementById('sidebar-grand-total').textContent = formatCurrency(total);
        
        document.getElementById('subtotal-summary').textContent = formatCurrency(subtotal);
        document.getElementById('shipping-summary-price').textContent = formatCurrency(shippingCost);
        document.getElementById('tax-summary').textContent = formatCurrency(tax);
        document.getElementById('grand-total-summary').textContent = formatCurrency(total);
    }
    
    // Update progress steps
    function updateProgressSteps() {
        document.querySelectorAll('.step').forEach(step => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber === currentStep) {
                step.classList.add('active');
            } else if (stepNumber < currentStep) {
                step.classList.add('completed');
            }
        });
        
        document.querySelectorAll('.checkout-step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === currentStep) {
                step.classList.add('active');
            }
        });
    }
    
    // Go to specific step
    function goToStep(stepNumber) {
        currentStep = stepNumber;
        updateProgressSteps();
        
        // Scroll to top of form
        window.scrollTo({
            top: checkoutForm.offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Shipping method change
    document.querySelectorAll('input[name="shipping-method"]').forEach(method => {
        method.addEventListener('change', function() {
            shippingMethod = this.value;
            
            switch (shippingMethod) {
                case 'standard':
                    shippingCost = 9.99;
                    break;
                case 'express':
                    shippingCost = 19.99;
                    break;
                case 'overnight':
                    shippingCost = 29.99;
                    break;
            }
            
            updateOrderSummary();
        });
    });
    
    // Payment method change
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            
            // Update active payment method UI
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding payment form
            paymentForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${methodType}-form`).classList.add('active');
        });
    });
    
    // Billing address toggle
    sameAsShippingCheckbox.addEventListener('change', function() {
        billingAddressFields.style.display = this.checked ? 'none' : 'block';
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const stepToGo = parseInt(this.getAttribute('data-step'));
            goToStep(stepToGo);
        });
    });
    
    // Next to Payment button
    nextToPaymentBtn.addEventListener('click', function() {
        if (shippingForm.checkValidity()) {
            // Update shipping summary
            const shippingSummary = document.getElementById('shipping-summary');
            const email = document.getElementById('email').value;
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const address = document.getElementById('address').value;
            const address2 = document.getElementById('address2').value;
            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;
            const state = document.getElementById('state').value;
            const zip = document.getElementById('zip').value;
            const phone = document.getElementById('phone').value;
            
            shippingSummary.innerHTML = `
                <p><strong>${firstName} ${lastName}</strong></p>
                <p>${address}${address2 ? ', ' + address2 : ''}</p>
                <p>${city}, ${state} ${zip}</p>
                <p>${country}</p>
                <p>${email}</p>
                <p>${phone}</p>
                <p class="shipping-method">
                    <strong>Shipping Method:</strong> 
                    ${document.querySelector('input[name="shipping-method"]:checked').parentNode.querySelector('.method-name').textContent}
                </p>
            `;
            
            goToStep(2);
        } else {
            shippingForm.reportValidity();
        }
    });
    
    // Next to Review button
    nextToReviewBtn.addEventListener('click', function() {
        if (paymentForm.checkValidity()) {
            // Update payment summary
            const paymentSummary = document.getElementById('payment-summary');
            const paymentMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
            
            if (paymentMethod === 'credit-card') {
                const cardNumber = document.getElementById('card-number').value;
                const last4 = cardNumber.substr(cardNumber.length - 4);
                const cardName = document.getElementById('card-name').value;
                
                paymentSummary.innerHTML = `
                    <p><strong>Credit Card</strong> ending in ${last4}</p>
                    <p>Name on card: ${cardName}</p>
                `;
            } else {
                paymentSummary.innerHTML = `
                    <p><strong>${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1).replace('-', ' ')}</strong></p>
                `;
            }
            
            goToStep(3);
        } else {
            paymentForm.reportValidity();
        }
    });
    
    // Back to Shipping button
    backToShippingBtn.addEventListener('click', function() {
        goToStep(1);
    });
    
    // Back to Payment button
    backToPaymentBtn.addEventListener('click', function() {
        goToStep(2);
    });
    
    // Place Order button
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (document.getElementById('agree-terms').checked) {
            // In a real application, you would process the payment here
            // For demo purposes, we'll just show the confirmation
            
            // Generate random order number
            const orderNumber = 'LX-' + Math.floor(100000 + Math.random() * 900000);
            
            // Get customer email
            const email = document.getElementById('email').value;
            
            // Update confirmation modal
            document.getElementById('order-number').textContent = orderNumber;
            document.getElementById('confirmation-email').textContent = email;
            
            // Show confirmation modal
            confirmationModal.classList.add('active');
            confirmationOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Clear cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        } else {
            alert('Please agree to the Terms of Service and Privacy Policy to place your order.');
        }
    });
    
    // Cancel Checkout button
    cancelCheckoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel your checkout? Your cart will be saved.')) {
            window.location.href = 'index.html';
        }
    });
    
    // Close confirmation modal
    confirmationOverlay.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update input value
            this.value = value;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            // Update input value
            this.value = value;
        });
    }
    
    // Update cart count
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Animate cart count when it changes
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Initialize cart count
    updateCartCount();
});
document.addEventListener('DOMContentLoaded', function() {
    // Countries we ship to (in a real app, this might come from an API)
    const countries = [
        "United States", "Canada", "United Kingdom", "Australia", 
        "Germany", "France", "Italy", "Spain", "Japan", "South Korea",
        "Singapore", "United Arab Emirates", "Saudi Arabia", "Mexico",
        "Brazil", "Switzerland", "Netherlands", "Belgium", "Sweden",
        "Norway", "Denmark", "Austria", "New Zealand", "South Africa"
    ];

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });
        });
    });

    // Countries modal functionality
    const viewCountriesBtn = document.getElementById('view-countries-btn');
    const countriesModal = document.getElementById('countries-modal');
    const closeCountriesModal = document.getElementById('close-countries-modal');
    const countriesList = document.querySelector('.countries-list');

    // Populate countries list
    countriesList.innerHTML = countries.map(country => 
        `<p><i class="fas fa-check" style="color: var(--primary-color); margin-right: 8px;"></i>${country}</p>`
    ).join('');

    viewCountriesBtn.addEventListener('click', function() {
        countriesModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeCountriesModal.addEventListener('click', function() {
        countriesModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    countriesModal.addEventListener('click', function(e) {
        if (e.target === countriesModal) {
            countriesModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Update cart count from localStorage
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Initialize cart count
    updateCartCount();
});
// Cookie Consent Check (add to main.js)
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    
    if (consent === 'all') {
        // Load all cookies
        loadAnalyticsCookies();
        loadMarketingCookies();
    } else if (consent === 'custom') {
        // Load cookies based on preferences
        if (localStorage.getItem('analyticsCookies') === 'true') {
            loadAnalyticsCookies();
        }
        if (localStorage.getItem('marketingCookies') === 'true') {
            loadMarketingCookies();
        }
    }
    // If no consent, don't load any non-essential cookies
}

function loadAnalyticsCookies() {
    // Implementation for analytics cookies (e.g., Google Analytics)
    console.log('Loading analytics cookies');
}

function loadMarketingCookies() {
    // Implementation for marketing cookies (e.g., Facebook Pixel)
    console.log('Loading marketing cookies');
}

// Call this function when your main.js loads
checkCookieConsent();
// Add these functions to your existing main.js file

// Cookie Consent Functions
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    
    if (consent === 'all') {
        // Load all cookies
        loadAnalyticsCookies();
        loadMarketingCookies();
    } else if (consent === 'custom') {
        // Load cookies based on preferences
        if (localStorage.getItem('analyticsCookies') === 'true') {
            loadAnalyticsCookies();
        }
        if (localStorage.getItem('marketingCookies') === 'true') {
            loadMarketingCookies();
        }
    }
    // If no consent, don't load any non-essential cookies
}

function loadAnalyticsCookies() {
    // Implementation for analytics cookies (e.g., Google Analytics)
    console.log('Loading analytics cookies');
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
}

function loadMarketingCookies() {
    // Implementation for marketing cookies (e.g., Facebook Pixel)
    console.log('Loading marketing cookies');
    // Example: fbq('init', 'FB_PIXEL_ID');
}

// Cart Functions (make sure these are in main.js)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Animate cart count when it changes
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

// Initialize cart functionality when main.js loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing main.js code
    
    // Initialize cart
    updateCartCount();
    checkCookieConsent();
    
    // Make sure these functions are available globally
    window.getCart = getCart;
    window.updateCartCount = updateCartCount;
    window.checkCookieConsent = checkCookieConsent;
});
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll(
        '.animate-from-left, .animate-from-right, .animate-from-bottom, .animate-scale'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Mobile menu toggle (shared with main.js)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    closeMobileMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Cart functionality (shared with main.js)
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Load cart from localStorage and update count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Initialize cart count
    updateCartCount();

    // Video overlay click handler
    const philosophyImage = document.querySelector('.philosophy-image');
    if (philosophyImage) {
        philosophyImage.addEventListener('click', function() {
            // In a real implementation, this would open a video modal
            alert('This would open a video about our crafting process');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});