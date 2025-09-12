// Auto-initialize sample data on first run
async function initializeSampleData() {
    try {
        // Check if bikes collection exists and has data
        const snapshot = await db.collection('bikes').limit(1).get();
        
        if (snapshot.empty) {
            console.log('No bikes found. Initializing with sample data...');
            
            // Show loading message
            if (elements.bikesGrid) {
                elements.bikesGrid.innerHTML = `
                    <div class="loading-message">
                        <i class="fas fa-spinner fa-spin"></i>
                        <h3>Initializing Bike Data...</h3>
                        <p>Setting up your bike showroom with sample data...</p>
                    </div>
                `;
            }
            
            // Add sample data
            await addSampleBikesToFirestore();
        } else {
            console.log('Bikes already exist in Firestore. Loading existing data...');
        }
    } catch (error) {
        console.error('Error initializing sample data:', error);
        showMessage('Error initializing data. Please refresh the page.', 'error');
    }
}

// Add loading message styles
const loadingStyles = `
    .loading-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        background: var(--white);
        border-radius: 15px;
        box-shadow: var(--shadow);
    }
    
    .loading-message i {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .loading-message h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-color);
    }
    
    .loading-message p {
        color: var(--text-light);
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Export function
window.initializeSampleData = initializeSampleData;
