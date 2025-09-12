// Global variables
let currentUser = null;
let bikes = [];
let filteredBikes = [];
let currentBikeId = null;
let isAdmin = false;

// DOM elements
const elements = {
    // Navigation
    navMenu: document.querySelector('.nav-menu'),
    hamburger: document.querySelector('.hamburger'),
    loginBtn: document.getElementById('loginBtn'),
    registerBtn: document.getElementById('registerBtn'),
    userMenu: document.getElementById('userMenu'),
    userName: document.getElementById('userName'),
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Modals
    loginModal: document.getElementById('loginModal'),
    registerModal: document.getElementById('registerModal'),
    bookingModal: document.getElementById('bookingModal'),
    profileModal: document.getElementById('profileModal'),
    bookingsModal: document.getElementById('bookingsModal'),
    
    // Forms
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    bookingForm: document.getElementById('bookingForm'),
    profileForm: document.getElementById('profileForm'),
    contactForm: document.getElementById('contactForm'),
    
    // Bike listing
    bikesGrid: document.getElementById('bikesGrid'),
    searchInput: document.getElementById('searchInput'),
    brandFilter: document.getElementById('brandFilter'),
    fuelFilter: document.getElementById('fuelFilter'),
    priceFilter: document.getElementById('priceFilter'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    
    // Admin panel
    adminPanel: document.getElementById('adminPanel'),
    adminSection: document.getElementById('adminSection'),
    adminSectionTitle: document.getElementById('adminSectionTitle'),
    exitAdmin: document.getElementById('exitAdmin'),
    
    // Other
    testimonialsSlider: document.getElementById('testimonialsSlider'),
    bookingsList: document.getElementById('bookingsList')
};

// Initialize app
document.addEventListener('DOMContentLoaded', async function() {
    initializeApp();
    setupEventListeners();
    checkAuthState();
    
    // Initialize sample data if needed, then load bikes
    await initializeSampleData();
    await loadBikes();
    await loadTestimonials();
});

// Initialize application
function initializeApp() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add smooth scrolling to navigation links (only for valid targets)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only handle valid selectors (not just "#")
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Initialize mobile menu
    elements.hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            elements.navMenu.classList.remove('active');
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Modal controls
    setupModalControls();
    
    // Form submissions
    setupFormSubmissions();
    
    // Search and filters
    setupSearchAndFilters();
    
    // Admin panel
    setupAdminPanel();
    
    // User menu
    setupUserMenu();
}

// Setup modal controls
function setupModalControls() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Close modals with close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeAllModals);
    });

    // Switch between login and register modals
    document.getElementById('switchToRegister').addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();
        elements.registerModal.style.display = 'block';
    });

    document.getElementById('switchToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();
        elements.loginModal.style.display = 'block';
    });
}

// Setup form submissions
function setupFormSubmissions() {
    // Login form
    elements.loginForm.addEventListener('submit', handleLogin);
    
    // Register form
    elements.registerForm.addEventListener('submit', handleRegister);
    
    // Booking form
    elements.bookingForm.addEventListener('submit', handleBooking);
    
    // Profile form
    elements.profileForm.addEventListener('submit', handleProfileUpdate);
    
    // Contact form
    elements.contactForm.addEventListener('submit', handleContact);
}

// Setup search and filters
function setupSearchAndFilters() {
    elements.searchInput.addEventListener('input', filterBikes);
    elements.brandFilter.addEventListener('change', filterBikes);
    elements.fuelFilter.addEventListener('change', filterBikes);
    elements.priceFilter.addEventListener('change', filterBikes);
    elements.loadMoreBtn.addEventListener('click', loadMoreBikes);
}

// Setup admin panel
function setupAdminPanel() {
    elements.exitAdmin.addEventListener('click', function() {
        elements.adminPanel.style.display = 'none';
    });

    // Admin menu navigation
    document.querySelectorAll('.admin-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showAdminSection(section);
            
            // Update active menu item
            document.querySelectorAll('.admin-menu a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Setup user menu
function setupUserMenu() {
    elements.logoutBtn.addEventListener('click', handleLogout);
    document.getElementById('myBookingsBtn').addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();
        elements.bookingsModal.style.display = 'block';
        loadUserBookings();
    });
    document.getElementById('profileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();
        elements.profileModal.style.display = 'block';
        loadUserProfile();
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    elements.navMenu.classList.toggle('active');
    elements.hamburger.classList.toggle('active');
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Check authentication state
function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        if (user) {
            showUserMenu();
            checkAdminStatus(user.uid);
        } else {
            showGuestMenu();
        }
    });
}

// Check if user is admin
async function checkAdminStatus(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            isAdmin = userData.isAdmin || false;
            
            if (isAdmin) {
                showAdminAccess();
            }
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
    }
}

// Show user menu
function showUserMenu() {
    elements.loginBtn.style.display = 'none';
    elements.registerBtn.style.display = 'none';
    elements.userMenu.style.display = 'block';
    elements.userName.textContent = currentUser.displayName || currentUser.email;
}

// Show guest menu
function showGuestMenu() {
    elements.loginBtn.style.display = 'block';
    elements.registerBtn.style.display = 'block';
    elements.userMenu.style.display = 'none';
    isAdmin = false;
}

// Show admin access
function showAdminAccess() {
    const adminLink = document.createElement('li');
    adminLink.className = 'nav-item';
    adminLink.innerHTML = '<a href="#" class="nav-link" id="adminBtn">Admin Panel</a>';
    elements.navMenu.appendChild(adminLink);
    
    document.getElementById('adminBtn').addEventListener('click', function(e) {
        e.preventDefault();
        elements.adminPanel.style.display = 'flex';
        showAdminSection('dashboard');
    });
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showMessage('Login successful!', 'success');
        closeAllModals();
        elements.loginForm.reset();
    } catch (error) {
        showMessage('Login failed: ' + error.message, 'error');
    }
}

// Handle register
async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const phone = document.getElementById('registerPhone').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name });
        
        // Save user data to Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            name: name,
            email: email,
            phone: phone,
            isAdmin: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Registration successful!', 'success');
        closeAllModals();
        elements.registerForm.reset();
    } catch (error) {
        showMessage('Registration failed: ' + error.message, 'error');
    }
}

// Handle logout
async function handleLogout() {
    try {
        await auth.signOut();
        showMessage('Logged out successfully!', 'success');
        elements.adminPanel.style.display = 'none';
    } catch (error) {
        showMessage('Logout failed: ' + error.message, 'error');
    }
}

// Handle booking
async function handleBooking(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showMessage('Please login to book a bike!', 'error');
        elements.loginModal.style.display = 'block';
        return;
    }
    
    const fromDate = document.getElementById('bookingFromDate').value;
    const toDate = document.getElementById('bookingToDate').value;
    const message = document.getElementById('bookingMessage').value;
    
    if (new Date(fromDate) >= new Date(toDate)) {
        showMessage('End date must be after start date!', 'error');
        return;
    }
    
    try {
        await db.collection('bookings').add({
            userId: currentUser.uid,
            bikeId: currentBikeId,
            fromDate: fromDate,
            toDate: toDate,
            message: message,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Booking submitted successfully!', 'success');
        closeAllModals();
        elements.bookingForm.reset();
    } catch (error) {
        showMessage('Booking failed: ' + error.message, 'error');
    }
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const address = document.getElementById('profileAddress').value;
    
    try {
        await currentUser.updateProfile({ displayName: name });
        await db.collection('users').doc(currentUser.uid).update({
            name: name,
            phone: phone,
            address: address,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Profile updated successfully!', 'success');
        closeAllModals();
    } catch (error) {
        showMessage('Profile update failed: ' + error.message, 'error');
    }
}

// Handle contact form
async function handleContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;
    
    try {
        await db.collection('contactMessages').add({
            name: name,
            email: email,
            phone: phone,
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showMessage('Message sent successfully!', 'success');
        elements.contactForm.reset();
    } catch (error) {
        showMessage('Failed to send message: ' + error.message, 'error');
    }
}

// Load bikes from Firestore
async function loadBikes() {
    try {
        console.log('Loading bikes from Firestore...');
        const snapshot = await db.collection('bikes').get();
        
        if (snapshot.empty) {
            console.log('No bikes found in Firestore. Please add sample data first.');
            bikes = [];
            filteredBikes = [];
            renderBikes();
            return;
        }
        
        bikes = snapshot.docs.map(doc => {
            const data = doc.data();
            // Clean up engine values - remove 'cc' suffix if present and convert to number
            if (data.engine && typeof data.engine === 'string') {
                data.engine = parseInt(data.engine.replace('cc', '')) || 0;
            } else if (typeof data.engine === 'number') {
                data.engine = data.engine;
            } else {
                data.engine = 0;
            }
            return {
                id: doc.id,
                ...data
            };
        });
        filteredBikes = [...bikes];
        console.log(`Loaded ${bikes.length} bikes from Firestore`);
        renderBikes();
    } catch (error) {
        console.error('Error loading bikes from Firestore:', error);
        bikes = [];
        filteredBikes = [];
        renderBikes();
        showMessage('Error loading bikes. Please check your connection and try again.', 'error');
    }
}

// This function is no longer needed as we load all data from Firestore

// Render bikes
function renderBikes() {
    elements.bikesGrid.innerHTML = '';
    
    if (filteredBikes.length === 0) {
        elements.bikesGrid.innerHTML = `
            <div class="no-bikes-message">
                <i class="fas fa-motorcycle"></i>
                <h3>No bikes found</h3>
                <p>No bikes are currently available. Please check back later or contact us for more information.</p>
                ${isAdmin ? '<button class="btn btn-primary" onclick="addSampleBikesToFirestore()">Add Sample Data</button>' : ''}
            </div>
        `;
        return;
    }
    
    filteredBikes.forEach(bike => {
        const bikeCard = createBikeCard(bike);
        elements.bikesGrid.appendChild(bikeCard);
    });
}

// Create bike card element
function createBikeCard(bike) {
    const card = document.createElement('div');
    card.className = 'bike-card';
    card.innerHTML = `
        <img src="${bike.image}" alt="${bike.name}" onerror="handleImageError(this)">
        <div class="bike-card-content">
            <div class="brand">${bike.brand}</div>
            <h3>${bike.name}</h3>
            <div class="price">$${bike.price}/day</div>
            <div class="features">
                <span><i class="fas fa-calendar"></i> ${bike.year}</span>
                <span><i class="fas fa-user"></i> ${bike.seats} seats</span>
                <span><i class="fas fa-gas-pump"></i> ${bike.fuelType}</span>
            </div>
            <p class="description">${bike.description}</p>
            <button class="btn btn-primary" onclick="openBookingModal('${bike.id}')">Book Now</button>
        </div>
    `;
    return card;
}

// Handle image loading errors
function handleImageError(img) {
    // Prevent infinite loop by checking if already set to fallback
    if (img.dataset.errorHandled) {
        return;
    }
    
    // Mark as error handled to prevent infinite loop
    img.dataset.errorHandled = 'true';
    
    // Remove the onerror handler to prevent further calls
    img.onerror = null;
    
    // Use local placeholder image
    img.src = 'assets/images/placeholder.svg';
    img.style.backgroundColor = '#f0f0f0';
    img.style.border = '1px solid #ddd';
}

// Open booking modal
function openBookingModal(bikeId) {
    if (!currentUser) {
        elements.loginModal.style.display = 'block';
        return;
    }
    
    const bike = bikes.find(b => b.id === bikeId);
    if (bike) {
        currentBikeId = bikeId;
        document.getElementById('bookingBikeImage').src = bike.image;
        document.getElementById('bookingBikeName').textContent = bike.name;
        document.getElementById('bookingBikePrice').textContent = `$${bike.price}/day`;
        elements.bookingModal.style.display = 'block';
    }
}

// Filter bikes
function filterBikes() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const brandFilter = elements.brandFilter.value;
    const fuelFilter = elements.fuelFilter.value;
    const priceFilter = elements.priceFilter.value;
    
    filteredBikes = bikes.filter(bike => {
        const matchesSearch = bike.name.toLowerCase().includes(searchTerm) ||
                            bike.brand.toLowerCase().includes(searchTerm) ||
                            bike.description.toLowerCase().includes(searchTerm);
        
        const matchesBrand = !brandFilter || bike.brand === brandFilter;
        const matchesFuel = !fuelFilter || bike.fuelType === fuelFilter;
        
        let matchesPrice = true;
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(p => p === '+' ? Infinity : parseInt(p));
            matchesPrice = bike.price >= min && bike.price <= max;
        }
        
        return matchesSearch && matchesBrand && matchesFuel && matchesPrice;
    });
    
    renderBikes();
}

// Load more bikes
function loadMoreBikes() {
    // In a real app, this would load more bikes from the server
    showMessage('All bikes loaded!', 'info');
}

// Load testimonials
async function loadTestimonials() {
    try {
        const snapshot = await db.collection('testimonials').get();
        const testimonials = snapshot.docs.map(doc => doc.data());
        renderTestimonials(testimonials);
    } catch (error) {
        console.error('Error loading testimonials:', error);
        // Load sample testimonials
        loadSampleTestimonials();
    }
}

// Load sample testimonials
function loadSampleTestimonials() {
    const testimonials = [
        {
            name: 'John Smith',
            text: 'Amazing service! The bike was in perfect condition and the staff was very helpful.',
            rating: 5
        },
        {
            name: 'Sarah Johnson',
            text: 'Great experience! Easy booking process and excellent customer support.',
            rating: 5
        },
        {
            name: 'Mike Wilson',
            text: 'Best bike rental service in town. Highly recommended!',
            rating: 5
        }
    ];
    renderTestimonials(testimonials);
}

// Render testimonials
function renderTestimonials(testimonials) {
    elements.testimonialsSlider.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="stars">${'★'.repeat(testimonial.rating)}</div>
            <p>"${testimonial.text}"</p>
            <div class="author">- ${testimonial.name}</div>
        `;
        elements.testimonialsSlider.appendChild(testimonialCard);
    });
}

// Load user bookings
async function loadUserBookings() {
    if (!currentUser) return;
    
    try {
        const snapshot = await db.collection('bookings')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .get();
        
        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderUserBookings(bookings);
    } catch (error) {
        console.error('Error loading bookings:', error);
        elements.bookingsList.innerHTML = '<p>Error loading bookings. Please try again.</p>';
    }
}

// Render user bookings
function renderUserBookings(bookings) {
    elements.bookingsList.innerHTML = '';
    
    if (bookings.length === 0) {
        elements.bookingsList.innerHTML = '<p>No bookings found.</p>';
        return;
    }
    
    bookings.forEach(booking => {
        const bike = bikes.find(b => b.id === booking.bikeId);
        if (bike) {
            const bookingItem = document.createElement('div');
            bookingItem.className = 'booking-item';
            bookingItem.innerHTML = `
                <img src="${bike.image}" alt="${bike.name}">
                <div class="booking-details">
                    <h4>${bike.name}</h4>
                    <p><strong>Brand:</strong> ${bike.brand}</p>
                    <p><strong>From:</strong> ${booking.fromDate}</p>
                    <p><strong>To:</strong> ${booking.toDate}</p>
                    <p><strong>Price:</strong> $${bike.price}/day</p>
                    ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ''}
                </div>
                <div class="booking-status ${booking.status}">${booking.status}</div>
            `;
            elements.bookingsList.appendChild(bookingItem);
        }
    });
}

// Load user profile
function loadUserProfile() {
    if (!currentUser) return;
    
    document.getElementById('profileName').value = currentUser.displayName || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
    
    // Load additional user data from Firestore
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById('profilePhone').value = userData.phone || '';
            document.getElementById('profileAddress').value = userData.address || '';
        }
    });
}

// Show admin section
function showAdminSection(section) {
    elements.adminSectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    
    switch (section) {
        case 'dashboard':
            showAdminDashboard();
            break;
        case 'bikes':
            showAdminBikes();
            break;
        case 'bookings':
            showAdminBookings();
            break;
        case 'users':
            showAdminUsers();
            break;
        case 'testimonials':
            showAdminTestimonials();
            break;
    }
}

// Show admin dashboard
function showAdminDashboard() {
    elements.adminSection.innerHTML = `
        <div class="admin-stats">
            <div class="stat-card">
                <h3>Total Bikes</h3>
                <div class="stat-number">${bikes.length}</div>
            </div>
            <div class="stat-card">
                <h3>Total Bookings</h3>
                <div class="stat-number" id="totalBookings">-</div>
            </div>
            <div class="stat-card">
                <h3>Active Users</h3>
                <div class="stat-number" id="totalUsers">-</div>
            </div>
        </div>
    `;
    
    // Load stats
    loadAdminStats();
}

// Load admin statistics
async function loadAdminStats() {
    try {
        const bookingsSnapshot = await db.collection('bookings').get();
        const usersSnapshot = await db.collection('users').get();
        
        const totalBookingsElement = document.getElementById('totalBookings');
        const totalUsersElement = document.getElementById('totalUsers');
        
        if (totalBookingsElement) {
            totalBookingsElement.textContent = bookingsSnapshot.size;
        }
        if (totalUsersElement) {
            totalUsersElement.textContent = usersSnapshot.size;
        }
    } catch (error) {
        console.error('Error loading admin stats:', error);
    }
}

// Show admin bikes
function showAdminBikes() {
    elements.adminSection.innerHTML = `
        <div class="admin-header">
            <h3>Manage Bikes</h3>
            <div class="admin-actions">
                <button class="btn btn-primary" onclick="showAddBikeForm()">Add New Bike</button>
                <button class="btn btn-secondary" onclick="addSampleBikesToFirestore()">Add Sample Data</button>
                <button class="btn btn-outline" onclick="clearAllBikesFromFirestore()" style="background: #dc3545; color: white;">Clear All Bikes</button>
            </div>
        </div>
        <div class="bikes-admin-list" id="bikesAdminList">
            <!-- Bikes will be loaded here -->
        </div>
    `;
    
    loadAdminBikes();
}

// Load admin bikes
function loadAdminBikes() {
    const bikesList = document.getElementById('bikesAdminList');
    if (bikesList) {
        bikesList.innerHTML = '';
        
        if (bikes.length === 0) {
        bikesList.innerHTML = `
            <div class="no-bikes-admin">
                <i class="fas fa-motorcycle"></i>
                <h3>No bikes in database</h3>
                <p>Add sample data to get started with 25 pre-configured bikes.</p>
                <button class="btn btn-primary" onclick="addSampleBikesToFirestore()">Add Sample Data</button>
            </div>
        `;
        return;
    }
    
    bikes.forEach(bike => {
        const bikeItem = document.createElement('div');
        bikeItem.className = 'admin-bike-item';
        bikeItem.innerHTML = `
            <div class="bike-image">
                <img src="${bike.image}" alt="${bike.name}" onerror="handleImageError(this)">
                <div class="availability-badge ${bike.availability}">${bike.availability}</div>
            </div>
            <div class="bike-info">
                <h4>${bike.name}</h4>
                <p class="bike-brand">${bike.brand}</p>
                <div class="bike-details">
                    <span class="price">$${bike.price}/day</span>
                    <span class="engine">${bike.engine}cc</span>
                    <span class="type">${bike.type}</span>
                </div>
                <p class="bike-description">${bike.description || 'No description available'}</p>
            </div>
            <div class="bike-actions">
                <button class="btn btn-primary" onclick="editBike('${bike.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteBike('${bike.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        bikesList.appendChild(bikeItem);
    });
        }
    }

// Show add bike form
function showAddBikeForm() {
    showBikeForm();
}

// Show edit bike form
function editBike(bikeId) {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike) {
        alert('Bike not found!');
        return;
    }
    showBikeForm(bike);
}

// Show bike form (for both add and edit)
function showBikeForm(bike = null) {
    const isEdit = !!bike;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h3>${isEdit ? 'Edit Bike' : 'Add New Bike'}</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <form id="bikeForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="bikeName">Bike Name</label>
                            <input type="text" id="bikeName" name="name" value="${bike?.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label for="bikeBrand">Brand</label>
                            <input type="text" id="bikeBrand" name="brand" value="${bike?.brand || ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="bikePrice">Price per Day ($)</label>
                            <input type="number" id="bikePrice" name="price" min="1" value="${bike?.price || ''}" required>
                        </div>
                        <div class="form-group">
                            <label for="bikeEngine">Engine (CC)</label>
                            <input type="number" id="bikeEngine" name="engine" min="100" value="${bike?.engine ? bike.engine.toString().replace('cc', '') : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="bikeImage">Image URL</label>
                        <input type="url" id="bikeImage" name="image" value="${bike?.image || ''}" required>
                        <div class="image-preview" id="imagePreview">
                            ${bike?.image ? `<img src="${bike.image}" alt="Bike Preview" onerror="handleImageError(this)">` : ''}
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="bikeDescription">Description</label>
                        <textarea id="bikeDescription" name="description" rows="4">${bike?.description || ''}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="bikeType">Type</label>
                            <select id="bikeType" name="type" required>
                                <option value="sport" ${bike?.type === 'sport' ? 'selected' : ''}>Sport</option>
                                <option value="cruiser" ${bike?.type === 'cruiser' ? 'selected' : ''}>Cruiser</option>
                                <option value="touring" ${bike?.type === 'touring' ? 'selected' : ''}>Touring</option>
                                <option value="adventure" ${bike?.type === 'adventure' ? 'selected' : ''}>Adventure</option>
                                <option value="naked" ${bike?.type === 'naked' ? 'selected' : ''}>Naked</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="bikeAvailability">Availability</label>
                            <select id="bikeAvailability" name="availability" required>
                                <option value="available" ${bike?.availability === 'available' ? 'selected' : ''}>Available</option>
                                <option value="rented" ${bike?.availability === 'rented' ? 'selected' : ''}>Rented</option>
                                <option value="maintenance" ${bike?.availability === 'maintenance' ? 'selected' : ''}>Maintenance</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal(this.parentElement.parentElement.parentElement)">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-${isEdit ? 'save' : 'plus'}"></i>
                            ${isEdit ? 'Update Bike' : 'Add Bike'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle image preview
    const imageInput = document.getElementById('bikeImage');
    const imagePreview = document.getElementById('imagePreview');
    
    imageInput.addEventListener('input', function() {
        const url = this.value;
        if (url) {
            imagePreview.innerHTML = `<img src="${url}" alt="Bike Preview" onerror="handleImageError(this)">`;
        } else {
            imagePreview.innerHTML = '';
        }
    });
    
    // Handle form submission
    document.getElementById('bikeForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const price = parseInt(formData.get('price'));
        const engine = parseInt(formData.get('engine'));
        
        // Validate required fields
        if (!formData.get('name') || !formData.get('brand') || !price || !engine || !formData.get('image')) {
            alert('Please fill in all required fields with valid values.');
            return;
        }
        
        if (price <= 0 || engine <= 0) {
            alert('Price and engine size must be greater than 0.');
            return;
        }
        
        const bikeData = {
            name: formData.get('name').trim(),
            brand: formData.get('brand').trim(),
            price: price,
            image: formData.get('image').trim(),
            description: formData.get('description').trim(),
            type: formData.get('type'),
            engine: engine,
            availability: formData.get('availability'),
            updatedAt: new Date().toISOString()
        };
        
        if (isEdit) {
            bikeData.createdAt = bike.createdAt; // Preserve original creation date
        } else {
            bikeData.createdAt = new Date().toISOString();
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        submitBtn.disabled = true;
        
        try {
            if (isEdit) {
                await db.collection('bikes').doc(bike.id).update(bikeData);
                alert('Bike updated successfully!');
            } else {
                await db.collection('bikes').add(bikeData);
                alert('Bike added successfully!');
            }
            closeModal(modal);
            loadBikes(); // Reload bikes list
            loadAdminBikes(); // Reload admin bikes list
        } catch (error) {
            console.error(`Error ${isEdit ? 'updating' : 'adding'} bike:`, error);
            alert(`Error ${isEdit ? 'updating' : 'adding'} bike. Please try again.`);
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show admin bookings
function showAdminBookings() {
    elements.adminSection.innerHTML = `
        <div class="admin-header">
            <h3>Manage Bookings</h3>
        </div>
        <div class="bookings-admin-list" id="bookingsAdminList">
            <!-- Bookings will be loaded here -->
        </div>
    `;
    
    loadAdminBookings();
}

// Load admin bookings
async function loadAdminBookings() {
    try {
        const snapshot = await db.collection('bookings')
            .orderBy('createdAt', 'desc')
            .get();
        
        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        const bookingsList = document.getElementById('bookingsAdminList');
        if (bookingsList) {
            bookingsList.innerHTML = '';
            
            for (const booking of bookings) {
            const bike = bikes.find(b => b.id === booking.bikeId);
            const userDoc = await db.collection('users').doc(booking.userId).get();
            const userData = userDoc.exists ? userDoc.data() : { name: 'Unknown User' };
            
            const bookingItem = document.createElement('div');
            bookingItem.className = 'admin-booking-item';
            bookingItem.innerHTML = `
                <div class="booking-info">
                    <h4>${bike ? bike.name : 'Unknown Bike'}</h4>
                    <p><strong>User:</strong> ${userData.name}</p>
                    <p><strong>From:</strong> ${booking.fromDate}</p>
                    <p><strong>To:</strong> ${booking.toDate}</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                </div>
                <div class="booking-actions">
                    <select onchange="updateBookingStatus('${booking.id}', this.value)">
                        <option value="pending" ${booking.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${booking.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="cancelled" ${booking.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            `;
            bookingsList.appendChild(bookingItem);
        }
        }
    } catch (error) {
        console.error('Error loading admin bookings:', error);
    }
}

// Update booking status
async function updateBookingStatus(bookingId, status) {
    try {
        await db.collection('bookings').doc(bookingId).update({
            status: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showMessage('Booking status updated!', 'success');
    } catch (error) {
        showMessage('Failed to update booking status: ' + error.message, 'error');
    }
}

// Show admin users
function showAdminUsers() {
    elements.adminSection.innerHTML = `
        <div class="admin-header">
            <h3>Manage Users</h3>
        </div>
        <div class="users-admin-list" id="usersAdminList">
            <!-- Users will be loaded here -->
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
            
            users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'admin-user-item';
            userItem.innerHTML = `
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                    <p>Phone: ${user.phone || 'N/A'}</p>
                </div>
                <div class="user-actions">
                    <button class="btn btn-secondary" onclick="toggleUserAdmin('${user.id}', ${user.isAdmin})">
                        ${user.isAdmin ? 'Remove Admin' : 'Make Admin'}
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

// Toggle user admin status
async function toggleUserAdmin(userId, currentStatus) {
    try {
        await db.collection('users').doc(userId).update({
            isAdmin: !currentStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showMessage('User admin status updated!', 'success');
        loadAdminUsers();
    } catch (error) {
        showMessage('Failed to update user admin status: ' + error.message, 'error');
    }
}

// Show admin testimonials
function showAdminTestimonials() {
    elements.adminSection.innerHTML = `
        <div class="admin-header">
            <h3>Manage Testimonials</h3>
            <button class="btn btn-primary" onclick="showAddTestimonialForm()">Add Testimonial</button>
        </div>
        <div class="testimonials-admin-list" id="testimonialsAdminList">
            <!-- Testimonials will be loaded here -->
        </div>
    `;
    
    loadAdminTestimonials();
}

// Load admin testimonials
async function loadAdminTestimonials() {
    try {
        const snapshot = await db.collection('testimonials').get();
        const testimonials = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        const testimonialsList = document.getElementById('testimonialsAdminList');
        if (testimonialsList) {
            testimonialsList.innerHTML = '';
            
            testimonials.forEach(testimonial => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'admin-testimonial-item';
            testimonialItem.innerHTML = `
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>"${testimonial.text}"</p>
                    <div class="stars">${'★'.repeat(testimonial.rating)}</div>
                </div>
                <div class="testimonial-actions">
                    <button class="btn btn-secondary" onclick="editTestimonial('${testimonial.id}')">Edit</button>
                    <button class="btn btn-outline" onclick="deleteTestimonial('${testimonial.id}')">Delete</button>
                </div>
            `;
            testimonialsList.appendChild(testimonialItem);
        });
        }
    } catch (error) {
        console.error('Error loading admin testimonials:', error);
    }
}

// Show message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the body
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Event listeners for modal buttons
elements.loginBtn.addEventListener('click', () => {
    elements.loginModal.style.display = 'block';
});

elements.registerBtn.addEventListener('click', () => {
    elements.registerModal.style.display = 'block';
});

// All data is now loaded from Firestore
