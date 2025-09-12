// Sample bike data for Firestore
const sampleBikes = [
    {
        name: "KTM Duke 390",
        brand: "KTM",
        price: 45,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Powerful and agile street bike with excellent performance and modern design.",
        features: ["ABS", "LED Lights", "Digital Display", "Traction Control"],
        mileage: "35 kmpl",
        engine: "373cc",
        color: "Orange",
        availability: true
    },
    {
        name: "Honda CBR 600RR",
        brand: "Honda",
        price: 65,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Sport bike with exceptional handling, speed, and racing heritage.",
        features: ["ABS", "Traction Control", "Quick Shifter", "Launch Control"],
        mileage: "25 kmpl",
        engine: "599cc",
        color: "Red",
        availability: true
    },
    {
        name: "Yamaha R1",
        brand: "Yamaha",
        price: 85,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Racing-inspired superbike with cutting-edge technology and MotoGP DNA.",
        features: ["ABS", "Traction Control", "Launch Control", "Wheelie Control"],
        mileage: "20 kmpl",
        engine: "998cc",
        color: "Blue",
        availability: true
    },
    {
        name: "Ducati Panigale V4",
        brand: "Ducati",
        price: 120,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Italian masterpiece with V4 engine and premium features for the ultimate riding experience.",
        features: ["ABS", "Traction Control", "Wheelie Control", "Cornering ABS"],
        mileage: "18 kmpl",
        engine: "1103cc",
        color: "Red",
        availability: true
    },
    {
        name: "Suzuki GSX-R1000",
        brand: "Suzuki",
        price: 75,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Track-focused sport bike with MotoGP technology and precision engineering.",
        features: ["ABS", "Traction Control", "Launch Control", "Quick Shifter"],
        mileage: "22 kmpl",
        engine: "999cc",
        color: "White",
        availability: true
    },
    {
        name: "Bajaj Pulsar 200NS",
        brand: "Bajaj",
        price: 25,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Reliable and fuel-efficient bike perfect for daily commuting and weekend rides.",
        features: ["ABS", "Digital Display", "LED Lights", "Fuel Injection"],
        mileage: "40 kmpl",
        engine: "199cc",
        color: "Black",
        availability: true
    },
    {
        name: "Kawasaki Ninja 650",
        brand: "Kawasaki",
        price: 55,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Versatile sport-touring bike with comfortable ergonomics and sporty performance.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "28 kmpl",
        engine: "649cc",
        color: "Green",
        availability: true
    },
    {
        name: "Triumph Street Triple 765",
        brand: "Triumph",
        price: 70,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "British engineering meets modern performance in this iconic street bike.",
        features: ["ABS", "Traction Control", "Quick Shifter", "Ride Modes"],
        mileage: "26 kmpl",
        engine: "765cc",
        color: "Silver",
        availability: true
    },
    {
        name: "BMW S1000RR",
        brand: "BMW",
        price: 95,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "German precision and performance in a track-ready superbike package.",
        features: ["ABS", "Traction Control", "Launch Control", "Dynamic Damping"],
        mileage: "21 kmpl",
        engine: "999cc",
        color: "White",
        availability: true
    },
    {
        name: "Aprilia RSV4",
        brand: "Aprilia",
        price: 90,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Italian racing heritage with V4 engine and advanced electronics.",
        features: ["ABS", "Traction Control", "Wheelie Control", "Launch Control"],
        mileage: "19 kmpl",
        engine: "1099cc",
        color: "Red",
        availability: true
    },
    {
        name: "Honda CB650R",
        brand: "Honda",
        price: 50,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Neo-sports café with modern design and smooth inline-four performance.",
        features: ["ABS", "Digital Display", "LED Lights", "Traction Control"],
        mileage: "30 kmpl",
        engine: "649cc",
        color: "Black",
        availability: true
    },
    {
        name: "Yamaha MT-09",
        brand: "Yamaha",
        price: 60,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Torque-rich naked bike with aggressive styling and thrilling performance.",
        features: ["ABS", "Traction Control", "Quick Shifter", "Ride Modes"],
        mileage: "27 kmpl",
        engine: "847cc",
        color: "Blue",
        availability: true
    },
    {
        name: "KTM RC 390",
        brand: "KTM",
        price: 40,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Track-focused sport bike with aggressive styling and race-ready performance.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "32 kmpl",
        engine: "373cc",
        color: "Orange",
        availability: true
    },
    {
        name: "Ducati Monster 821",
        brand: "Ducati",
        price: 80,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Iconic naked bike with Italian style and L-twin engine character.",
        features: ["ABS", "Traction Control", "Ride Modes", "Digital Display"],
        mileage: "24 kmpl",
        engine: "821cc",
        color: "Red",
        availability: true
    },
    {
        name: "Suzuki V-Strom 650",
        brand: "Suzuki",
        price: 45,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Adventure touring bike perfect for long rides and varied terrain.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "35 kmpl",
        engine: "645cc",
        color: "Yellow",
        availability: true
    },
    {
        name: "Kawasaki Z900",
        brand: "Kawasaki",
        price: 65,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Muscular naked bike with powerful inline-four engine and aggressive stance.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "26 kmpl",
        engine: "948cc",
        color: "Green",
        availability: true
    },
    {
        name: "Triumph Bonneville T120",
        brand: "Triumph",
        price: 55,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Classic British motorcycle with modern reliability and timeless style.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "30 kmpl",
        engine: "1200cc",
        color: "Black",
        availability: true
    },
    {
        name: "BMW R1250GS",
        brand: "BMW",
        price: 85,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Ultimate adventure bike with boxer engine and advanced electronics.",
        features: ["ABS", "Traction Control", "Dynamic ESA", "Ride Modes"],
        mileage: "28 kmpl",
        engine: "1254cc",
        color: "Blue",
        availability: true
    },
    {
        name: "Honda Africa Twin",
        brand: "Honda",
        price: 70,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Legendary adventure bike built for exploring the world's toughest terrain.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "32 kmpl",
        engine: "1084cc",
        color: "Red",
        availability: true
    },
    {
        name: "Yamaha FZ-25",
        brand: "Yamaha",
        price: 30,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Sporty naked bike with aggressive styling and reliable performance.",
        features: ["ABS", "Digital Display", "LED Lights", "Fuel Injection"],
        mileage: "38 kmpl",
        engine: "249cc",
        color: "Blue",
        availability: true
    },
    {
        name: "KTM Adventure 390",
        brand: "KTM",
        price: 50,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Adventure bike designed for both city streets and off-road exploration.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "33 kmpl",
        engine: "373cc",
        color: "Orange",
        availability: true
    },
    {
        name: "Ducati Scrambler 800",
        brand: "Ducati",
        price: 75,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Retro-styled scrambler with modern performance and Italian flair.",
        features: ["ABS", "Traction Control", "Digital Display", "LED Lights"],
        mileage: "25 kmpl",
        engine: "803cc",
        color: "Yellow",
        availability: true
    },
    {
        name: "Suzuki Hayabusa",
        brand: "Suzuki",
        price: 100,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Legendary hyperbike with incredible speed and aerodynamic design.",
        features: ["ABS", "Traction Control", "Launch Control", "Quick Shifter"],
        mileage: "18 kmpl",
        engine: "1340cc",
        color: "Black",
        availability: true
    },
    {
        name: "Kawasaki Ninja 400",
        brand: "Kawasaki",
        price: 35,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3f87?w=400&h=200&fit=crop",
        description: "Entry-level sport bike with aggressive styling and accessible performance.",
        features: ["ABS", "Digital Display", "LED Lights", "Fuel Injection"],
        mileage: "36 kmpl",
        engine: "399cc",
        color: "Green",
        availability: true
    },
    {
        name: "Triumph Tiger 900",
        brand: "Triumph",
        price: 60,
        fuelType: "Petrol",
        year: 2023,
        seats: 2,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
        description: "Adventure touring bike with triple engine and advanced electronics.",
        features: ["ABS", "Traction Control", "Ride Modes", "Digital Display"],
        mileage: "29 kmpl",
        engine: "888cc",
        color: "White",
        availability: true
    }
];

// Function to add sample data to Firestore (only if not already exists)
async function addSampleBikesToFirestore() {
    try {
        console.log('Checking if sample data already exists...');
        
        // Check if bikes collection already has data
        const snapshot = await db.collection('bikes').limit(1).get();
        
        if (!snapshot.empty) {
            console.log('Bikes already exist in Firestore. Skipping data addition.');
            alert('Bikes already exist in Firestore. No data added.');
            return;
        }
        
        console.log('Adding sample bikes to Firestore...');
        
        for (const bike of sampleBikes) {
            await db.collection('bikes').add({
                ...bike,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Added: ${bike.brand} ${bike.name}`);
        }
        
        console.log('All sample bikes added successfully!');
        alert('Sample bikes added to Firestore successfully!');
        
        // Reload bikes from Firestore after adding
        loadBikes();
        
    } catch (error) {
        console.error('Error adding sample bikes:', error);
        alert('Error adding sample bikes: ' + error.message);
    }
}

// Function to clear all bikes from Firestore (use with caution)
async function clearAllBikesFromFirestore() {
    try {
        const snapshot = await db.collection('bikes').get();
        const batch = db.batch();
        
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        console.log('All bikes cleared from Firestore');
        alert('All bikes cleared from Firestore');
        
        // Reload bikes after clearing
        loadBikes();
        
    } catch (error) {
        console.error('Error clearing bikes:', error);
        alert('Error clearing bikes: ' + error.message);
    }
}

// Export functions for use in console or other scripts
window.addSampleBikesToFirestore = addSampleBikesToFirestore;
window.clearAllBikesFromFirestore = clearAllBikesFromFirestore;
window.sampleBikes = sampleBikes;
