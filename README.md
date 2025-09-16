# Bike Haven - Premium Motorcycle Showroom

A complete e-commerce website for a premium motorcycle showroom built with HTML, CSS, JavaScript, and Firebase.

## 🏍️ Features

### Customer Features
- **Browse Motorcycles**: View detailed motorcycle listings with filters
- **Order Motorcycles**: Place orders with customer information and payment options
- **Track Orders**: View order history and status
- **Inquiries**: Send inquiries about specific motorcycles
- **User Authentication**: Register, login, and manage profile
- **Responsive Design**: Works on all devices

### Admin Features
- **Dashboard**: View sales statistics and metrics
- **Order Management**: Manage customer orders and status updates
- **User Management**: View registered users
- **Inquiry Management**: Handle customer inquiries
- **Motorcycle Management**: Add, edit, and manage motorcycle inventory

### Business Features
- **Multiple Payment Options**: Cash, bank transfer, financing, credit card
- **Order Tracking**: Complete order lifecycle management
- **Inventory Management**: Automatic stock updates
- **Customer Database**: Complete customer information tracking
- **Sales Analytics**: Track sales performance

## 🚀 Getting Started

### Prerequisites
- A Firebase project
- A web server (or use a local development server)

### Installation

1. **Clone or download the project files**

2. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Get your Firebase configuration

3. **Configure Firebase**
   - Open `assets/js/firebase-config.js`
   - Replace the placeholder values with your actual Firebase configuration:
   ```javascript
   const firebaseConfig = {
       apiKey: "your-api-key-here",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id"
   };
   ```

4. **Set up Firestore Security Rules**
   - In Firebase Console, go to Firestore Database > Rules
   - Use these rules for development (customize for production):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

5. **Deploy or run locally**
   - Upload files to your web server, or
   - Use a local development server like Live Server in VS Code

## 📁 Project Structure

```
bike-haven-showroom/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── js/
│       ├── app.js            # Main application logic
│       ├── firebase-config.js # Firebase configuration
│       └── sample-data.js    # Sample motorcycle data
├── README.md                 # This file
└── package.json             # Project dependencies
```

## 🗄️ Database Structure

### Collections

#### `motorcycles`
- `name`: Motorcycle name
- `brand`: Manufacturer brand
- `type`: Type (sport, cruiser, touring, adventure, naked)
- `price`: Sale price
- `year`: Model year
- `engine`: Engine displacement in cc
- `seats`: Number of seats
- `fuelType`: Fuel type (Petrol, Electric, etc.)
- `availability`: available, sold, out-of-stock
- `description`: Motorcycle description
- `image`: Image URL
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

#### `orders`
- `motorcycleId`: Reference to motorcycle
- `motorcycleName`: Motorcycle name
- `motorcycleBrand`: Motorcycle brand
- `motorcyclePrice`: Motorcycle price
- `customerFirstName`: Customer first name
- `customerLastName`: Customer last name
- `customerEmail`: Customer email
- `customerPhone`: Customer phone
- `customerAddress`: Customer address
- `paymentMethod`: Payment method
- `downPayment`: Down payment amount (for financing)
- `financingAmount`: Financing amount
- `orderStatus`: pending, confirmed, processing, completed, cancelled
- `orderDate`: Order date
- `orderNumber`: Unique order number

#### `inquiries`
- `motorcycleId`: Reference to motorcycle
- `motorcycleName`: Motorcycle name
- `customerName`: Customer name
- `customerEmail`: Customer email
- `customerPhone`: Customer phone
- `message`: Inquiry message
- `status`: new, responded, closed
- `createdAt`: Creation timestamp

#### `users`
- `firstName`: User first name
- `lastName`: User last name
- `email`: User email
- `phone`: User phone
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

#### `contacts`
- `name`: Contact name
- `email`: Contact email
- `phone`: Contact phone
- `subject`: Message subject
- `message`: Message content
- `status`: new, responded, closed
- `createdAt`: Creation timestamp

## 🎨 Customization

### Colors
The color scheme can be customized in `assets/css/style.css` by modifying the CSS variables:
```css
:root {
    --primary-color: #e74c3c;
    --secondary-color: #2c3e50;
    --accent-color: #f39c12;
    /* ... other colors */
}
```

### Branding
- Update the logo and company name in `index.html`
- Modify the hero section content
- Update contact information

### Sample Data
- Edit `assets/js/sample-data.js` to add your own motorcycle data
- The sample data will be automatically added to Firestore when the page loads

## 🔧 Admin Access

To access the admin panel:
1. Register a user with email `admin@bikehaven.com`
2. The admin panel will automatically appear

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

### Other Hosting Options
- Upload files to any web hosting service
- Use GitHub Pages, Netlify, or Vercel

## 🔒 Security Considerations

For production deployment:
1. Update Firestore security rules
2. Enable Firebase Authentication providers
3. Set up proper user permissions
4. Use HTTPS
5. Validate all user inputs

## 📞 Support

For support or questions:
- Email: info@bikehaven.com
- Phone: (555) 123-4567

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Bike Haven Showroom** - Your premier destination for premium motorcycles! 🏍️