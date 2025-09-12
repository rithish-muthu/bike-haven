# Bike Haven - Premium Bike Showroom Management System

A modern, responsive web application for managing bike showroom operations with user authentication, bike booking, and admin panel functionality.

## 🚀 Features

### For Customers
- **User Authentication**: Secure login/register system
- **Bike Browsing**: Browse and search through available bikes
- **Advanced Filtering**: Filter by brand, fuel type, and price range
- **Booking System**: Book bikes with date selection
- **User Profile**: Manage personal information
- **Booking Management**: View and track booking history
- **Responsive Design**: Works on all devices

### For Administrators
- **Admin Dashboard**: Overview of system statistics
- **Bike Management**: Add, edit, and delete bikes
- **Booking Management**: View and manage all bookings
- **User Management**: Manage user accounts and admin privileges
- **Testimonial Management**: Manage customer testimonials
- **Real-time Updates**: Live data synchronization

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication, Firestore Database)
- **UI Framework**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## 📋 Prerequisites

Before running this project, make sure you have:

1. A modern web browser (Chrome, Firefox, Safari, Edge)
2. A Firebase project set up
3. Basic knowledge of HTML, CSS, and JavaScript

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bike-showroom-management
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication and Firestore Database
4. Get your Firebase configuration

### 3. Configure Firebase

1. Open `assets/js/firebase-config.js`
2. Replace the placeholder values with your Firebase configuration:

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

### 4. Firebase Security Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read bikes
    match /bikes/{bikeId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Users can read their own bookings
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // Anyone can read testimonials
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Anyone can create contact messages
    match /contactMessages/{messageId} {
      allow create: if true;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### 5. Run the Application

1. Open `index.html` in your web browser
2. Or use a local server (recommended):

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhos t:8000` in your browser

## 📱 Usage

### For Customers

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Bikes**: Use the search and filter options to find your perfect bike
3. **Book a Bike**: Click "Book Now" on any bike and select your dates
4. **Manage Bookings**: View your booking history in the user menu
5. **Update Profile**: Manage your personal information

### For Administrators

1. **Login**: Use an admin account to access the admin panel
2. **Dashboard**: View system statistics and overview
3. **Manage Bikes**: Add, edit, or remove bikes from the inventory
4. **Manage Bookings**: View and update booking statuses
5. **Manage Users**: View users and grant admin privileges
6. **Manage Testimonials**: Add or remove customer testimonials

## 🗄️ Database Structure

### Collections

#### Users
```javascript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  isAdmin: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Bikes
```javascript
{
  name: string,
  brand: string,
  price: number,
  fuelType: string,
  year: number,
  seats: number,
  image: string,
  description: string,
  features: array
}
```

#### Bookings
```javascript
{
  userId: string,
  bikeId: string,
  fromDate: string,
  toDate: string,
  message: string,
  status: string, // pending, confirmed, cancelled
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Testimonials
```javascript
{
  name: string,
  text: string,
  rating: number,
  createdAt: timestamp
}
```

#### Contact Messages
```javascript
{
  name: string,
  email: string,
  phone: string,
  message: string,
  createdAt: timestamp
}
```

## 🎨 Customization

### Colors
The application uses CSS custom properties for easy theming. Modify the `:root` variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #2c3e50;
    --accent-color: #3498db;
    /* ... other variables */
}
```

### Adding New Features
1. Modify the HTML structure in `index.html`
2. Add corresponding CSS styles in `assets/css/style.css`
3. Implement JavaScript functionality in `assets/js/app.js`
4. Update Firebase security rules if needed

## 🔒 Security Features

- **Authentication**: Secure user authentication with Firebase
- **Authorization**: Role-based access control (admin/user)
- **Data Validation**: Client-side and server-side validation
- **Secure Rules**: Firestore security rules for data protection

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init hosting
```

4. Deploy:
```bash
firebase deploy
```

### Other Hosting Options

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Traditional Web Hosting**: Upload files via FTP

## 🐛 Troubleshooting

### Common Issues

1. **Firebase not loading**: Check your Firebase configuration
2. **Authentication not working**: Verify Firebase Auth is enabled
3. **Database errors**: Check Firestore security rules
4. **Images not loading**: Ensure image URLs are accessible

### Debug Mode

Enable debug mode by opening browser developer tools and checking the console for error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

### Version 1.0.0
- Initial release
- Basic bike management
- User authentication
- Booking system
- Admin panel
- Responsive design

### Future Updates
- Mobile app version
- Payment integration
- Advanced analytics
- Multi-language support
- API integration

## 📞 Contact

- **Email**: info@bikehaven.com
- **Phone**: +1 (555) 123-4567
- **Website**: https://bikehaven.com

---

**Bike Haven** - Your premier destination for premium bike rentals! 🏍️
#   b i k e - h a v e n  
 