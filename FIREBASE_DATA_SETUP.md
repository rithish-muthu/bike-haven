# Firebase Data Setup Guide

## 🚀 Quick Setup (Recommended)

### Method 1: Using the Admin Panel (Easiest)

1. **Open your application** in the browser
2. **Login as admin** (or create an admin account)
3. **Go to Admin Panel** → **Manage Bikes**
4. **Click "Add Sample Data"** button
5. **Wait for confirmation** - all 25 bikes will be added automatically!

### Method 2: Using Browser Console

1. **Open your application** in the browser
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Run this command:**
   ```javascript
   addSampleBikesToFirestore()
   ```
5. **Wait for confirmation** message

### Method 3: Manual Firestore Console

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Select your project**
3. **Go to Firestore Database**
4. **Click "Start collection"**
5. **Collection ID: `bikes`**
6. **Add documents manually** using the data below

## 📊 Sample Bike Data (25 Bikes)

The sample data includes:

### **Sport Bikes (High Performance)**
- KTM Duke 390 - $45/day
- Honda CBR 600RR - $65/day  
- Yamaha R1 - $85/day
- Ducati Panigale V4 - $120/day
- Suzuki GSX-R1000 - $75/day
- KTM RC 390 - $40/day
- Aprilia RSV4 - $90/day
- BMW S1000RR - $95/day
- Suzuki Hayabusa - $100/day

### **Naked Bikes (Street Performance)**
- Honda CB650R - $50/day
- Yamaha MT-09 - $60/day
- Ducati Monster 821 - $80/day
- Kawasaki Z900 - $65/day
- Triumph Street Triple 765 - $70/day
- Ducati Scrambler 800 - $75/day

### **Adventure Bikes (Touring)**
- Suzuki V-Strom 650 - $45/day
- BMW R1250GS - $85/day
- Honda Africa Twin - $70/day
- KTM Adventure 390 - $50/day
- Triumph Tiger 900 - $60/day

### **Entry-Level Bikes (Affordable)**
- Bajaj Pulsar 200NS - $25/day
- Yamaha FZ-25 - $30/day
- Kawasaki Ninja 400 - $35/day
- Kawasaki Ninja 650 - $55/day

### **Classic Bikes (Heritage)**
- Triumph Bonneville T120 - $55/day

## 🔧 Data Structure

Each bike document contains:

```javascript
{
  name: "Bike Model Name",
  brand: "Manufacturer",
  price: 45,                    // Price per day in USD
  fuelType: "Petrol",          // Petrol, Diesel, Electric
  year: 2023,                  // Model year
  seats: 2,                    // Number of seats
  image: "https://...",        // Image URL
  description: "Description...",
  features: ["ABS", "LED Lights", ...], // Array of features
  mileage: "35 kmpl",          // Fuel efficiency
  engine: "373cc",             // Engine displacement
  color: "Orange",             // Primary color
  availability: true,          // Available for booking
  createdAt: timestamp,        // Auto-generated
  updatedAt: timestamp         // Auto-generated
}
```

## 🎯 Features Included

### **Safety Features**
- ABS (Anti-lock Braking System)
- Traction Control
- LED Lights
- Digital Display

### **Performance Features**
- Quick Shifter
- Launch Control
- Wheelie Control
- Ride Modes
- Dynamic Damping

### **Comfort Features**
- Fuel Injection
- Cornering ABS
- Dynamic ESA (Electronic Suspension Adjustment)

## 🚨 Important Notes

### **Before Adding Data:**
1. **Make sure Firebase is configured** correctly
2. **Ensure you have admin privileges** in Firestore
3. **Check your internet connection** for image loading

### **After Adding Data:**
1. **Refresh the page** to see new bikes
2. **Test the search and filter** functionality
3. **Try booking a bike** to test the full flow

### **Troubleshooting:**
- **Images not loading?** Check if Unsplash is accessible
- **Data not appearing?** Check Firestore security rules
- **Admin panel not working?** Ensure user has admin privileges

## 🔄 Managing Data

### **Add More Bikes:**
```javascript
// In browser console
addSampleBikesToFirestore()
```

### **Clear All Bikes:**
```javascript
// In browser console (use with caution!)
clearAllBikesFromFirestore()
```

### **View Sample Data:**
```javascript
// In browser console
console.log(sampleBikes)
```

## 📱 Testing the UI

After adding the data, test these features:

1. **Bike Listing** - Should show all 25 bikes
2. **Search** - Try searching by brand or model
3. **Filters** - Test brand, fuel type, and price filters
4. **Booking** - Try booking a bike (requires login)
5. **Admin Panel** - View and manage bikes as admin

## 🎨 Customization

You can modify the sample data by:

1. **Editing `assets/js/sample-data.js`**
2. **Changing prices, descriptions, or features**
3. **Adding your own image URLs**
4. **Modifying the data structure**

## 🚀 Next Steps

1. **Add the sample data** using any method above
2. **Test all functionality** thoroughly
3. **Customize the data** to match your needs
4. **Deploy to production** when ready

---

**Need Help?** Check the console for any error messages or refer to the main README.md file for detailed setup instructions.
