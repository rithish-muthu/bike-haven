// Sample data for Bike Haven Showroom
// This file contains sample motorcycle data for the showroom

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
    },
    {
        name: "Kawasaki Ninja ZX-10R",
        brand: "Kawasaki",
        type: "sport",
        price: 16995,
        year: 2024,
        engine: 998,
        seats: 1,
        fuelType: "Petrol",
        availability: "available",
        description: "A track-focused sport motorcycle with championship-winning performance and technology.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
        name: "Triumph Bonneville T120",
        brand: "Triumph",
        type: "cruiser",
        price: 12995,
        year: 2024,
        engine: 1200,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "A classic British motorcycle with modern technology and timeless style.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    },
    {
        name: "KTM 1290 Super Duke R",
        brand: "KTM",
        type: "naked",
        price: 18995,
        year: 2024,
        engine: 1301,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "The Beast - a powerful naked motorcycle with uncompromising performance and attitude.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    },
    {
        name: "Aprilia RSV4 1100 Factory",
        brand: "Aprilia",
        type: "sport",
        price: 22995,
        year: 2024,
        engine: 1099,
        seats: 1,
        fuelType: "Petrol",
        availability: "available",
        description: "Italian excellence with V4 engine and championship-winning aerodynamics.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
        name: "Suzuki GSX-R1000R",
        brand: "Suzuki",
        type: "sport",
        price: 15995,
        year: 2024,
        engine: 999,
        seats: 1,
        fuelType: "Petrol",
        availability: "available",
        description: "Suzuki's flagship sport motorcycle with advanced electronics and track performance.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
        name: "Indian Chief Dark Horse",
        brand: "Indian",
        type: "cruiser",
        price: 18995,
        year: 2024,
        engine: 1890,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "American muscle with modern technology and classic cruiser styling.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    },
    {
        name: "MV Agusta F4 RR",
        brand: "MV Agusta",
        type: "sport",
        price: 24995,
        year: 2024,
        engine: 998,
        seats: 1,
        fuelType: "Petrol",
        availability: "available",
        description: "Italian art on wheels with exquisite design and exceptional performance.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
        name: "Ducati Monster 1200",
        brand: "Ducati",
        type: "naked",
        price: 15995,
        year: 2024,
        engine: 1198,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "The iconic naked motorcycle with Ducati's signature L-twin engine and style.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    },
    {
        name: "BMW S 1000 RR",
        brand: "BMW",
        type: "sport",
        price: 19995,
        year: 2024,
        engine: 999,
        seats: 1,
        fuelType: "Petrol",
        availability: "available",
        description: "German engineering meets sport performance with advanced electronics and precision.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
        name: "Yamaha R1",
        brand: "Yamaha",
        type: "sport",
        price: 17995,
        year: 2024,
        engine: 998,
        seats: 1,
        fuelType: "Petrol",
        availability: "available",
        description: "Yamaha's flagship sport motorcycle with crossplane crankshaft and MotoGP technology.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
        name: "Honda Gold Wing",
        brand: "Honda",
        type: "touring",
        price: 28995,
        year: 2024,
        engine: 1833,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "The ultimate touring motorcycle with luxury features and smooth performance.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    },
    {
        name: "Kawasaki Z900",
        brand: "Kawasaki",
        type: "naked",
        price: 8995,
        year: 2024,
        engine: 948,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "A versatile naked motorcycle with smooth power delivery and comfortable ergonomics.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    },
    {
        name: "Triumph Tiger 900",
        brand: "Triumph",
        type: "adventure",
        price: 13995,
        year: 2024,
        engine: 888,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "A capable adventure motorcycle for both on-road and off-road adventures.",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
    },
    {
        name: "Ducati Multistrada V4",
        brand: "Ducati",
        type: "adventure",
        price: 21995,
        year: 2024,
        engine: 1158,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "The ultimate adventure motorcycle with V4 power and advanced electronics.",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop"
    },
    {
        name: "BMW R 18",
        brand: "BMW",
        type: "cruiser",
        price: 19995,
        year: 2024,
        engine: 1802,
        seats: 2,
        fuelType: "Petrol",
        availability: "available",
        description: "BMW's interpretation of the classic cruiser with modern technology and German engineering.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop"
    }
];

// Function to add sample data to Firestore
async function addSampleData() {
    try {
        console.log('Adding sample motorcycle data to Firestore...');
        
        // Check if motorcycles already exist
        const existingMotorcycles = await db.collection('motorcycles').get();
        if (existingMotorcycles.size > 0) {
            console.log('Motorcycles already exist in Firestore. Skipping data addition.');
            return;
        }
        
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

// Function to clear all data (for testing)
async function clearAllData() {
    try {
        console.log('Clearing all data from Firestore...');
        
        // Clear motorcycles
        const motorcyclesSnapshot = await db.collection('motorcycles').get();
        const motorcyclePromises = motorcyclesSnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(motorcyclePromises);
        
        // Clear orders
        const ordersSnapshot = await db.collection('orders').get();
        const orderPromises = ordersSnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(orderPromises);
        
        // Clear inquiries
        const inquiriesSnapshot = await db.collection('inquiries').get();
        const inquiryPromises = inquiriesSnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(inquiryPromises);
        
        // Clear contacts
        const contactsSnapshot = await db.collection('contacts').get();
        const contactPromises = contactsSnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(contactPromises);
        
        console.log('All data cleared from Firestore.');
    } catch (error) {
        console.error('Error clearing data:', error);
    }
}

// Auto-add sample data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure Firebase is initialized
    setTimeout(() => {
        if (typeof db !== 'undefined') {
            addSampleData();
        }
    }, 2000);
});

// Export functions for manual use
window.addSampleData = addSampleData;
window.clearAllData = clearAllData;