// Bike Haven - Premium Motorcycle Showroom
// Complete showroom management system

// Global variables
let currentUser = null;
let motorcycles = [];
let currentMotorcycleId = null;

// DOM elements
const elements = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    navToggle: document.getElementById('navToggle'),
    loginBtn: document.getElementById('loginBtn'),
    registerBtn: document.getElementById('registerBtn'),
    userMenu: document.getElementById('userMenu'),
    userName: document.getElementById('userName'),
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Modals
    loginModal: document.getElementById('loginModal'),
    registerModal: document.getElementById('registerModal'),
    orderModal: document.getElementById('orderModal'),
    ordersModal: document.getElementById('ordersModal'),
    profileModal: document.getElementById('profileModal'),
    
    // Forms
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    profileForm: document.getElementById('profileForm'),
    contactForm: document.getElementById('contactForm'),
    
    // Motorcycle listing
    motorcyclesGrid: document.getElementById('motorcyclesGrid'),
    searchInput: document.getElementById('searchInput'),
    brandFilter: document.getElementById('brandFilter'),
    typeFilter: document.getElementById('typeFilter'),
    priceFilter: document.getElementById('priceFilter'),
    
    // Admin panel
    adminPanel: document.getElementById('adminPanel'),
    adminSection: document.getElementById('adminSection'),
    adminSectionTitle: document.getElementById('adminSectionTitle'),
    exitAdmin: document.getElementById('exitAdmin'),
    
    // Other
    ordersList: document.getElementById('ordersList')
};

// Initialize app
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Bike Haven Showroom - Initializing...');
    
    try {
        // Initialize Firebase
        await initializeFirebase();
        
        // Setup event listeners
    setupEventListeners();
        
        // Load initial data
        await loadMotorcycles();
        await loadBrands();
        
        // Check authentication
        firebase.auth().onAuthStateChanged(handleAuthStateChange);
        
        console.log('Bike Haven Showroom - Initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showMessage('Error initializing application. Please refresh the page.', 'error');
    }
});

// Initialize Firebase
async function initializeFirebase() {
    try {
        // Firebase is already initialized in firebase-config.js
        console.log('Firebase initialized');
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    elements.navToggle.addEventListener('click', toggleMobileMenu);
    
    // Authentication
    elements.loginBtn.addEventListener('click', () => showModal(elements.loginModal));
    elements.registerBtn.addEventListener('click', () => showModal(elements.registerModal));
    elements.logoutBtn.addEventListener('click', handleLogout);
    
    // Modal switches
    document.getElementById('switchToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(elements.loginModal);
        showModal(elements.registerModal);
    });

    document.getElementById('switchToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(elements.registerModal);
        showModal(elements.loginModal);
    });

    // Forms
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.registerForm.addEventListener('submit', handleRegister);
    elements.profileForm.addEventListener('submit', handleProfileUpdate);
    elements.contactForm.addEventListener('submit', handleContact);
    
    // User menu
    document.getElementById('myOrdersBtn').addEventListener('click', (e) => {
        e.preventDefault();
        hideAllModals();
        showModal(elements.ordersModal);
        loadUserOrders();
    });
    
    document.getElementById('profileBtn').addEventListener('click', (e) => {
        e.preventDefault();
        hideAllModals();
        showModal(elements.profileModal);
        loadUserProfile();
    });
    
    // Filters
    elements.searchInput.addEventListener('input', filterMotorcycles);
    elements.brandFilter.addEventListener('change', filterMotorcycles);
    elements.typeFilter.addEventListener('change', filterMotorcycles);
    elements.priceFilter.addEventListener('change', filterMotorcycles);
    
    // Admin panel
    elements.exitAdmin.addEventListener('click', hideAdminPanel);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    elements.navMenu.classList.toggle('active');
    elements.navToggle.classList.toggle('active');
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal functions
function showModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => hideModal(modal));
}

function closeModal(element) {
    const modal = element.closest('.modal');
    hideModal(modal);
}

// Authentication functions
function handleAuthStateChange(user) {
    currentUser = user;
    updateAuthUI();
    
    // Show admin panel if user is admin
    if (isAdmin()) {
        console.log('Admin user detected, showing admin panel');
        showAdminPanel();
    }
}

function updateAuthUI() {
    if (currentUser) {
    elements.loginBtn.style.display = 'none';
    elements.registerBtn.style.display = 'none';
    elements.userMenu.style.display = 'block';
        elements.userName.textContent = currentUser.displayName || 'User';
        
        // Show admin button if user is admin
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            adminBtn.style.display = isAdmin() ? 'inline-flex' : 'none';
        }
    } else {
        elements.loginBtn.style.display = 'inline-flex';
        elements.registerBtn.style.display = 'inline-flex';
        elements.userMenu.style.display = 'none';
        
        // Hide admin button when logged out
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        hideModal(elements.loginModal);
        showMessage('Login successful!', 'success');
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Login failed: ' + error.message, 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
            displayName: `${firstName} ${lastName}`
        });
        
        // Save user data to Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            firstName,
            lastName,
            email,
            phone,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        hideModal(elements.registerModal);
        showMessage('Registration successful!', 'success');
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('Registration failed: ' + error.message, 'error');
    }
}

async function handleLogout() {
    try {
        await firebase.auth().signOut();
        hideAllModals();
        showMessage('Logged out successfully!', 'success');
    } catch (error) {
        console.error('Logout error:', error);
        showMessage('Logout failed: ' + error.message, 'error');
    }
}

// Load motorcycles
async function loadMotorcycles() {
    try {
        console.log('Loading motorcycles...');
        
        // First try motorcycles collection
        let snapshot = await db.collection('motorcycles').get();
        
        // If no motorcycles found, try bikes collection (for backward compatibility)
        if (snapshot.empty) {
            console.log('No motorcycles found, trying bikes collection...');
            snapshot = await db.collection('bikes').get();
        }
        
        motorcycles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log(`Loaded ${motorcycles.length} motorcycles from ${snapshot.empty ? 'bikes' : 'motorcycles'} collection`);
        console.log('Motorcycles data:', motorcycles);
        
        // If still no data, show message to add sample data
        if (motorcycles.length === 0) {
            console.log('No motorcycle data found. Adding sample data...');
            await addSampleData();
            // Try loading again after adding sample data
            const newSnapshot = await db.collection('motorcycles').get();
            motorcycles = newSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(`Loaded ${motorcycles.length} motorcycles after adding sample data`);
        }
        
        renderMotorcycles(motorcycles);
    } catch (error) {
        console.error('Error loading motorcycles:', error);
        showMessage('Error loading motorcycles. Please try again.', 'error');
    }
}

// Load brands for filter
async function loadBrands() {
    try {
        const brands = [...new Set(motorcycles.map(motorcycle => motorcycle.brand))];
        brands.sort();
        
        const brandFilter = document.getElementById('brandFilter');
        brandFilter.innerHTML = '<option value="">All Brands</option>';
        
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading brands:', error);
    }
}

// Render motorcycles
function renderMotorcycles(motorcyclesToRender) {
    if (!elements.motorcyclesGrid) return;
    
    elements.motorcyclesGrid.innerHTML = '';
    
    if (motorcyclesToRender.length === 0) {
        elements.motorcyclesGrid.innerHTML = '<div class="message">No motorcycles found matching your criteria.</div>';
        return;
    }
    
    motorcyclesToRender.forEach(motorcycle => {
        const motorcycleCard = createMotorcycleCard(motorcycle);
        elements.motorcyclesGrid.appendChild(motorcycleCard);
    });
}

// Create motorcycle card
function createMotorcycleCard(motorcycle) {
    const card = document.createElement('div');
    card.className = 'motorcycle-card';
    
    card.innerHTML = `
        <div class="motorcycle-image">
            ${motorcycle.image ? 
                `<img src="${motorcycle.image}" alt="${motorcycle.name}" onerror="handleImageError(this)">` :
                `<i class="fas fa-motorcycle"></i>`
            }
            <div class="motorcycle-badge ${motorcycle.availability}">
                ${motorcycle.availability === 'available' ? 'In Stock' : 
                  motorcycle.availability === 'sold' ? 'Sold' : 'Out of Stock'}
            </div>
        </div>
        <div class="motorcycle-content">
            <div class="motorcycle-brand">${motorcycle.brand}</div>
            <h3 class="motorcycle-name">${motorcycle.name}</h3>
            <div class="motorcycle-price">$${motorcycle.price.toLocaleString()}</div>
            <div class="motorcycle-features">
                <div class="motorcycle-feature">
                    <i class="fas fa-calendar"></i>
                    <span>${motorcycle.year || '2024'}</span>
                </div>
                <div class="motorcycle-feature">
                    <i class="fas fa-user"></i>
                    <span>${motorcycle.seats || 2} seats</span>
                </div>
                <div class="motorcycle-feature">
                    <i class="fas fa-gas-pump"></i>
                    <span>${motorcycle.fuelType || 'Petrol'}</span>
                </div>
                <div class="motorcycle-feature">
                    <i class="fas fa-cog"></i>
                    <span>${motorcycle.engine || 'N/A'}cc</span>
                </div>
            </div>
            <p class="motorcycle-description">${motorcycle.description || 'Premium motorcycle with excellent performance and reliability.'}</p>
            <div class="motorcycle-actions">
                ${motorcycle.availability === 'available' ? 
                    `<button class="btn btn-primary" onclick="openOrderModal('${motorcycle.id}')">
                        <i class="fas fa-shopping-cart"></i> Order Now
                    </button>` :
                    `<button class="btn btn-secondary" disabled>
                        <i class="fas fa-times"></i> Not Available
                    </button>`
                }
                <button class="btn btn-outline" onclick="openInquiryModal('${motorcycle.id}')">
                    <i class="fas fa-info-circle"></i> Inquire
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Handle image error
function handleImageError(img) {
    img.style.display = 'none';
    const icon = img.parentElement.querySelector('i');
    if (icon) {
        icon.style.display = 'block';
    }
}

// Filter motorcycles
function filterMotorcycles() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const selectedBrand = elements.brandFilter.value;
    const selectedType = elements.typeFilter.value;
    const selectedPrice = elements.priceFilter.value;
    
    let filteredMotorcycles = motorcycles.filter(motorcycle => {
        const matchesSearch = motorcycle.name.toLowerCase().includes(searchTerm) ||
                            motorcycle.brand.toLowerCase().includes(searchTerm) ||
                            (motorcycle.description && motorcycle.description.toLowerCase().includes(searchTerm));
        
        const matchesBrand = !selectedBrand || motorcycle.brand === selectedBrand;
        
        const matchesType = !selectedType || motorcycle.type === selectedType;
        
        let matchesPrice = true;
        if (selectedPrice) {
            const price = motorcycle.price;
            switch (selectedPrice) {
                case '0-10000':
                    matchesPrice = price < 10000;
                    break;
                case '10000-25000':
                    matchesPrice = price >= 10000 && price <= 25000;
                    break;
                case '25000-50000':
                    matchesPrice = price >= 25000 && price <= 50000;
                    break;
                case '50000+':
                    matchesPrice = price > 50000;
                    break;
            }
        }
        
        return matchesSearch && matchesBrand && matchesType && matchesPrice;
    });
    
    renderMotorcycles(filteredMotorcycles);
}

// Open order modal
function openOrderModal(motorcycleId) {
    console.log('Opening order modal for motorcycle:', motorcycleId);
    
    const motorcycle = motorcycles.find(m => m.id === motorcycleId);
    if (!motorcycle) {
        showMessage('Motorcycle not found!', 'error');
        return;
    }
    
    if (motorcycle.availability !== 'available') {
        showMessage('This motorcycle is not available for order!', 'error');
        return;
    }
    
    currentMotorcycleId = motorcycleId;
    
    const orderModalBody = document.getElementById('orderModalBody');
    orderModalBody.innerHTML = `
        <div class="motorcycle-order-info">
            <img src="${motorcycle.image || ''}" alt="${motorcycle.name}" onerror="handleImageError(this)">
            <div class="motorcycle-details">
                <h4>${motorcycle.name}</h4>
                <p class="brand">${motorcycle.brand}</p>
                <p class="price">$${motorcycle.price.toLocaleString()}</p>
            </div>
        </div>
        
        <form id="orderForm">
            <div class="form-section">
                <h4>Customer Information</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="orderFirstName">First Name</label>
                        <input type="text" id="orderFirstName" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label for="orderLastName">Last Name</label>
                        <input type="text" id="orderLastName" name="lastName" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="orderEmail">Email</label>
                        <input type="email" id="orderEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="orderPhone">Phone Number</label>
                        <input type="tel" id="orderPhone" name="phone" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="orderAddress">Address</label>
                    <textarea id="orderAddress" name="address" rows="3" required placeholder="Enter your full address"></textarea>
                </div>
            </div>
            
            <div class="form-section">
                <h4>Payment Information</h4>
                <div class="form-group">
                    <label for="paymentMethod">Payment Method</label>
                    <select id="paymentMethod" name="paymentMethod" required>
                        <option value="">Select Payment Method</option>
                        <option value="cash">Cash on Delivery</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="financing">Financing (0% APR)</option>
                        <option value="credit_card">Credit Card</option>
                    </select>
                </div>
                <div class="form-group" id="financingInfo" style="display: none;">
                    <label for="downPayment">Down Payment ($)</label>
                    <input type="number" id="downPayment" name="downPayment" min="0" max="${motorcycle.price}" value="${Math.floor(motorcycle.price * 0.1)}">
                    <small>Minimum 10% down payment required</small>
                </div>
            </div>
            
            <div class="form-section">
                <h4>Order Summary</h4>
                <div class="order-summary">
                    <div class="summary-row">
                        <span>Motorcycle:</span>
                        <span>${motorcycle.name} - ${motorcycle.brand}</span>
                    </div>
                    <div class="summary-row">
                        <span>Price:</span>
                        <span>$${motorcycle.price.toLocaleString()}</span>
                    </div>
                    <div class="summary-row" id="downPaymentRow" style="display: none;">
                        <span>Down Payment:</span>
                        <span id="downPaymentAmount">$0</span>
                    </div>
                    <div class="summary-row" id="financingRow" style="display: none;">
                        <span>Financing Amount:</span>
                        <span id="financingAmount">$0</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total Amount:</span>
                        <span id="totalAmount">$${motorcycle.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal(this.closest('.modal'))">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-shopping-cart"></i> Place Order
                </button>
            </div>
        </form>
    `;
    
    // Setup payment method change handler
    const paymentMethod = document.getElementById('paymentMethod');
    const financingInfo = document.getElementById('financingInfo');
    const downPaymentRow = document.getElementById('downPaymentRow');
    const financingRow = document.getElementById('financingRow');
    const downPaymentAmount = document.getElementById('downPaymentAmount');
    const financingAmount = document.getElementById('financingAmount');
    const totalAmount = document.getElementById('totalAmount');
    const downPaymentInput = document.getElementById('downPayment');
    
    paymentMethod.addEventListener('change', function() {
        if (this.value === 'financing') {
            financingInfo.style.display = 'block';
            downPaymentRow.style.display = 'flex';
            financingRow.style.display = 'flex';
            updateOrderSummary();
        } else {
            financingInfo.style.display = 'none';
            downPaymentRow.style.display = 'none';
            financingRow.style.display = 'none';
            totalAmount.textContent = `$${motorcycle.price.toLocaleString()}`;
        }
    });
    
    downPaymentInput.addEventListener('input', updateOrderSummary);
    
    function updateOrderSummary() {
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        const financing = motorcycle.price - downPayment;
        
        downPaymentAmount.textContent = `$${downPayment.toLocaleString()}`;
        financingAmount.textContent = `$${financing.toLocaleString()}`;
        totalAmount.textContent = `$${motorcycle.price.toLocaleString()}`;
    }
    
    // Setup form submission
    document.getElementById('orderForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (motorcycle.availability !== 'available') {
            showMessage('Sorry, this motorcycle is not available for order.', 'error');
            return;
        }
        
        const formData = new FormData(this);
        const orderData = {
            motorcycleId: motorcycleId,
            motorcycleName: motorcycle.name,
            motorcycleBrand: motorcycle.brand,
            motorcyclePrice: motorcycle.price,
            customerFirstName: formData.get('firstName'),
            customerLastName: formData.get('lastName'),
            customerEmail: formData.get('email'),
            customerPhone: formData.get('phone'),
            customerAddress: formData.get('address'),
            paymentMethod: formData.get('paymentMethod'),
            downPayment: formData.get('paymentMethod') === 'financing' ? parseFloat(formData.get('downPayment')) : 0,
            financingAmount: formData.get('paymentMethod') === 'financing' ? motorcycle.price - parseFloat(formData.get('downPayment')) : 0,
            orderStatus: 'pending',
            orderDate: new Date().toISOString(),
            orderNumber: 'ORD-' + Date.now()
        };
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        try {
            await db.collection('orders').add(orderData);
            
            // Update motorcycle availability to 'sold' if it's a cash or bank transfer order
            if (orderData.paymentMethod === 'cash' || orderData.paymentMethod === 'bank_transfer') {
                await db.collection('motorcycles').doc(motorcycleId).update({
                    availability: 'sold',
                    soldDate: new Date().toISOString(),
                    soldTo: `${orderData.customerFirstName} ${orderData.customerLastName}`
                });
            }
            
            showMessage(`Order placed successfully! Your order number is ${orderData.orderNumber}. We will contact you soon to confirm the details.`, 'success');
            closeModal(document.getElementById('orderModal'));
            loadMotorcycles(); // Reload motorcycles to update availability
    } catch (error) {
            console.error('Error placing order:', error);
            showMessage('Error placing order. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    showModal(elements.orderModal);
}

// Open inquiry modal
function openInquiryModal(motorcycleId) {
    const motorcycle = motorcycles.find(m => m.id === motorcycleId);
    if (!motorcycle) {
        showMessage('Motorcycle not found!', 'error');
        return;
    }
    
    const inquiryModal = document.createElement('div');
    inquiryModal.className = 'modal';
    inquiryModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Inquiry about ${motorcycle.name}</h2>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="motorcycle-inquiry-info">
                    <img src="${motorcycle.image || ''}" alt="${motorcycle.name}" onerror="handleImageError(this)">
                    <div class="motorcycle-details">
                        <h4>${motorcycle.name}</h4>
                        <p class="brand">${motorcycle.brand}</p>
                        <p class="price">$${motorcycle.price.toLocaleString()}</p>
                    </div>
                </div>
                
                <form id="inquiryForm">
                    <div class="form-group">
                        <label for="inquiryName">Name</label>
                        <input type="text" id="inquiryName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiryEmail">Email</label>
                        <input type="email" id="inquiryEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiryPhone">Phone</label>
                        <input type="tel" id="inquiryPhone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="inquiryMessage">Message</label>
                        <textarea id="inquiryMessage" name="message" rows="4" required placeholder="What would you like to know about this motorcycle?"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal(this.closest('.modal'))">Cancel</button>
                        <button type="submit" class="btn btn-primary">Send Inquiry</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(inquiryModal);
    showModal(inquiryModal);
    
    // Setup form submission
    document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const inquiryData = {
            motorcycleId: motorcycleId,
            motorcycleName: motorcycle.name,
            customerName: formData.get('name'),
            customerEmail: formData.get('email'),
            customerPhone: formData.get('phone'),
            message: formData.get('message'),
            status: 'new',
            createdAt: new Date().toISOString()
        };
        
        try {
            await db.collection('inquiries').add(inquiryData);
            showMessage('Inquiry sent successfully! We will contact you soon.', 'success');
            closeModal(inquiryModal);
        } catch (error) {
            console.error('Error sending inquiry:', error);
            showMessage('Error sending inquiry. Please try again.', 'error');
        }
    });
}

// Load user orders
async function loadUserOrders() {
    if (!currentUser) {
        console.log('No current user, skipping order loading');
        return;
    }
    
    try {
        console.log('Loading user orders for:', currentUser.email);
        
        // Get all orders and filter client-side to avoid index requirement
        console.log('Fetching all orders from Firestore...');
        const snapshot = await db.collection('orders').get();
        console.log('Fetched', snapshot.size, 'total orders');
        
        const orders = snapshot.docs
            .map(doc => ({
            id: doc.id,
            ...doc.data()
            }))
            .filter(order => order.customerEmail === currentUser.email)
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sort by date descending
        
        console.log('Filtered to', orders.length, 'orders for current user');
        
        if (orders.length === 0) {
            elements.ordersList.innerHTML = '<div class="message">No orders found.</div>';
        return;
    }
    
        elements.ordersList.innerHTML = '';
        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="order-header">
                    <h4>Order #${order.orderNumber}</h4>
                    <span class="order-status ${order.orderStatus}">${order.orderStatus}</span>
                </div>
                <div class="order-details">
                    <p><strong>Motorcycle:</strong> ${order.motorcycleName} - ${order.motorcycleBrand}</p>
                    <p><strong>Price:</strong> $${order.motorcyclePrice.toLocaleString()}</p>
                    <p><strong>Payment:</strong> ${order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
                    <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
            `;
            elements.ordersList.appendChild(orderItem);
        });
        
        console.log('Successfully rendered', orders.length, 'orders');
    } catch (error) {
        console.error('Error loading user orders:', error);
        elements.ordersList.innerHTML = '<div class="message error">Error loading orders.</div>';
    }
}

// Load user profile
function loadUserProfile() {
    if (!currentUser) return;
    
    document.getElementById('profileFirstName').value = currentUser.displayName?.split(' ')[0] || '';
    document.getElementById('profileLastName').value = currentUser.displayName?.split(' ')[1] || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('profileFirstName').value;
    const lastName = document.getElementById('profileLastName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    
    try {
        await currentUser.updateProfile({
            displayName: `${firstName} ${lastName}`
        });
        
        await db.collection('users').doc(currentUser.uid).update({
            firstName,
            lastName,
            email,
            phone,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Profile updated successfully!', 'success');
        hideModal(elements.profileModal);
    } catch (error) {
        console.error('Error updating profile:', error);
        showMessage('Error updating profile. Please try again.', 'error');
    }
}

// Handle contact form
async function handleContact(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        status: 'new',
        createdAt: new Date().toISOString()
    };
    
    try {
        await db.collection('contacts').add(contactData);
        showMessage('Message sent successfully! We will contact you soon.', 'success');
        this.reset();
    } catch (error) {
        console.error('Error sending message:', error);
        showMessage('Error sending message. Please try again.', 'error');
    }
}

// Admin panel functions
function showAdminPanel() {
    console.log('showAdminPanel called');
    console.log('elements.adminPanel:', elements.adminPanel);
    
    if (elements.adminPanel) {
        elements.adminPanel.style.display = 'grid';
        showAdminDashboard();
        console.log('Admin panel displayed');
    } else {
        console.error('Admin panel element not found in elements object');
        // Try to get it directly
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'grid';
            showAdminDashboard();
            console.log('Admin panel displayed using direct element access');
        } else {
            console.error('Admin panel element not found in DOM');
        }
    }
}

function hideAdminPanel() {
    console.log('hideAdminPanel called');
    if (elements.adminPanel) {
        elements.adminPanel.style.display = 'none';
    } else {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
    }
}

function showAdminDashboard() {
    elements.adminSectionTitle.textContent = 'Dashboard';
    elements.adminSection.innerHTML = `
        <div class="admin-dashboard">
            <div class="dashboard-header">
                <h2>Welcome to Bike Haven Admin</h2>
                <p>Manage your motorcycle showroom efficiently</p>
            </div>
            
            <div class="admin-stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-motorcycle"></i>
                    </div>
                    <div class="stat-content">
                        <h3>Total Motorcycles</h3>
                        <div class="stat-number" id="totalMotorcycles">-</div>
                        <p>In inventory</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-content">
                        <h3>Total Orders</h3>
                        <div class="stat-number" id="totalOrders">-</div>
                        <p>Customer orders</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3>Total Users</h3>
                        <div class="stat-number" id="totalUsers">-</div>
                        <p>Registered customers</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-question-circle"></i>
                    </div>
                    <div class="stat-content">
                        <h3>Total Inquiries</h3>
                        <div class="stat-number" id="totalInquiries">-</div>
                        <p>Customer inquiries</p>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-actions">
                <div class="action-card">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="showAdminMotorcycles()">
                            <i class="fas fa-motorcycle"></i> Manage Motorcycles
                        </button>
                        <button class="btn btn-secondary" onclick="showAdminOrders()">
                            <i class="fas fa-shopping-cart"></i> View Orders
                        </button>
                        <button class="btn btn-outline" onclick="addSampleData()">
                            <i class="fas fa-plus"></i> Add Sample Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    loadAdminStats();
}

// Show admin motorcycles management
function showAdminMotorcycles() {
    elements.adminSectionTitle.textContent = 'Manage Motorcycles';
    elements.adminSection.innerHTML = `
        <div class="admin-motorcycles">
            <div class="admin-header-actions">
                <h3>Motorcycle Inventory</h3>
                <button class="btn btn-primary" onclick="addNewMotorcycle()">
                    <i class="fas fa-plus"></i> Add New Motorcycle
                </button>
            </div>
            <div class="motorcycles-admin-list" id="motorcyclesAdminList">
                <!-- Motorcycles will be loaded here -->
            </div>
        </div>
    `;
    
    loadAdminMotorcycles();
}

// Load admin motorcycles
async function loadAdminMotorcycles() {
    try {
        const snapshot = await db.collection('motorcycles').get();
        const motorcycles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        const motorcyclesList = document.getElementById('motorcyclesAdminList');
        if (motorcyclesList) {
            motorcyclesList.innerHTML = '';
            
            if (motorcycles.length === 0) {
                motorcyclesList.innerHTML = '<div class="message">No motorcycles found.</div>';
                return;
            }
            
            motorcycles.forEach(motorcycle => {
                const motorcycleItem = document.createElement('div');
                motorcycleItem.className = 'admin-motorcycle-item';
                motorcycleItem.innerHTML = `
                    <div class="motorcycle-image">
                        ${motorcycle.image ? 
                            `<img src="${motorcycle.image}" alt="${motorcycle.name}" onerror="handleImageError(this)">` :
                            `<i class="fas fa-motorcycle"></i>`
                        }
                    </div>
                    <div class="motorcycle-info">
                        <h4>${motorcycle.name}</h4>
                        <p class="brand">${motorcycle.brand}</p>
                        <p class="price">$${motorcycle.price.toLocaleString()}</p>
                        <div class="motorcycle-details">
                            <span class="detail"><i class="fas fa-calendar"></i> ${motorcycle.year || '2024'}</span>
                            <span class="detail"><i class="fas fa-cog"></i> ${motorcycle.engine || 'N/A'}cc</span>
                            <span class="detail"><i class="fas fa-user"></i> ${motorcycle.seats || 2} seats</span>
                        </div>
                        <div class="availability-status ${motorcycle.availability}">
                            <i class="fas fa-circle"></i>
                            ${motorcycle.availability === 'available' ? 'In Stock' : 
                              motorcycle.availability === 'sold' ? 'Sold' : 'Out of Stock'}
                        </div>
                    </div>
                    <div class="motorcycle-actions">
                        <button class="btn btn-small btn-outline" onclick="editMotorcycle('${motorcycle.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-small btn-secondary" onclick="toggleMotorcycleAvailability('${motorcycle.id}', '${motorcycle.availability}')">
                            <i class="fas fa-toggle-${motorcycle.availability === 'available' ? 'on' : 'off'}"></i>
                            ${motorcycle.availability === 'available' ? 'Mark Sold' : 'Mark Available'}
                        </button>
                        <button class="btn btn-small btn-outline" onclick="deleteMotorcycle('${motorcycle.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                `;
                motorcyclesList.appendChild(motorcycleItem);
            });
        }
    } catch (error) {
        console.error('Error loading admin motorcycles:', error);
    }
}

// Show admin orders management
function showAdminOrders() {
    elements.adminSectionTitle.textContent = 'Manage Orders';
    elements.adminSection.innerHTML = `
        <div class="admin-orders">
            <div class="admin-header-actions">
                <h3>Customer Orders</h3>
                <div class="order-filters">
                    <select id="orderStatusFilter" onchange="filterOrders()">
                        <option value="">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div class="orders-admin-list" id="ordersAdminList">
                <!-- Orders will be loaded here -->
            </div>
        </div>
    `;
    
    loadAdminOrders();
}

// Load admin orders
async function loadAdminOrders() {
    try {
        const snapshot = await db.collection('orders').get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        const ordersList = document.getElementById('ordersAdminList');
        if (ordersList) {
            ordersList.innerHTML = '';
            
            if (orders.length === 0) {
                ordersList.innerHTML = '<div class="message">No orders found.</div>';
                return;
            }
            
            orders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.className = 'admin-order-item';
                orderItem.innerHTML = `
                    <div class="order-header">
                        <div class="order-info">
                            <h4>Order #${order.orderNumber}</h4>
                            <p class="customer">${order.customerFirstName} ${order.customerLastName}</p>
                            <p class="date">${new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div class="order-status">
                            <span class="status-badge ${order.orderStatus}">${order.orderStatus}</span>
                        </div>
                    </div>
                    <div class="order-details">
                        <div class="motorcycle-info">
                            <h5>${order.motorcycleName} - ${order.motorcycleBrand}</h5>
                            <p class="price">$${order.motorcyclePrice.toLocaleString()}</p>
                        </div>
                        <div class="payment-info">
                            <p><strong>Payment:</strong> ${order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
                            <p><strong>Email:</strong> ${order.customerEmail}</p>
                            <p><strong>Phone:</strong> ${order.customerPhone}</p>
                        </div>
                    </div>
                    <div class="order-actions">
                        <select onchange="updateOrderStatus('${order.id}', this.value)" class="status-select">
                            <option value="pending" ${order.orderStatus === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="confirmed" ${order.orderStatus === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="processing" ${order.orderStatus === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="completed" ${order.orderStatus === 'completed' ? 'selected' : ''}>Completed</option>
                            <option value="cancelled" ${order.orderStatus === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                        <button class="btn btn-small btn-outline" onclick="viewOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                `;
                ordersList.appendChild(orderItem);
            });
        }
    } catch (error) {
        console.error('Error loading admin orders:', error);
    }
}

// Update order status
async function updateOrderStatus(orderId, status) {
    try {
        await db.collection('orders').doc(orderId).update({
            orderStatus: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Order status updated successfully!', 'success');
        loadAdminOrders(); // Reload orders
    } catch (error) {
        console.error('Error updating order status:', error);
        showMessage('Error updating order status', 'error');
    }
}

// Show admin users management
function showAdminUsers() {
    elements.adminSectionTitle.textContent = 'Manage Users';
    elements.adminSection.innerHTML = `
        <div class="admin-users">
            <div class="admin-header-actions">
                <h3>Registered Users</h3>
                <div class="user-filters">
                    <input type="text" id="userSearchInput" placeholder="Search users..." onkeyup="filterUsers()">
                </div>
            </div>
            <div class="users-admin-list" id="usersAdminList">
                <!-- Users will be loaded here -->
            </div>
        </div>
    `;
    
    loadAdminUsers();
}

// Load admin users
async function loadAdminUsers() {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        const usersList = document.getElementById('usersAdminList');
        if (usersList) {
            usersList.innerHTML = '';
            
            if (users.length === 0) {
                usersList.innerHTML = '<div class="message">No users found.</div>';
                return;
            }
            
            users.forEach(user => {
                const userItem = document.createElement('div');
                userItem.className = 'admin-user-item';
                userItem.innerHTML = `
                    <div class="user-info">
                        <div class="user-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="user-details">
                            <h4>${user.firstName} ${user.lastName}</h4>
                            <p class="user-email">${user.email}</p>
                            <p class="user-phone">${user.phone || 'No phone provided'}</p>
                            <p class="user-date">Joined: ${new Date(user.createdAt?.toDate ? user.createdAt.toDate() : user.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="btn btn-small btn-outline" onclick="viewUserDetails('${user.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-small btn-outline" onclick="viewUserOrders('${user.email}')">
                            <i class="fas fa-shopping-cart"></i> View Orders
                        </button>
                    </div>
                `;
                usersList.appendChild(userItem);
            });
        }
    } catch (error) {
        console.error('Error loading admin users:', error);
    }
}

// Show admin inquiries management
function showAdminInquiries() {
    elements.adminSectionTitle.textContent = 'Manage Inquiries';
    elements.adminSection.innerHTML = `
        <div class="admin-inquiries">
            <div class="admin-header-actions">
                <h3>Customer Inquiries</h3>
                <div class="inquiry-filters">
                    <select id="inquiryStatusFilter" onchange="filterInquiries()">
                        <option value="">All Inquiries</option>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>
            <div class="inquiries-admin-list" id="inquiriesAdminList">
                <!-- Inquiries will be loaded here -->
            </div>
        </div>
    `;
    
    loadAdminInquiries();
}

// Load admin inquiries
async function loadAdminInquiries() {
    try {
        const snapshot = await db.collection('inquiries').get();
        const inquiries = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        const inquiriesList = document.getElementById('inquiriesAdminList');
        if (inquiriesList) {
            inquiriesList.innerHTML = '';
            
            if (inquiries.length === 0) {
                inquiriesList.innerHTML = '<div class="message">No inquiries found.</div>';
                return;
            }
            
            inquiries.forEach(inquiry => {
                const inquiryItem = document.createElement('div');
                inquiryItem.className = 'admin-inquiry-item';
                inquiryItem.innerHTML = `
                    <div class="inquiry-header">
                        <div class="inquiry-info">
                            <h4>${inquiry.motorcycleName}</h4>
                            <p class="customer">${inquiry.customerName}</p>
                            <p class="date">${new Date(inquiry.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div class="inquiry-status">
                            <span class="status-badge ${inquiry.status}">${inquiry.status}</span>
                        </div>
                    </div>
                    <div class="inquiry-details">
                        <p><strong>Email:</strong> ${inquiry.customerEmail}</p>
                        <p><strong>Phone:</strong> ${inquiry.customerPhone || 'Not provided'}</p>
                        <p><strong>Message:</strong> ${inquiry.message}</p>
                    </div>
                    <div class="inquiry-actions">
                        <select onchange="updateInquiryStatus('${inquiry.id}', this.value)" class="status-select">
                            <option value="new" ${inquiry.status === 'new' ? 'selected' : ''}>New</option>
                            <option value="in_progress" ${inquiry.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                            <option value="resolved" ${inquiry.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                            <option value="closed" ${inquiry.status === 'closed' ? 'selected' : ''}>Closed</option>
                        </select>
                        <button class="btn btn-small btn-outline" onclick="replyToInquiry('${inquiry.id}')">
                            <i class="fas fa-reply"></i> Reply
                        </button>
                    </div>
                `;
                inquiriesList.appendChild(inquiryItem);
            });
        }
    } catch (error) {
        console.error('Error loading admin inquiries:', error);
    }
}

// Update inquiry status
async function updateInquiryStatus(inquiryId, status) {
    try {
        await db.collection('inquiries').doc(inquiryId).update({
            status: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Inquiry status updated successfully!', 'success');
        loadAdminInquiries(); // Reload inquiries
    } catch (error) {
        console.error('Error updating inquiry status:', error);
        showMessage('Error updating inquiry status', 'error');
    }
}

// Filter functions
function filterOrders() {
    const statusFilter = document.getElementById('orderStatusFilter').value;
    // This would filter the orders based on status
    loadAdminOrders();
}

function filterUsers() {
    const searchTerm = document.getElementById('userSearchInput').value.toLowerCase();
    // This would filter users based on search term
    loadAdminUsers();
}

function filterInquiries() {
    const statusFilter = document.getElementById('inquiryStatusFilter').value;
    // This would filter inquiries based on status
    loadAdminInquiries();
}

// Placeholder functions for future implementation
function viewUserDetails(userId) {
    showMessage('User details view coming soon!', 'info');
}

function viewUserOrders(userEmail) {
    showMessage('User orders view coming soon!', 'info');
}

function viewOrderDetails(orderId) {
    showMessage('Order details view coming soon!', 'info');
}

function replyToInquiry(inquiryId) {
    showMessage('Reply to inquiry feature coming soon!', 'info');
}

// Motorcycle management functions
function addNewMotorcycle() {
    showMessage('Add new motorcycle feature coming soon!', 'info');
}

function editMotorcycle(motorcycleId) {
    showMessage('Edit motorcycle feature coming soon!', 'info');
}

function toggleMotorcycleAvailability(motorcycleId, currentAvailability) {
    const newAvailability = currentAvailability === 'available' ? 'sold' : 'available';
    
    if (confirm(`Are you sure you want to mark this motorcycle as ${newAvailability}?`)) {
        db.collection('motorcycles').doc(motorcycleId).update({
            availability: newAvailability,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            showMessage(`Motorcycle marked as ${newAvailability}!`, 'success');
            loadAdminMotorcycles(); // Reload the list
        }).catch(error => {
            console.error('Error updating motorcycle availability:', error);
            showMessage('Error updating motorcycle availability', 'error');
        });
    }
}

function deleteMotorcycle(motorcycleId) {
    if (confirm('Are you sure you want to delete this motorcycle? This action cannot be undone.')) {
        db.collection('motorcycles').doc(motorcycleId).delete().then(() => {
            showMessage('Motorcycle deleted successfully!', 'success');
            loadAdminMotorcycles(); // Reload the list
        }).catch(error => {
            console.error('Error deleting motorcycle:', error);
            showMessage('Error deleting motorcycle', 'error');
        });
    }
}

async function loadAdminStats() {
    try {
        // Load motorcycles count
        const motorcyclesSnapshot = await db.collection('motorcycles').get();
        const motorcyclesElement = document.getElementById('totalMotorcycles');
        if (motorcyclesElement) {
            motorcyclesElement.textContent = motorcyclesSnapshot.size;
        }
        
        // Load orders count
        const ordersSnapshot = await db.collection('orders').get();
        const ordersElement = document.getElementById('totalOrders');
        if (ordersElement) {
            ordersElement.textContent = ordersSnapshot.size;
        }
        
        // Load users count
        const usersSnapshot = await db.collection('users').get();
        const usersElement = document.getElementById('totalUsers');
        if (usersElement) {
            usersElement.textContent = usersSnapshot.size;
        }
        
        // Load inquiries count
        const inquiriesSnapshot = await db.collection('inquiries').get();
        const inquiriesElement = document.getElementById('totalInquiries');
        if (inquiriesElement) {
            inquiriesElement.textContent = inquiriesSnapshot.size;
        }
    } catch (error) {
        console.error('Error loading admin stats:', error);
    }
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the body
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Check if user is admin (you can implement your own admin logic)
function isAdmin() {
    return currentUser && (currentUser.email === 'admin@bikehaven.com' || currentUser.email === 'admin@example.com');
}

// Manual function to show admin panel (for testing)
window.showAdmin = function() {
    console.log('Manually showing admin panel...');
    showAdminPanel();
    console.log('Admin panel shown manually');
};

// Manual function to hide admin panel
window.hideAdmin = function() {
    hideAdminPanel();
    console.log('Admin panel hidden manually');
};

// Force show admin panel (for debugging)
window.forceAdmin = function() {
    console.log('Forcing admin panel to show...');
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.style.display = 'grid';
        console.log('Admin panel forced to show');
    } else {
        console.error('Admin panel element not found!');
    }
};

// Add sample data function
async function addSampleData() {
    try {
        console.log('Adding sample motorcycle data to Firestore...');
        
        // Check if motorcycles already exist
        const existingMotorcycles = await db.collection('motorcycles').get();
        if (existingMotorcycles.size > 0) {
            console.log('Motorcycles already exist in Firestore. Skipping data addition.');
            return;
        }
        
        // Sample motorcycle data
        const sampleMotorcycles = [
            {
                name: "Ducati Panigale V4",
                brand: "Ducati",
                type: "sport",
                price: 24995,
                year: 2024,
                engine: 1103,
                seats: 1,
                fuelType: "Petrol",
                availability: "available",
                description: "The ultimate sport motorcycle with cutting-edge technology and breathtaking performance.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
            },
            {
                name: "Harley-Davidson Street Glide",
                brand: "Harley-Davidson",
                type: "touring",
                price: 21995,
                year: 2024,
                engine: 1868,
                seats: 2,
                fuelType: "Petrol",
                availability: "available",
                description: "The perfect touring motorcycle for long-distance adventures with comfort and style.",
                image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
            },
            {
                name: "BMW R 1250 GS Adventure",
                brand: "BMW",
                type: "adventure",
                price: 18995,
                year: 2024,
                engine: 1254,
                seats: 2,
                fuelType: "Petrol",
                availability: "available",
                description: "The ultimate adventure motorcycle for exploring the world's most challenging terrains.",
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
            },
            {
                name: "Yamaha MT-09",
                brand: "Yamaha",
                type: "naked",
                price: 9995,
                year: 2024,
                engine: 889,
                seats: 2,
                fuelType: "Petrol",
                availability: "available",
                description: "A powerful naked motorcycle with aggressive styling and thrilling performance.",
                image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
            },
            {
                name: "Honda CBR1000RR-R",
                brand: "Honda",
                type: "sport",
                price: 28995,
                year: 2024,
                engine: 999,
                seats: 1,
                fuelType: "Petrol",
                availability: "available",
                description: "Honda's flagship sport motorcycle with MotoGP-derived technology and incredible performance.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
            }
        ];
        
        // Add each motorcycle to Firestore
        for (const motorcycle of sampleMotorcycles) {
            await db.collection('motorcycles').add({
                ...motorcycle,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        }
        
        console.log(`Successfully added ${sampleMotorcycles.length} motorcycles to Firestore.`);
    } catch (error) {
        console.error('Error adding sample data:', error);
    }
}

// Manual function to add sample data (for debugging)
window.addSampleData = addSampleData;

// Manual function to clear all data (for debugging)
window.clearAllData = async function() {
    try {
        console.log('Clearing all data from Firestore...');
        
        // Clear motorcycles
        const motorcyclesSnapshot = await db.collection('motorcycles').get();
        const motorcyclePromises = motorcyclesSnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(motorcyclePromises);
        
        // Clear bikes (old collection)
        const bikesSnapshot = await db.collection('bikes').get();
        const bikePromises = bikesSnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(bikePromises);
        
        console.log('All data cleared from Firestore.');
        location.reload(); // Reload the page
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};

// Manual function to reload motorcycles
window.reloadMotorcycles = loadMotorcycles;

// Manual function to test orders loading
window.testOrdersLoading = async function() {
    console.log('Testing orders loading...');
    try {
        const snapshot = await db.collection('orders').get();
        console.log('Total orders in database:', snapshot.size);
        
        if (snapshot.size > 0) {
            const firstOrder = snapshot.docs[0].data();
            console.log('First order sample:', firstOrder);
        }
        
        return snapshot.size;
    } catch (error) {
        console.error('Error testing orders:', error);
        return 0;
    }
};

// Admin panel will be shown automatically when user logs in if they are admin
