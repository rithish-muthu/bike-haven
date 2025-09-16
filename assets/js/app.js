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
}

function updateAuthUI() {
    if (currentUser) {
        elements.loginBtn.style.display = 'none';
        elements.registerBtn.style.display = 'none';
        elements.userMenu.style.display = 'block';
        elements.userName.textContent = currentUser.displayName || 'User';
    } else {
        elements.loginBtn.style.display = 'inline-flex';
        elements.registerBtn.style.display = 'inline-flex';
        elements.userMenu.style.display = 'none';
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
        const snapshot = await db.collection('motorcycles').get();
        motorcycles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log(`Loaded ${motorcycles.length} motorcycles`);
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
    if (!currentUser) return;
    
    try {
        const snapshot = await db.collection('orders')
            .where('customerEmail', '==', currentUser.email)
            .orderBy('orderDate', 'desc')
            .get();
        
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
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
    elements.adminPanel.style.display = 'grid';
    showAdminDashboard();
}

function hideAdminPanel() {
    elements.adminPanel.style.display = 'none';
}

function showAdminDashboard() {
    elements.adminSectionTitle.textContent = 'Dashboard';
    elements.adminSection.innerHTML = `
        <div class="admin-stats">
            <div class="stat-card">
                <h3>Total Motorcycles</h3>
                <div class="stat-number" id="totalMotorcycles">-</div>
            </div>
            <div class="stat-card">
                <h3>Total Orders</h3>
                <div class="stat-number" id="totalOrders">-</div>
            </div>
            <div class="stat-card">
                <h3>Total Users</h3>
                <div class="stat-number" id="totalUsers">-</div>
            </div>
            <div class="stat-card">
                <h3>Total Inquiries</h3>
                <div class="stat-number" id="totalInquiries">-</div>
            </div>
        </div>
    `;
    
    loadAdminStats();
}

async function loadAdminStats() {
    try {
        // Load motorcycles count
        const motorcyclesSnapshot = await db.collection('motorcycles').get();
        document.getElementById('totalMotorcycles').textContent = motorcyclesSnapshot.size;
        
        // Load orders count
        const ordersSnapshot = await db.collection('orders').get();
        document.getElementById('totalOrders').textContent = ordersSnapshot.size;
        
        // Load users count
        const usersSnapshot = await db.collection('users').get();
        document.getElementById('totalUsers').textContent = usersSnapshot.size;
        
        // Load inquiries count
        const inquiriesSnapshot = await db.collection('inquiries').get();
        document.getElementById('totalInquiries').textContent = inquiriesSnapshot.size;
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
    return currentUser && currentUser.email === 'admin@bikehaven.com';
}

// Show admin panel if user is admin
if (isAdmin()) {
    showAdminPanel();
}
