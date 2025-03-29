// checkout.js - Luxuria Jewelry Checkout Page
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentStep = 1;
    let shippingCost = 799; // Default standard shipping in INR
    let taxRate = 0.18; // 18% GST in India
    let shippingMethod = 'standard';
    
    // Initialize checkout
    updateOrderSummary();
    updateProgressSteps();
    updateCartCount();
    
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
    
    // Update shipping method prices to INR
    document.querySelectorAll('.method-price').forEach(priceElement => {
        const method = priceElement.closest('.shipping-method').querySelector('input').value;
        switch(method) {
            case 'standard':
                priceElement.textContent = '₹799';
                break;
            case 'express':
                priceElement.textContent = '₹1499';
                break;
            case 'overnight':
                priceElement.textContent = '₹2499';
                break;
        }
    });

    // Helper function to format currency in INR
    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
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
        if (cart.length === 0) {
            sidebarItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
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
        }
        
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
                // Add animation when step becomes active
                step.style.animation = 'fadeInUp 0.6s ease-out';
                setTimeout(() => {
                    step.style.animation = '';
                }, 600);
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
            
            // Update shipping cost based on selection
            switch (shippingMethod) {
                case 'standard':
                    shippingCost = 799;
                    break;
                case 'express':
                    shippingCost = 1499;
                    break;
                case 'overnight':
                    shippingCost = 2499;
                    break;
            }
            
            updateOrderSummary();
            
            // Animate the selected shipping method
            const selectedMethod = this.closest('.shipping-method');
            selectedMethod.style.transform = 'scale(1.02)';
            setTimeout(() => {
                selectedMethod.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // Payment method change
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            
            // Update active payment method UI with animation
            paymentMethods.forEach(m => {
                m.classList.remove('active');
                m.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Show corresponding payment form with fade effect
            paymentForms.forEach(form => {
                if (form.classList.contains('active')) {
                    form.style.opacity = '0';
                    setTimeout(() => {
                        form.classList.remove('active');
                    }, 300);
                }
            });
            
            setTimeout(() => {
                const activeForm = document.getElementById(`${methodType}-form`);
                activeForm.classList.add('active');
                activeForm.style.opacity = '1';
            }, 300);
        });
    });
    
    // Billing address toggle
    sameAsShippingCheckbox.addEventListener('change', function() {
        if (this.checked) {
            billingAddressFields.style.opacity = '0';
            setTimeout(() => {
                billingAddressFields.style.display = 'none';
            }, 300);
        } else {
            billingAddressFields.style.display = 'block';
            setTimeout(() => {
                billingAddressFields.style.opacity = '1';
            }, 10);
        }
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const stepToGo = parseInt(this.getAttribute('data-step'));
            goToStep(stepToGo);
            
            // Add click animation
            this.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 300);
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
            const countrySelect = document.getElementById('country');
            const country = countrySelect.options[countrySelect.selectedIndex].text;
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
                    (${formatCurrency(shippingCost)})
                </p>
            `;
            
            goToStep(2);
        } else {
            // Add shake animation to invalid fields
            shippingForm.querySelectorAll(':invalid').forEach(field => {
                field.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            });
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
            // Add shake animation to invalid fields
            paymentForm.querySelectorAll(':invalid').forEach(field => {
                field.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            });
            paymentForm.reportValidity();
        }
    });
    
    // Back to Shipping button
    backToShippingBtn.addEventListener('click', function() {
        goToStep(1);
        
        // Add click animation
        this.style.transform = 'translateX(-5px)';
        setTimeout(() => {
            this.style.transform = 'translateX(0)';
        }, 300);
    });
    
    // Back to Payment button
    backToPaymentBtn.addEventListener('click', function() {
        goToStep(2);
        
        // Add click animation
        this.style.transform = 'translateX(-5px)';
        setTimeout(() => {
            this.style.transform = 'translateX(0)';
        }, 300);
    });
    
    // Place Order button
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (document.getElementById('agree-terms').checked) {
            // Add loading animation
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
            this.disabled = true;
            
            // Simulate processing delay
            setTimeout(() => {
                // Generate random order number
                const orderNumber = 'LX-' + Math.floor(100000 + Math.random() * 900000);
                
                // Get customer email
                const email = document.getElementById('email').value;
                
                // Update confirmation modal
                document.getElementById('order-number').textContent = orderNumber;
                document.getElementById('confirmation-email').textContent = email;
                
                // Show confirmation modal with animation
                confirmationModal.classList.add('active');
                confirmationOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset button state
                this.innerHTML = 'Place Order';
                this.disabled = false;
                
                // Clear cart
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
            }, 2000);
        } else {
            // Shake the terms checkbox
            const termsCheckbox = document.getElementById('agree-terms');
            termsCheckbox.parentElement.style.animation = 'shake 0.5s';
            setTimeout(() => {
                termsCheckbox.parentElement.style.animation = '';
            }, 500);
            
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
    
    // Add shake animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
// Checkout Page Functionality - Payment Section Transition
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
        return '$' + amount.toFixed(2);
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
    
    // Next to Payment button - MAIN FUNCTIONALITY
    nextToPaymentBtn.addEventListener('click', function() {
        if (shippingForm.checkValidity()) {
            // Collect shipping information
            const shippingInfo = {
                email: document.getElementById('email').value,
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                address: document.getElementById('address').value,
                address2: document.getElementById('address2').value,
                city: document.getElementById('city').value,
                country: document.getElementById('country').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
                phone: document.getElementById('phone').value,
                shippingMethod: document.querySelector('input[name="shipping-method"]:checked').value
            };
            
            // Store shipping info in localStorage for persistence
            localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            
            // Update shipping summary (for review step)
            const shippingSummary = document.getElementById('shipping-summary');
            shippingSummary.innerHTML = `
                <p><strong>${shippingInfo.firstName} ${shippingInfo.lastName}</strong></p>
                <p>${shippingInfo.address}${shippingInfo.address2 ? ', ' + shippingInfo.address2 : ''}</p>
                <p>${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}</p>
                <p>${shippingInfo.country}</p>
                <p>${shippingInfo.email}</p>
                <p>${shippingInfo.phone}</p>
                <p class="shipping-method">
                    <strong>Shipping Method:</strong> 
                    ${document.querySelector('input[name="shipping-method"]:checked').parentNode.querySelector('.method-name').textContent}
                </p>
            `;
            
            // Proceed to payment step
            goToStep(2);
            
            // Animate the transition
            paymentForm.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            // Show validation errors
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
    
    // Load saved shipping info if available
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
        const shippingInfo = JSON.parse(savedShippingInfo);
        
        // Populate shipping form fields
        document.getElementById('email').value = shippingInfo.email;
        document.getElementById('first-name').value = shippingInfo.firstName;
        document.getElementById('last-name').value = shippingInfo.lastName;
        document.getElementById('address').value = shippingInfo.address;
        document.getElementById('address2').value = shippingInfo.address2 || '';
        document.getElementById('city').value = shippingInfo.city;
        document.getElementById('country').value = shippingInfo.country;
        document.getElementById('state').value = shippingInfo.state;
        document.getElementById('zip').value = shippingInfo.zip;
        document.getElementById('phone').value = shippingInfo.phone;
        
        // Set shipping method
        document.querySelector(`input[name="shipping-method"][value="${shippingInfo.shippingMethod}"]`).checked = true;
        shippingMethod = shippingInfo.shippingMethod;
        
        // Update shipping cost
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
    }
});