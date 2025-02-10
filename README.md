# CineShare - Social Media Platform for Movie Enthusiasts

CineShare is a web-based social media platform designed specifically for movie lovers to share their thoughts, reviews, and engage with other cinema enthusiasts.

## Features

- **User Authentication**
  - Secure registration and login system
  - JWT-based authentication
  - Password encryption using bcrypt

- **Social Features**
  - Create and share movie reviews/posts
  - Delete your own posts
  - View posts from other users
  - User profiles with personalized content

- **User Interface**
  - Responsive design for all screen sizes
  - Clean and modern interface
  - Dedicated sections for movie categories
  - Upcoming events display
  - Profile customization options

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)

### Security
- JWT (JSON Web Tokens)
- bcrypt.js for password hashing
- CORS enabled

## Project Structure

```
CineShare/
├── frontend/
│   ├── index.html        # Login page
│   ├── register.html     # Registration page
│   ├── home.html        # Main feed page
│   ├── profile.html     # User profile page
│   ├── auth.css         # Styles for auth pages
│   ├── style.css        # Main stylesheet
│   ├── auth.js          # Authentication logic
│   └── script.js        # Main JavaScript file
│
└── backend/
    ├── server.js        # Express server and API endpoints
    └── .env             # Environment variables
```

## Setup Instructions

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MongoDB (v4.4 or higher)
   - Modern web browser

2. **Database Setup**
   ```bash
   # Start MongoDB service
   mongod
   ```

3. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Create .env file with following variables
   JWT_SECRET=your_secret_key
   PORT=3000

   # Start server
   node server.js
   ```

4. **Frontend Setup**
   - Simply open the HTML files in a web browser
   - For development, use a local server (e.g., Live Server VS Code extension)

## API Endpoints

### Authentication
- POST `/api/register` - User registration
- POST `/api/login` - User login

### Posts
- GET `/api/posts` - Fetch all posts
- POST `/api/posts` - Create new post
- DELETE `/api/posts/:postId` - Delete a post
- GET `/api/posts/user` - Fetch user's posts

## Security Features

- Passwords are hashed before storage
- JWT tokens for session management
- Protected API endpoints
- Input validation and sanitization
- CORS protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues and Future Improvements

### Current Limitations
- Limited post interaction features
- Basic profile customization
- No image upload functionality

### Planned Features
- Like and comment system
- Movie rating system
- User followings
- Direct messaging
- Movie recommendations
- Enhanced profile customization
- Image upload for posts and profiles
- Search functionality
- Movie database integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MongoDB documentation
- Express.js documentation
- JWT documentation
- Node.js community
