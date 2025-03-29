document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const sizeTabs = document.querySelectorAll('.size-tab');
    const sizeSections = document.querySelectorAll('.size-guide-section');
    
    sizeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and sections
            sizeTabs.forEach(t => t.classList.remove('active'));
            sizeSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Add animation to the new active section
            document.getElementById(tabId).style.animation = 'fadeInUp 0.8s ease-out';
        });
    });
    
    // Interactive Size Tooltips for Charts
    const chartImages = document.querySelectorAll('.chart-image');
    
    chartImages.forEach(chart => {
        const tooltip = chart.querySelector('.size-tooltip');
        const img = chart.querySelector('.chart-img');
        
        img.addEventListener('mousemove', function(e) {
            // Only show tooltip if there's size data points
            if (tooltip.innerHTML.trim() !== '') {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Position tooltip near cursor
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
                tooltip.style.opacity = '1';
                tooltip.style.display = 'block';
            }
        });
        
        img.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 300);
        });
    });
    
    // Sample data points for tooltips (would be expanded in a real implementation)
    const ringSizePoints = [
        { x: 30, y: 40, size: 'US 6', diameter: '16.5mm', circumference: '52mm' }
    ];
    
    const braceletSizePoints = [
        { x: 40, y: 50, size: 'Medium', length: '18cm' }
    ];
    
    const necklaceSizePoints = [
        { x: 50, y: 60, size: '18"', position: 'Collarbone' }
    ];
    
    // This function would be called when hovering over specific points on the charts
    function updateTooltip(tooltip, data) {
        if (data) {
            tooltip.querySelector('.tooltip-size').textContent = data.size;
            
            if (data.diameter) {
                tooltip.querySelector('.tooltip-diameter').textContent = data.diameter;
                tooltip.querySelector('.tooltip-diameter').style.display = 'block';
            } else {
                tooltip.querySelector('.tooltip-diameter').style.display = 'none';
            }
            
            if (data.circumference) {
                tooltip.querySelector('.tooltip-circumference').textContent = data.circumference;
                tooltip.querySelector('.tooltip-circumference').style.display = 'block';
            } else {
                tooltip.querySelector('.tooltip-circumference').style.display = 'none';
            }
            
            if (data.length) {
                tooltip.querySelector('.tooltip-length').textContent = data.length;
                tooltip.querySelector('.tooltip-length').style.display = 'block';
            } else {
                tooltip.querySelector('.tooltip-length').style.display = 'none';
            }
            
            if (data.position) {
                tooltip.querySelector('.tooltip-position').textContent = data.position;
                tooltip.querySelector('.tooltip-position').style.display = 'block';
            } else {
                tooltip.querySelector('.tooltip-position').style.display = 'none';
            }
        }
    }
    
    // Cart functionality from main.js
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
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
    
    // Mobile menu toggle (from main.js)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    closeMobileMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Cart sidebar toggle (from main.js)
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
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
});